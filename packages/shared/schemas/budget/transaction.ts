import { Static, Type } from '@sinclair/typebox';

export const TransactionSchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
  categoryId: Type.String(),
  type: Type.Union([Type.Literal('income'), Type.Literal('expense')]),
  amount: Type.Number({ minimum: 0 }),
  date: Type.String({ format: 'date-time' }),
  startDate: Type.Optional(Type.String({ format: 'date-time' })),
  endDate: Type.Optional(Type.String({ format: 'date-time' })),
  recurrence: Type.Optional(Type.Union([Type.Literal('monthly'), Type.Literal('yearly')])),
});

export const CreateTransactionSchema = Type.Omit(TransactionSchema, ['id']);
export const UpdateTransactionSchema = Type.Partial(CreateTransactionSchema);

export type TransactionDto = Static<typeof TransactionSchema>;
export type CreateTransactionDto = Static<typeof CreateTransactionSchema>;
export type UpdateTransactionDto = Static<typeof UpdateTransactionSchema>;
export type TransactionType = TransactionDto['type'];
export type Recurrence = TransactionDto['recurrence'];
