import {
  type CouponJson,
  moneyValueToSchemaMoneyValue,
  quotationToNumber,
  quotationToSchemaQuotation,
  timestampToDate,
} from '@common/utils';
import { tinkoff } from '@external/tinkoff/protos/instruments';

export const couponMapper = (coupon: tinkoff._public.invest.api.contract.v1.Coupon): CouponJson => {
  return {
    figi: coupon.figi ?? null,
    couponDate: timestampToDate(coupon.couponDate)?.toISOString() ?? null,
    couponEndDate: timestampToDate(coupon.couponEndDate)?.toISOString() ?? null,
    couponStartDate: timestampToDate(coupon.couponStartDate)?.toISOString() ?? null,
    couponPeriod: coupon.couponPeriod ?? null,
    couponNumber: quotationToNumber(
      quotationToSchemaQuotation(
        coupon.couponNumber as unknown as tinkoff._public.invest.api.contract.v1.Quotation
      )
    ),
    couponType: coupon.couponType ?? null,
    fixDate: timestampToDate(coupon.fixDate)?.toISOString() ?? null,
    payOneBond: moneyValueToSchemaMoneyValue(coupon.payOneBond),
  };
};
