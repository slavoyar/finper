import { moneyValueToSchemaMoneyValue, timestampToDate } from '@common/utils';
import { tinkoff as TinkoffMarketData } from '@external/tinkoff/protos/marketdata';
import { LastPrice } from '@prisma/client';

export const lastPriceMapper = (
  lastPrice: TinkoffMarketData._public.invest.api.contract.v1.LastPrice
): LastPrice => {
  return {
    figi: lastPrice.figi ?? null,
    price: moneyValueToSchemaMoneyValue(lastPrice.price),
    time: timestampToDate(lastPrice.time),
    instrumentUid: lastPrice.instrumentUid ?? null,
    lastPriceType: lastPrice.lastPriceType ?? null,
  } satisfies LastPrice;
};
