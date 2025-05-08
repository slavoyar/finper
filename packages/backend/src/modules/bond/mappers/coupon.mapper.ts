import { moneyValueToSchemaMoneyValue, timestampToDate } from '@common/utils';
import { tinkoff } from '@external/tinkoff/protos/instruments';
import { Coupon } from '@prisma/client';

export const couponMapper = (coupon: tinkoff._public.invest.api.contract.v1.Coupon): Coupon => {
  return {
    figi: coupon.figi ?? null,
    couponDate: timestampToDate(coupon.couponDate),
    couponEndDate: timestampToDate(coupon.couponEndDate),
    couponStartDate: timestampToDate(coupon.couponStartDate),
    couponPeriod: coupon.couponPeriod ?? null,
    couponNumber: coupon.couponNumber ?? null,
    couponType: coupon.couponType ?? null,
    fixDate: timestampToDate(coupon.fixDate),
    payOneBond: moneyValueToSchemaMoneyValue(coupon.payOneBond),
  };
};
