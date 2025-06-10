import { type Static, Type } from '@sinclair/typebox';

import { PresetSchema } from './preset';

const BondPresetDataSchema = Type.Object({
  riskLevels: Type.Array(Type.Number()),
  minDuration: Type.Number(),
  maxDuration: Type.Number(),
  count: Type.Number(),
});

export const BondPresetSchema = Type.Intersect([
  PresetSchema,
  Type.Object({
    type: Type.Literal('bond'),
  }),
  BondPresetDataSchema,
]);

export type BondPresetDto = Static<typeof BondPresetSchema>;

export type CreateBondPresetDto = Omit<BondPresetDto, 'id'>;
