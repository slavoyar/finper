import { TransactionDto } from '@finper/shared';
import { defineStore } from 'pinia';
import { ref } from 'vue';

import { transactionService } from '../api';

export const useTransactionStore = defineStore('transaction', () => {
  const transactions = ref<TransactionDto[]>([]);

  const getTransactions = async () => {
    const response = await transactionService.getTransactions();
    const transactionsToAdd = response.filter((item) => transactions.value.every((t) => t.id !== item.id));
    transactions.value = [...transactions.value, ...transactionsToAdd];
  };

  return { transactions, getTransactions };
});
