import { type Static, Type } from '@sinclair/typebox';

export const CategorySchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
});

export type CategoryDto = Static<typeof CategorySchema>;
export type CreateCategoryDto = Omit<CategoryDto, 'id'>;
