import { type Static, Type } from '@sinclair/typebox';

const LimitSchema = Type.Object({
  amount: Type.Number({ minimum: 0 }),
  period: Type.Union([Type.Literal('monthly'), Type.Literal('yearly')]),
});

export const CategorySchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
  limit: Type.Optional(LimitSchema),
});

export const CreateCategorySchema = Type.Omit(CategorySchema, ['id']);
export const UpdateCategorySchema = Type.Partial(CreateCategorySchema);

export type CategoryDto = Static<typeof CategorySchema>;
export type CreateCategoryDto = Static<typeof CreateCategorySchema>;
export type UpdateCategoryDto = Static<typeof UpdateCategorySchema>;
