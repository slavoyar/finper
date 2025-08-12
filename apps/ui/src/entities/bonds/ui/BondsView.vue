<template>
  <div ref="scrollRef" />
  <AdaptiveTable
    :loading="bondStore.isLoading"
    :columns="columns"
    :data-source="filteredSortedBonds"
    :row-key="(record) => record.id"
    :pagination="bondStore.isLoading && !filteredSortedBonds.length ? false : pagination"
    show-header
    @change="onTableChange"
  >
    <template #cardAction="{ record }">
      <ATypographyLink
        :href="`https://www.tbank.ru/invest/bonds/${record.ticker}/`"
        target="_blank"
        rel="noopener
          noreferrer"
      >
        {{ $t('bonds.view') }}
      </ATypographyLink>
    </template>
    <template #filter>
      <FilterPanel
        v-model:selected-risks="selectedRisks"
        v-model:sort-field="sortField"
        v-model:sort-order="sortOrder"
        v-model:min-duration="minDuration"
        v-model:max-duration="maxDuration"
      />
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <ATypographyLink
          :href="`https://www.tbank.ru/invest/bonds/${record.ticker}/`"
          target="_blank"
          rel="noopener
          noreferrer"
        >
          {{ record.name }}
        </ATypographyLink>
      </template>
    </template>
    <template #customFilterDropdown>
      <DurationFilter v-model:min-duration="minDuration" v-model:max-duration="maxDuration" />
    </template>
    <template #customFilterIcon>
      <FilterFilled :style="{ color: minDuration || maxDuration ? '#108ee9' : undefined }" />
    </template>
  </AdaptiveTable>
</template>

<script setup lang="ts">
import { FilterFilled } from '@ant-design/icons-vue';
import { BondDto } from '@finper/shared';
import { riskTypeByLevel } from '@shared/consts';
import { AdaptiveTable } from '@shared/ui';
import { TableColumnType } from 'ant-design-vue';
import { FilterValue, SorterResult } from 'ant-design-vue/es/table/interface';
import { onMounted, ref, toRef } from 'vue';
import { useI18n } from 'vue-i18n';

import { useBondsStore, useFilters, usePagination } from '../model';
import { getDuration } from '../utils';
import DurationFilter from './DurationFilter.vue';
import FilterPanel from './FilterPanel.vue';

const scrollRef = ref<HTMLDivElement>();

const { t } = useI18n();
const bondStore = useBondsStore();
const bonds = toRef(bondStore, 'bonds');
const { selectedRisks, sortField, sortOrder, minDuration, maxDuration, filteredSortedBonds } =
  useFilters(bonds);

onMounted(async () => {
  await bondStore.fetchBonds();
});

const columns: TableColumnType<BondDto>[] = [
  {
    title: t('bonds.name'),
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: t('bonds.yield'),
    dataIndex: 'yield',
    key: 'yield',
    sorter: true,
    defaultSortOrder: 'descend',
    customRender: ({ value }) => `${(value * 100).toFixed(2)} %`,
  },
  {
    title: t('bonds.price'),
    dataIndex: 'lastPrice',
    key: 'price',
    customRender: ({ value, record }: { value: number; record: BondDto }) =>
      `${value.toFixed(2)} ${record.currency}`,
  },
  {
    title: t('bonds.duration'),
    key: 'duration',
    sorter: true,
    customFilterDropdown: true,
    customRender: ({ record }) => getDuration(record.maturityDate),
  },
  {
    title: t('bonds.risk'),
    dataIndex: 'riskLevel',
    key: 'risk',
    filters: [
      {
        text: t('bonds.riskLevel.low'),
        value: 1,
      },
      {
        text: t('bonds.riskLevel.medium'),
        value: 2,
      },
      {
        text: t('bonds.riskLevel.high'),
        value: 3,
      },
    ],
    defaultFilteredValue: ['1'],
    customRender: ({ value }) => riskTypeByLevel[value as number],
  },
];

const onTableChange = (
  _: unknown,
  filters: Record<string, FilterValue | null>,
  sorter: SorterResult | SorterResult[]
) => {
  selectedRisks.value = (filters.risk as number[]) ?? [];
  if (!Array.isArray(sorter)) {
    sortField.value = sorter.columnKey as 'yield' | 'duration';
    sortOrder.value = sorter.order as 'ascend' | 'descend';
  }
};

const scrollToTop = () => {
  scrollRef.value?.scrollIntoView({ behavior: 'smooth' });
};

const pagination = usePagination(filteredSortedBonds, scrollToTop);
</script>
