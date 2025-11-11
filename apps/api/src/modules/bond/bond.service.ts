import { PrismaService } from '@common/prisma/prisma.service';
import { BondPresetDto } from '@finper/shared';
import { Injectable, Logger } from '@nestjs/common';
import { Bond, Coupon, LastPrice } from '@prisma/client';

@Injectable()
export class BondService {
  constructor(private prismaService: PrismaService) {}

  private readonly logger = new Logger('BondService');

  private async runAllSettled<T = any>(promises: Promise<T>[], context = '') {
    if (!promises || promises.length === 0) {
      return;
    }
    const results = await Promise.allSettled(promises);
    results.forEach((res, idx) => {
      if (res.status === 'rejected') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const err = res.reason;
        this.logger.error(
          `Operation ${idx} failed${context ? ` (${context})` : ''}`,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          err?.stack ?? String(err),
          {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            reason: err,
            index: idx,
            context,
          }
        );
      }
    });
  }

  public getBonds(filtered = true) {
    if (!filtered) {
      return this.prismaService.bond.findMany();
    }
    return this.prismaService.bond.findMany({
      where: {
        AND: [
          {
            NOT: {
              amortizationFlag: true,
            },
          },
          {
            NOT: {
              floatingCouponFlag: true,
            },
          },
        ],
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
              amortizationFlag: true,
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

    await this.runAllSettled(ops, 'updateOrInsertBonds');
  }

  public async fillCoupons(couponsPerBond: { uid: string; coupons: Coupon[] }[]) {
    const ops = couponsPerBond.map(({ uid, coupons }) =>
      this.prismaService.bond.update({
        where: { uid },
        data: {
          coupons,
        },
      })
    );

    await this.runAllSettled(ops, 'fillCoupons');
  }

  public async updateCoupons() {
    const bonds = await this.getBonds();
    const ops = bonds
      .map((bond) => {
        const updateCoupons = bond.coupons.filter((coupon) => {
          return coupon.couponEndDate && coupon.couponEndDate > new Date();
        });

        if (updateCoupons.length !== bond.coupons.length) {
          return this.prismaService.bond.update({
            where: { uid: bond.uid },
            data: {
              coupons: updateCoupons,
            },
          });
        }
        return null;
      })
      .filter((op) => !!op) as Promise<any>[];

    await this.runAllSettled(ops, 'updateCoupons');
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

    await this.runAllSettled(operations, 'updatePrices');
  }

  public async updateYieldToMaturity(ytm: { uid: string; ytm: number }[]) {
    const operations = ytm.map(({ uid, ytm }) =>
      this.prismaService.bond.update({
        where: { uid },
        data: {
          yield: ytm,
        },
      })
    );

    await this.runAllSettled(operations, 'updateYieldToMaturity');
  }

  public async removeBonds(ids: string[]) {
    await this.prismaService.bond.deleteMany({
      where: {
        uid: {
          in: ids,
        },
      },
    });
  }
}
