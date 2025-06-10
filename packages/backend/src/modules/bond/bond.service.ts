import { PrismaService } from '@common/prisma/prisma.service';
import { BondPresetDto } from '@finper/shared';
import { Injectable } from '@nestjs/common';
import { Bond, Coupon, LastPrice } from '@prisma/client';

@Injectable()
export class BondService {
  constructor(private prismaService: PrismaService) {}

  public getBonds() {
    return this.prismaService.bond.findMany({
      where: {
        NOT: {
          amortizationFlag: true,
        },
      },
    });
  }

  public getFilteredBonds(
    preset: Pick<BondPresetDto, 'minDuration' | 'maxDuration' | 'riskLevels' | 'count'>
  ) {
    const { minDuration, maxDuration, riskLevels } = preset;

    const getDate = (duration?: number) => {
      if (!duration) {
        return undefined;
      }
      return new Date(Date.now() + duration * (365.25 / 12) * 24 * 60 * 60 * 1000);
    };

    return this.prismaService.bond.findMany({
      where: {
        AND: [
          {
            NOT: {
              amortizationFlag: false,
            },
          },
          {
            maturityDate: {
              gte: getDate(minDuration),
              lte: getDate(maxDuration),
            },
          },
          riskLevels.length > 0 ? { riskLevel: { in: riskLevels } } : {},
        ],
      },
      orderBy: {
        yield: 'desc',
      },
      take: preset.count,
    });
  }

  public async updateOrInsertBonds(bonds: Omit<Bond, 'id'>[]) {
    const ops = bonds.map((bond) =>
      this.prismaService.bond.upsert({
        where: { uid: bond.uid },
        update: { ...bond, coupons: undefined, lastPrice: undefined },
        create: bond,
      })
    );

    await this.prismaService.$transaction(ops);
  }

  public async updateCoupons(couponsPerBond: { uid: string; coupons: Coupon[] }[]) {
    const ops = couponsPerBond.map(({ uid, coupons }) =>
      this.prismaService.bond.update({
        where: { uid },
        data: {
          coupons,
        },
      })
    );

    await this.prismaService.$transaction(ops);
  }

  public async updatePrices(prices: LastPrice[]) {
    const operations = prices
      .filter((price) => !!price.instrumentUid)
      .map((price) =>
        this.prismaService.bond.update({
          where: { uid: price.instrumentUid! },
          data: {
            lastPrice: price,
          },
        })
      );

    await this.prismaService.$transaction(operations);
  }

  async updateYieldToMaturity(ytm: { uid: string; ytm: number }[]) {
    const operations = ytm.map(({ uid, ytm }) =>
      this.prismaService.bond.update({
        where: { uid },
        data: {
          yield: ytm,
        },
      })
    );

    await this.prismaService.$transaction(operations);
  }
}
