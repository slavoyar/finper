import { yieldToMaturity } from './yield-to-maturity';

describe('yieldToMaturity', () => {
  it('recovers a hand-computed annual effective yield', () => {
    const asOf = new Date('2026-01-01T00:00:00.000Z');
    const maturity = new Date('2027-01-01T00:00:00.000Z');
    const y = 0.08;
    const t = 182 / 365;
    const dirty = 40 / (1 + y) ** t + 1040 / (1 + y);
    expect(dirty).toBeCloseTo(1001.4570389747026, 8);

    const solved = yieldToMaturity({
      dirtyPrice: dirty,
      redemption: 1000,
      maturity,
      asOf,
      coupons: [
        { amount: 40, date: new Date('2026-07-02T00:00:00.000Z') },
        { amount: 40, date: maturity },
      ],
    });

    expect(solved).toBeCloseTo(y, 10);
    const reconstructed = 40 / (1 + solved!) ** t + 1040 / (1 + solved!);
    expect(reconstructed).toBeCloseTo(dirty, 6);
  });

  it('discounts face only when no coupon dates are stored', () => {
    const asOf = new Date('2026-10-08T00:00:00.000Z');
    const maturity = new Date('2028-05-15T00:00:00.000Z');
    const t = 585 / 365;
    const dirty = 990.9;
    const expected = (1000 / dirty) ** (1 / t) - 1;

    const solved = yieldToMaturity({
      dirtyPrice: dirty,
      redemption: 1000,
      maturity,
      asOf,
      coupons: [],
    });

    expect(solved).toBeCloseTo(expected, 10);
    expect(1000 / (1 + solved!) ** t).toBeCloseTo(dirty, 6);
  });
});
