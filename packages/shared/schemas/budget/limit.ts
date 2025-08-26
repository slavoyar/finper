import { Static, Type } from '@sinclair/typebox';

export const LimitSchema = Type.Object({
  id: Type.String(),
  categoryId: Type.String(),
  amount: Type.Number({ minimum: 0 }),
  period: Type.Union([Type.Literal('monthly'), Type.Literal('yearly')]),
});

export const CreateLimitSchema = Type.Omit(LimitSchema, ['id']);
export const UpdateLimitSchema = Type.Partial(CreateLimitSchema);

export type LimitDto = Static<typeof LimitSchema>;
export type CreateLimitDto = Static<typeof CreateLimitSchema>;
export type UpdateLimitDto = Static<typeof UpdateLimitSchema>;

export type LimitPeriod = LimitDto['period'];
