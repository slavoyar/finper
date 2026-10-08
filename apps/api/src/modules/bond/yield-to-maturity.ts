const DAY_MS = 86_400_000;

type Cashflow = { amount: number; date: Date };
type Flow = { amount: number; t: number };

/** Actual/365: UTC calendar days / 365. No day-count library. */
function yearFraction(from: Date, to: Date): number {
  const utcDay = (date: Date) => Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  return (utcDay(to) - utcDay(from)) / DAY_MS / 365;
}

function presentValue(y: number, flows: Flow[]) {
  const base = 1 + y;
  let price = 0;
  let deriv = 0;
  for (const flow of flows) {
    const growth = base ** flow.t;
    price += flow.amount / growth;
    deriv += (-flow.t * flow.amount) / (base * growth);
  }
  return { price, deriv };
}

function residualOk(price: number, dirtyPrice: number) {
  return Number.isFinite(price) && Math.abs(price - dirtyPrice) <= 1e-8 * Math.max(1, dirtyPrice);
}

function newton(dirtyPrice: number, flows: Flow[]): number | null {
  const horizon = Math.max(...flows.map((flow) => flow.t));
  const undiscounted = flows.reduce((sum, flow) => sum + flow.amount, 0);
  let y = (undiscounted / dirtyPrice) ** (1 / horizon) - 1;
  if (!Number.isFinite(y) || y <= -0.999) y = 0.05;

  for (let i = 0; i < 40; i++) {
    const { price, deriv } = presentValue(y, flows);
    if (residualOk(price, dirtyPrice)) return y;
    if (!Number.isFinite(deriv) || deriv === 0) return null;
    const next = y - (price - dirtyPrice) / deriv;
    if (!Number.isFinite(next) || next <= -0.999) return null;
    y = next;
  }
  return null;
}

function bisect(dirtyPrice: number, flows: Flow[]): number | null {
  let lo = -0.999;
  let hi = 1;
  const priceAt = (y: number) => presentValue(y, flows).price;
  if (!(priceAt(lo) > dirtyPrice)) return null;
  while (priceAt(hi) > dirtyPrice && hi < 1e6) hi = hi * 2 + 0.1;
  if (!(priceAt(hi) <= dirtyPrice)) return null;

  for (let i = 0; i < 80; i++) {
    const mid = (lo + hi) / 2;
    if (priceAt(mid) > dirtyPrice) lo = mid;
    else hi = mid;
  }
  const y = (lo + hi) / 2;
  return residualOk(priceAt(y), dirtyPrice) ? y : null;
}

/**
 * Annual effective yield to maturity.
 * Dirty price = clean + accrued when accrued is known; callers pass that sum.
 * Coupons with no date or amount are omitted.
 * ponytail: empty coupon list discounts redemption at maturity only — no invented schedule.
 */
export function yieldToMaturity(input: {
  dirtyPrice: number;
  redemption: number;
  maturity: Date;
  coupons?: Cashflow[];
  asOf?: Date;
}): number | null {
  if (!(input.dirtyPrice > 0)) return null;
  const asOf = input.asOf ?? new Date();
  const flows: Flow[] = [];

  for (const coupon of input.coupons ?? []) {
    const t = yearFraction(asOf, coupon.date);
    if (coupon.amount > 0 && t > 0) flows.push({ amount: coupon.amount, t });
  }

  const tn = yearFraction(asOf, input.maturity);
  if (input.redemption > 0 && tn > 0) flows.push({ amount: input.redemption, t: tn });
  if (!flows.length) return null;

  const solved = newton(input.dirtyPrice, flows);
  if (solved != null && residualOk(presentValue(solved, flows).price, input.dirtyPrice)) return solved;
  return bisect(input.dirtyPrice, flows);
}
