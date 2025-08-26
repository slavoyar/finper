import { Type } from '@sinclair/typebox';

export const PresetSchema = Type.Object({
  id: Type.String(),
  name: Type.String({ minLength: 3 }),
});
