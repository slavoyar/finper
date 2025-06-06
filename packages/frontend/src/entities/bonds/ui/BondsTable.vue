<template>
  <ATable
    :loading="bondStore.isLoading"
    :columns="columns"
    :data-source="filteredSortedBonds"
    :row-key="(record) => record.id"
    @change="onTableChange"
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
    <template #customFilterDropdown>
      <DurationFilter v-model:min-duration="minDuration" v-model:max-duration="maxDuration" />
    </template>
    <template #customFilterIcon>
      <FilterFilled :style="{ color: minDuration || maxDuration ? '#108ee9' : undefined }" />
    </template>
  </ATable>
</template>

<script lang="ts" setup>
import { FilterFilled } from '@ant-design/icons-vue';
import { BondDto } from '@investments/shared';
import { riskTypeByLevel } from '@shared/consts';
import { toRef } from '@vueuse/core';
import { TableColumnType } from 'ant-design-vue';
import { FilterValue, SorterResult } from 'ant-design-vue/es/table/interface';
import { onMounted } from 'vue';

import { useBondsStore, useFilters } from '../model';
import { getDuration } from '../utils';
import DurationFilter from './DurationFilter.vue';

const bondStore = useBondsStore();
const bonds = toRef(bondStore, 'bonds');
const { selectedRisks, sortField, sortOrder, minDuration, maxDuration, filteredSortedBonds } =
  useFilters(bonds);

onMounted(async () => {
  await bondStore.fetchBonds();
});

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
    defaultFilteredValue: ['1'],
    customRender: ({ value }) => riskTypeByLevel[value as number],
  },
  {
    title: 'Price',
    dataIndex: 'lastPrice',
    key: 'price',
    customRender: ({ value, record }: { value: number; record: BondDto }) =>
      `${value.toFixed(2)} ${record.currency}`,
  },
  {
    title: 'Yield',
    dataIndex: 'yield',
    key: 'yield',
    sorter: true,
    defaultSortOrder: 'descend',
    customRender: ({ value }) => `${(value * 100).toFixed(2)} %`,
  },
  {
    title: 'Duration',
    key: 'duration',
    sorter: true,
    customFilterDropdown: true,
    customRender: ({ record }) => getDuration(record.maturityDate),
  },
];

const onTableChange = (
  _: unknown,
  filters: Record<string, FilterValue>,
  sorter: SorterResult | SorterResult[]
) => {
  selectedRisks.value = (filters.risk as number[]) ?? [];
  if (!Array.isArray(sorter)) {
    sortField.value = sorter.columnKey as 'yield' | 'duration';
    sortOrder.value = sorter.order as 'ascend' | 'descend';
  }
};
</script>
