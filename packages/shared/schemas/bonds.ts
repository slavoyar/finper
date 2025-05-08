import { type Static, Type } from '@sinclair/typebox';

export const BondSchema = Type.Object({
  id: Type.String(),
  uid: Type.String({ format: 'uuid' }),
  ticker: Type.String(),
  name: Type.String({ minLength: 1 }),
  nominal: Type.Number(),
  currency: Type.String({ minLength: 1 }),
  lastPrice: Type.Number(),
  yield: Type.Optional(Type.Number()),
  maturityDate: Type.String({ format: 'date' }),
  riskLevel: Type.Number(),
});

export type BondDto = Static<typeof BondSchema>;
