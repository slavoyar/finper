import { timestampToDate } from '@common/utils';
import { tinkoff as TinkoffMarketData } from '@modules/tinkoff/protos/marketdata';
import { LastPrice } from '@prisma/client';

export const lastPriceMapper = (
  lastPrice: TinkoffMarketData._public.invest.api.contract.v1.LastPrice
): LastPrice => {
  return {
    figi: lastPrice.figi ?? null,
    price: lastPrice.price
      ? { nano: lastPrice.price.nano ?? null, units: lastPrice.price.units ?? null }
      : null,
    time: timestampToDate(lastPrice.time),
    instrumentUid: lastPrice.instrumentUid ?? null,
    lastPriceType: lastPrice.lastPriceType ?? null,
  } satisfies LastPrice;
};
