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

export type TransactionDto = Static<typeof TransactionSchema>;
export type CreateTransactionDto = Omit<TransactionDto, 'id'>;
export type TransactionType = TransactionDto['type'];
export type Recurrence = TransactionDto['recurrence'];
