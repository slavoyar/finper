import { dateToTimestamp, quotationToNumber } from '@common/utils';
import { tinkoff as TinkoffInstruments } from '@external/tinkoff/protos/instruments';
import { tinkoff as TinkoffMarketData } from '@external/tinkoff/protos/marketdata';
import { Metadata } from '@grpc/grpc-js';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientGrpc } from '@nestjs/microservices';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Bond, Coupon } from '@prisma/client';
import { firstValueFrom } from 'rxjs';

import { BondService } from './bond.service';
import { bondMapper } from './mappers/bond.mapper';
import { couponMapper } from './mappers/coupon.mapper';
import { lastPriceMapper } from './mappers/last-price.mapper';

const REQUEST_LIMIT = 50; // max requests per minute

@Injectable()
export class BondCronService {
  private readonly metadata = new Metadata();
  private readonly instrumentsService: TinkoffInstruments._public.invest.api.contract.v1.InstrumentsService;
  private readonly marketdataService: TinkoffMarketData._public.invest.api.contract.v1.MarketDataService;

  constructor(
    @Inject('INSTRUMENTS_CLIENT') private readonly instrumentsClient: ClientGrpc,
    @Inject('MARKETDATA_CLIENT') private readonly marketdataClient: ClientGrpc,
    private readonly configService: ConfigService,
    private readonly bondService: BondService
  ) {
    this.metadata.add('authorization', `Bearer ${this.configService.get('TINKOFF_TOKEN')}`);
    this.instrumentsService =
      this.instrumentsClient.getService<TinkoffInstruments._public.invest.api.contract.v1.InstrumentsService>(
        'InstrumentsService'
      );
    this.marketdataService =
      this.marketdataClient.getService<TinkoffMarketData._public.invest.api.contract.v1.MarketDataService>(
        'MarketDataService'
      );
  }

  @Cron('0 2 * * *', { timeZone: 'Europe/Moscow' })
  public async updateBonds(offset = 0) {
    console.log('Updating bonds...');
    const bonds = await this.getBonds();

    console.log(`Updating ${bonds.length} bonds...`);

    await this.bondService.updateOrInsertBonds(bonds);

    console.log('Updating coupons...');

    for (let i = offset; i < bonds.length; i += REQUEST_LIMIT) {
      const slice = bonds.slice(i, i + REQUEST_LIMIT);
      const coupons = await this.getCoupons(slice);

      console.log(`Updating ${i} to ${i + REQUEST_LIMIT} coupons...`);

      await this.bondService.updateCoupons(coupons);
    }

    console.log('Updating yield to maturity...');

    await this.updateYields();

    console.log('Bonds updated');
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  public async updateBondPrices() {
    console.log('Updating bond prices...');
    const bonds = await this.bondService.getBonds();

    const response = await firstValueFrom(
      this.marketdataService.getLastPrices(
        {
          instrumentId: bonds.map((bond) => bond.uid).filter((uid) => !!uid),
        },
        this.metadata
      )
    );

    const convertedLastPrices = response.lastPrices?.map((lastPrice) => lastPriceMapper(lastPrice)) ?? [];

    await this.bondService.updatePrices(convertedLastPrices);

    console.log('Updating yield to maturity...');

    await this.updateYields();

    console.log('Bond prices updated');
  }

  private async getBonds(): Promise<Omit<Bond, 'id'>[]> {
    const response = await firstValueFrom(
      this.instrumentsService.bonds(
        {
          instrumentStatus:
            TinkoffInstruments._public.invest.api.contract.v1.InstrumentStatus.INSTRUMENT_STATUS_BASE,
          instrumentExchange:
            TinkoffInstruments._public.invest.api.contract.v1.InstrumentExchangeType
              .INSTRUMENT_EXCHANGE_UNSPECIFIED,
        },
        this.metadata
      )
    );

    return response.instruments?.map((bond) => bondMapper(bond)) ?? [];
  }

  private async getCoupons(bonds: Omit<Bond, 'id'>[]): Promise<{ uid: string; coupons: Coupon[] }[]> {
    const filteredBonds = bonds.filter((bond) => !!bond.figi && !!bond.maturityDate);

    const timePerRequest = 60 / REQUEST_LIMIT;
    let startTime: Date;

    const result: { uid: string; coupons: Coupon[] }[] = [];
    let bondIndex = 1;
    for (const bond of filteredBonds) {
      startTime = new Date();
      console.log(`[${bondIndex}/${filteredBonds.length}]Fetching coupons for ${bond.name}...`);
      const response = await firstValueFrom(
        this.instrumentsService.getBondCoupons(
          {
            figi: bond.figi!,
            from: dateToTimestamp(new Date()),
            to: dateToTimestamp(bond.maturityDate),
          },
          this.metadata
        )
      );
      const coupons = response.events?.map((coupon) => couponMapper(coupon)) ?? [];

      result.push({ uid: bond.uid, coupons });

      const timeout = timePerRequest - (new Date().getTime() - startTime.getTime()) / 1000;

      await new Promise((resolve) => setTimeout(resolve, (timeout < 0 ? 0 : timeout) * 1000));

      bondIndex++;
    }

    return result;
  }

  private async updateYields() {
    const bonds = await this.bondService.getBonds();
    const result: { uid: string; ytm: number }[] = [];
    for (const bond of bonds) {
      if (!bond.maturityDate) {
        continue;
      }
      const nominal = quotationToNumber(bond.nominal);
      let lastPrice = quotationToNumber(bond.lastPrice?.price);
      const accumulatedCoupon = quotationToNumber(bond.aciValue);

      if (!nominal || !lastPrice || accumulatedCoupon === null) {
        continue;
      }
      lastPrice = (lastPrice / 100) * nominal;

      const couponProfit =
        bond.coupons.reduce((acc, coupon) => {
          return acc + quotationToNumber(coupon.payOneBond)!;
        }, 0) - accumulatedCoupon;

      const priceProfit = nominal - lastPrice;

      const daysLeft = (bond.maturityDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24);
      const ytm = (couponProfit + priceProfit) / lastPrice / (daysLeft / 365.25);

      result.push({ uid: bond.uid, ytm });
    }

    await this.bondService.updateYieldToMaturity(result);
  }
}
