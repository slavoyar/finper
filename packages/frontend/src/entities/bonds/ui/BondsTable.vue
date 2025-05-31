<template>
  <ATable
    :loading="bondStore.isLoading"
    :columns="columns"
    :data-source="bondStore.bonds"
    :row-key="(record) => record.id"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <a
          :href="`https://www.tbank.ru/invest/bonds/${record.ticker}/`"
          target="_blank"
          rel="noopener
          noreferrer"
        >
          {{ record.name }}
        </a>
      </template>
    </template>
  </ATable>
</template>

<script lang="ts" setup>
import { TableColumnType } from 'ant-design-vue';
import { useBondsStore } from '../model';
import { onMounted } from 'vue';
import { BondDto } from '@investments/shared';

const bondStore = useBondsStore();

onMounted(() => {
  bondStore.fetchBonds();
});

const getDuration = (maturityDate: string) => {
  const date = new Date(maturityDate);
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  const months = Math.floor(days / 30);
  return months > 0 ? `${months} months` : `${days} days`;
};

const riskTypeByLevel: Record<number, string> = {
  1: 'Low',
  2: 'Medium',
  3: 'High',
};

const columns: TableColumnType<BondDto>[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: 'Risk',
    dataIndex: 'riskLevel',
    key: 'risk',
    filters: [
      {
        text: 'Low',
        value: 1,
      },
      {
        text: 'Medium',
        value: 2,
      },
      {
        text: 'High',
        value: 3,
      },
    ],
    onFilter: (value, record) => record.riskLevel === value,
    defaultFilteredValue: [1],
    customRender: ({ value }) => riskTypeByLevel[value],
  },
  {
    title: 'Price',
    dataIndex: 'lastPrice',
    key: 'price',
    customRender: ({ value, record }) => `${value.toFixed(2)} ${record.currency}`,
  },
  {
    title: 'Yield',
    dataIndex: 'yield',
    key: 'yield',
    sorter: (a, b) => Number(a.yield ?? 0) - Number(b.yield ?? 0),
    defaultSortOrder: 'descend',
    customRender: ({ value }) => `${(value * 100).toFixed(2)} %`,
  },
  {
    title: 'Duration',
    key: 'duration',
    sorter: (a, b) => a.maturityDate.localeCompare(b.maturityDate),
    customRender: ({ record }) => getDuration(record.maturityDate),
  },
];
</script>
