import { delay } from '@common/utils';
import { Metadata } from '@grpc/grpc-js';
import { tinkoff as TinkoffInstruments } from '@modules/tinkoff/protos/instruments';
import { tinkoff as TinkoffOrders } from '@modules/tinkoff/protos/orders';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientGrpc } from '@nestjs/microservices';
import { Cron, CronExpression } from '@nestjs/schedule';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class BondCronService {
  private readonly metadata = new Metadata();
  constructor(
    @Inject('INSTRUMENTS_CLIENT') private readonly instrumentsClient: ClientGrpc,
    @Inject('ORDERS_CLIENT') private readonly ordersClient: ClientGrpc,
    private readonly configService: ConfigService
  ) {
    this.metadata.add('authorization', `Bearer ${this.configService.get('TINKOFF_TOKEN')}`);
  }

  @Cron('0 2 * * *', { timeZone: 'Europe/Moscow' })
  public async updateBonds() {
    const instrumentsService =
      this.instrumentsClient.getService<TinkoffInstruments._public.invest.api.contract.v1.InstrumentsService>(
        'InstrumentsService'
      );
    const response = await firstValueFrom(
      instrumentsService.bonds(
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
    console.log(response.instruments);
    // save bonds to database
  }

  @Cron(CronExpression.EVERY_HOUR)
  public async updateBondPrices() {
    const ordersService =
      this.ordersClient.getService<TinkoffOrders._public.invest.api.contract.v1.OrdersService>(
        'OrdersService'
      );

    const bonds: TinkoffInstruments._public.invest.api.contract.v1.Bond[] = [];

    for (let i = 0; i < bonds.length; i++) {
      const responses = await firstValueFrom(ordersService.getOrders({}, this.metadata));
      // write bond prices to database
      console.log(responses.orders);

      await delay(1000);
    }
  }
}
