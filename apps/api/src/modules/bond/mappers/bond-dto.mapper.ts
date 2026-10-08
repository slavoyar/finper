import { asLastPrice, asQuotation, quotationToNumber } from '@common/utils';
import { BondDto } from '@finper/shared';
import { Bond } from '@prisma/client';

export const bondDtoMapper = (bond: Bond): BondDto | null => {
  if (!bond.name || !bond.maturityDate || !bond.riskLevel || !bond.currency || !bond.ticker) {
    return null;
  }

  const nominal = quotationToNumber(asQuotation(bond.nominal));
  let lastPrice = quotationToNumber(asLastPrice(bond.lastPrice)?.price);
  const accumulatedCoupon = quotationToNumber(asQuotation(bond.aciValue));

  if (!nominal || !lastPrice || accumulatedCoupon === null) {
    return null;
  }
  lastPrice = (lastPrice / 100) * nominal;

  return {
    id: bond.id,
    uid: bond.uid,
    name: bond.name,
    ticker: bond.ticker,
    currency: bond.currency,
    nominal,
    lastPrice,
    yield: bond.yield ?? undefined,
    maturityDate: bond.maturityDate.toISOString(),
    riskLevel: bond.riskLevel,
  };
};
