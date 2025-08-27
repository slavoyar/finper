<template>
  <AdaptiveTable :columns="columns">
    <template #bodyCell="{ column, record }">
      <slot name="category" v-if="column.dataIndex === 'category'" :category-id="record.categoryId" />
    </template>
  </AdaptiveTable>
</template>

<script lang="ts" setup>
import { AdaptiveTable } from '@shared/ui';

const columns = [
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Limit',
    dataIndex: 'limit',
    key: 'limit',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
];
</script>
