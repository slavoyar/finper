import {
  moneyValueToSchemaMoneyValue,
  quotationToSchemaQuotation,
  sanitizeUnits,
  timestampToDate,
} from '@common/utils';
import { tinkoff } from '@external/tinkoff/protos/instruments';
import { Prisma } from '@prisma/client';

const json = (value: Prisma.InputJsonValue | null): Prisma.InputJsonValue | typeof Prisma.JsonNull =>
  value ?? Prisma.JsonNull;

export const bondMapper = (bond: tinkoff._public.invest.api.contract.v1.Bond): Prisma.BondCreateInput => {
  return {
    uid: bond.uid!,
    ticker: bond.ticker ?? null,
    name: bond.name ?? null,
    isin: bond.isin ?? null,
    figi: bond.figi ?? null,
    classCode: bond.classCode ?? null,
    lot: bond.lot ?? null,
    currency: bond.currency ?? null,
    shortEnabledFlag: bond.shortEnabledFlag ?? null,
    exchange: bond.exchange ?? null,
    couponQuantityPerYear: bond.couponQuantityPerYear ?? null,
    maturityDate: timestampToDate(bond.maturityDate),
    stateRegDate: timestampToDate(bond.stateRegDate),
    placementDate: timestampToDate(bond.placementDate),
    countryOfRisk: bond.countryOfRisk ?? null,
    countryOfRiskName: bond.countryOfRiskName ?? null,
    sector: bond.sector ?? null,
    issueKind: bond.issueKind ?? null,
    issueSize:
      sanitizeUnits(bond.issueSize as unknown as { low: number; high: number; unsigned: boolean }) ?? null,
    issueSizePlan: sanitizeUnits(
      bond.issueSizePlan as unknown as { low: number; high: number; unsigned: boolean }
    ),
    tradingStatus: bond.tradingStatus ?? null,
    otcFlag: bond.otcFlag ?? null,
    buyAvailableFlag: bond.buyAvailableFlag ?? null,
    sellAvailableFlag: bond.sellAvailableFlag ?? null,
    floatingCouponFlag: bond.floatingCouponFlag ?? null,
    perpetualFlag: bond.perpetualFlag ?? null,
    amortizationFlag: bond.amortizationFlag ?? null,
    apiTradeAvailableFlag: bond.apiTradeAvailableFlag ?? null,
    realExchange: bond.realExchange ?? null,
    positionUid: bond.positionUid ?? null,
    assetUid: bond.assetUid ?? null,
    forIisFlag: bond.forIisFlag ?? null,
    forQualInvestorFlag: bond.forQualInvestorFlag ?? null,
    weekendFlag: bond.weekendFlag ?? null,
    blockedTcaFlag: bond.blockedTcaFlag ?? null,
    subordinatedFlag: bond.subordinatedFlag ?? null,
    liquidityFlag: bond.liquidityFlag ?? null,
    first_1minCandleDate: timestampToDate(bond.first_1minCandleDate),
    first_1dayCandleDate: timestampToDate(bond.first_1dayCandleDate),
    riskLevel: bond.riskLevel ?? null,
    bondType: bond.bondType ?? null,
    callDate: timestampToDate(bond.callDate),
    klong: json(quotationToSchemaQuotation(bond.klong)),
    kshort: json(quotationToSchemaQuotation(bond.kshort)),
    dlong: json(quotationToSchemaQuotation(bond.dlong)),
    dshort: json(quotationToSchemaQuotation(bond.dshort)),
    aciValue: json(moneyValueToSchemaMoneyValue(bond.aciValue)),
    dlongMin: json(quotationToSchemaQuotation(bond.dlongMin)),
    dshortMin: json(quotationToSchemaQuotation(bond.dshortMin)),
    dlongClient: json(quotationToSchemaQuotation(bond.dlongClient)),
    dshortClient: json(quotationToSchemaQuotation(bond.dshortClient)),
    nominal: json(moneyValueToSchemaMoneyValue(bond.nominal)),
    initialNominal: json(moneyValueToSchemaMoneyValue(bond.initialNominal)),
    minPriceIncrement: json(quotationToSchemaQuotation(bond.minPriceIncrement)),
    placementPrice: json(moneyValueToSchemaMoneyValue(bond.placementPrice)),
    brand: Prisma.JsonNull,
    lastPrice: Prisma.JsonNull,
    coupons: [],
    yield: null,
  };
};
