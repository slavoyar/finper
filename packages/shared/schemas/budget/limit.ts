import { Static, Type } from '@sinclair/typebox';

export const LimitSchema = Type.Object({
  id: Type.String(),
  categoryId: Type.String(),
  amount: Type.Number({ minimum: 0 }),
  period: Type.Union([Type.Literal('monthly'), Type.Literal('yearly')]),
});

export type LimitDto = Static<typeof LimitSchema>;
export type CreateLimitDto = Omit<LimitDto, 'id'>;
export type LimitPeriod = LimitDto['period'];
