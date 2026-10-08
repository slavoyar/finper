import { type LastPriceJson, quotationToSchemaQuotation, timestampToDate } from '@common/utils';
import { tinkoff as TinkoffMarketData } from '@external/tinkoff/protos/marketdata';

export const lastPriceMapper = (
  lastPrice: TinkoffMarketData._public.invest.api.contract.v1.LastPrice
): LastPriceJson => {
  return {
    figi: lastPrice.figi ?? null,
    price: quotationToSchemaQuotation(lastPrice.price),
    time: timestampToDate(lastPrice.time)?.toISOString() ?? null,
    instrumentUid: lastPrice.instrumentUid ?? null,
    lastPriceType: lastPrice.lastPriceType ?? null,
  };
};
