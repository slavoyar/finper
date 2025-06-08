import { google, tinkoff } from '@external/tinkoff/protos/common';
import { MoneyValue, Quotation } from '@prisma/client';

export async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const toNull = <T>(value: T | undefined): T | null => (value ? value : null);

export function timestampToDate(timestamp?: google.protobuf.Timestamp | null): Date | null {
  if (!timestamp || !timestamp.seconds) return null;
  const date = new Date(timestamp.seconds * 1000);
  return isNaN(date.getTime()) ? null : date;
}

export const dateToTimestamp = (date?: Date | null): google.protobuf.Timestamp | undefined => {
  if (!date) {
    return undefined;
  }
  return {
    seconds: Math.floor(date.getTime() / 1000),
    nanos: date.getMilliseconds() * 1e6,
  };
};

export const quotationToSchemaQuotation = (
  quotation?: tinkoff._public.invest.api.contract.v1.Quotation
): Quotation | null => {
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
): MoneyValue | null => {
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

export function quotationToNumber(quotation?: Quotation | null): number | null {
  if (!quotation) {
    return null;
  }
  return (quotation.units || 0) + (quotation.nano || 0) / 1e9;
}
