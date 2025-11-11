import { PrismaService } from '@common/prisma/prisma.service';
import { BondPresetDto } from '@finper/shared';
import { Injectable, Logger } from '@nestjs/common';
import { Bond, Coupon, LastPrice } from '@prisma/client';

@Injectable()
export class BondService {
  constructor(private prismaService: PrismaService) {}

  private readonly logger = new Logger('BondService');

  // helper to split arrays into chunks
  private chunkArray<T>(arr: T[], size: number): T[][] {
    const res: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      res.push(arr.slice(i, i + size));
    }
    return res;
  }

  // run tasks (functions that return promises) in batches and log rejections without throwing
  private async runAllSettledBatched<T = any>(tasks: Array<() => Promise<T>>, batchSize = 50, context = '') {
    if (!tasks || tasks.length === 0) {
      return;
    }

    const batches = this.chunkArray(tasks, batchSize);
    for (let bIndex = 0; bIndex < batches.length; bIndex++) {
      const batch = batches[bIndex].map((task) => {
        try {
          return task();
        } catch (err) {
          // If task factory throws synchronously, wrap in rejected promise so it's handled uniformly
          // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
          return Promise.reject(err);
        }
      });

      const results = await Promise.allSettled(batch);
      results.forEach((res, idx) => {
        if (res.status === 'rejected') {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const err = res.reason;
          this.logger.error(
            `Batch ${bIndex} task ${idx} failed${context ? ` (${context})` : ''}`,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            err?.stack ?? String(err),
            {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              reason: err,
              batch: bIndex,
              index: idx,
              context,
            }
          );
        }
      });
    }
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
    // build tasks (functions) so DB calls start per-batch
    const tasks = bonds.map(
      (bond) => () =>
        this.prismaService.bond.upsert({
          where: { uid: bond.uid },
          update: { ...bond, coupons: undefined, lastPrice: undefined },
          create: bond,
        })
    );

    await this.runAllSettledBatched(tasks, 50, 'updateOrInsertBonds');
  }

  public async fillCoupons(couponsPerBond: { uid: string; coupons: Coupon[] }[]) {
    const tasks = couponsPerBond.map(
      ({ uid, coupons }) =>
        () =>
          this.prismaService.bond.update({
            where: { uid },
            data: {
              coupons,
            },
          })
    );

    await this.runAllSettledBatched(tasks, 50, 'fillCoupons');
  }

  public async updateCoupons() {
    const bonds = await this.getBonds();
    const tasks = bonds
      .map((bond) => {
        const updateCoupons = bond.coupons.filter((coupon) => {
          return coupon.couponEndDate && coupon.couponEndDate > new Date();
        });

        if (updateCoupons.length !== bond.coupons.length) {
          return () =>
            this.prismaService.bond.update({
              where: { uid: bond.uid },
              data: {
                coupons: updateCoupons,
              },
            });
        }
        return null;
      })
      .filter((op) => !!op) as Array<() => Promise<any>>;

    await this.runAllSettledBatched(tasks, 50, 'updateCoupons');
  }

  public async updatePrices(prices: LastPrice[]) {
    const tasks = prices
      .filter((price) => !!price.instrumentUid)
      .map(
        (price) => () =>
          this.prismaService.bond.update({
            where: { uid: price.instrumentUid! },
            data: {
              lastPrice: price,
            },
          })
      );

    await this.runAllSettledBatched(tasks, 50, 'updatePrices');
  }

  public async updateYieldToMaturity(ytm: { uid: string; ytm: number }[]) {
    const tasks = ytm.map(
      ({ uid, ytm }) =>
        () =>
          this.prismaService.bond.update({
            where: { uid },
            data: {
              yield: ytm,
            },
          })
    );

    await this.runAllSettledBatched(tasks, 50, 'updateYieldToMaturity');
  }

  public async removeBonds(ids: string[]) {
    if (!ids || ids.length === 0) {
      return;
    }

    // chunk deletes to avoid huge single queries and to reduce memory/DB pressure
    const idBatches = this.chunkArray(ids, 500);
    const tasks = idBatches.map(
      (batch) => () =>
        this.prismaService.bond.deleteMany({
          where: {
            uid: {
              in: batch,
            },
          },
        })
    );

    await this.runAllSettledBatched(tasks, 10, 'removeBonds');
  }
}
