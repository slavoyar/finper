<template>
  <AdaptiveTable :columns="columns">
    <template #bodyCell="{ column, record }">
      <slot name="category" v-if="column.dataIndex === 'category'" :category-id="record.categoryId" />
    </template>
  </AdaptiveTable>
</template>

<script lang="ts" setup>
import { AdaptiveTable } from '@shared/ui';
import { onMounted } from 'vue';

import { useTransactionStore } from '../model';

const transactionStore = useTransactionStore();

onMounted(async () => {
  await transactionStore.getTransactions();
});

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
];
</script>
