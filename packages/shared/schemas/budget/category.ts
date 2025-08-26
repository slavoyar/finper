import { type Static, Type } from '@sinclair/typebox';

export const CategorySchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
});

export const CreateCategorySchema = Type.Omit(CategorySchema, ['id']);
export const UpdateCategorySchema = Type.Partial(CreateCategorySchema);

export type CategoryDto = Static<typeof CategorySchema>;
export type CreateCategoryDto = Static<typeof CreateCategorySchema>;
export type UpdateCategoryDto = Static<typeof UpdateCategorySchema>;
