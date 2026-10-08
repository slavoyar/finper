import { google, tinkoff } from '@external/tinkoff/protos/common';

export type QuotationJson = { units: number | null; nano: number | null };
export type MoneyJson = { currency: string | null; units: number | null; nano: number | null };

export type CouponJson = {
  figi: string | null;
  couponDate: string | null;
  couponNumber: number | null;
  fixDate: string | null;
  payOneBond: MoneyJson | null;
  couponType: number | null;
  couponStartDate: string | null;
  couponEndDate: string | null;
  couponPeriod: number | null;
};

export type LastPriceJson = {
  figi: string | null;
  price: QuotationJson | null;
  time: string | null;
  instrumentUid: string | null;
  lastPriceType: number | null;
};

export function asQuotation(value: unknown): QuotationJson | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const row = value as { units?: number | null; nano?: number | null };
  return { units: row.units ?? null, nano: row.nano ?? null };
}

export function asLastPrice(value: unknown): LastPriceJson | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  return value as LastPriceJson;
}

export function asCoupons(value: unknown): CouponJson[] {
  return Array.isArray(value) ? (value as CouponJson[]) : [];
}

export function timestampToDate(timestamp?: google.protobuf.Timestamp | null): Date | null {
  if (!timestamp || !timestamp.seconds) return null;
  const date = new Date(timestamp.seconds * 1000);
  return isNaN(date.getTime()) ? null : date;
}

export const dateToTimestamp = (date?: Date | string | null): google.protobuf.Timestamp | undefined => {
  if (!date) {
    return undefined;
  }
  const value = date instanceof Date ? date : new Date(date);
  return {
    seconds: Math.floor(value.getTime() / 1000),
    nanos: value.getMilliseconds() * 1e6,
  };
};

export const quotationToSchemaQuotation = (
  quotation?: tinkoff._public.invest.api.contract.v1.Quotation
): QuotationJson | null => {
  if (!quotation) {
    return null;
  }
  return {
    nano: quotation.nano ?? null,
    units:
      sanitizeUnits(quotation.units as unknown as { low: number; high: number; unsigned: boolean }) ?? null,
  };
};

export const moneyValueToSchemaMoneyValue = (
  moneyValue?: tinkoff._public.invest.api.contract.v1.MoneyValue
): MoneyJson | null => {
  if (!moneyValue) {
    return null;
  }
  return {
    currency: moneyValue.currency ?? null,
    nano: moneyValue.nano ?? null,
    units:
      sanitizeUnits(moneyValue.units as unknown as { low: number; high: number; unsigned: boolean }) ?? null,
  };
};

export function sanitizeUnits(units?: { low: number; high: number; unsigned: boolean }): number | null {
  if (!units) return null;
  const { low, high, unsigned } = units;
  const result = high * 2 ** 32 + (low >>> 0);
  return unsigned ? result : result | 0;
}

export function quotationToNumber(
  quotation?: { units?: number | null; nano?: number | null } | null
): number | null {
  if (!quotation) {
    return null;
  }
  return (quotation.units || 0) + (quotation.nano || 0) / 1e9;
}
