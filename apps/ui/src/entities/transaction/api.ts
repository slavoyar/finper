import { TransactionDto } from '@finper/shared';
import { BaseService } from '@shared/api';

class TransactionService extends BaseService {
  getTransactions() {
    return this.api.get<TransactionDto[]>();
  }

  addTransaction(transaction: TransactionDto) {
    return this.api.post(transaction);
  }

  updateTransaction(transaction: TransactionDto) {
    return this.api.put(`/${transaction.id}`, transaction);
  }

  deleteTransaction(transactionId: string) {
    return this.api.delete(`/${transactionId}`);
  }
}

export const transactionService = new TransactionService('budget/transactions');
