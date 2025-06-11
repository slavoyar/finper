<template>
  <ATable :columns="columns" :data-source="presetStore.bondPresets">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <AButton type="link" @click="presetStore.deletePreset(record.id)">Delete</AButton>
      </template>
    </template>
  </ATable>
</template>

<script setup lang="ts">
import { riskTypeByLevel } from '@shared/consts';
import { TableColumnType } from 'ant-design-vue';
import { onMounted } from 'vue';

import { usePresetStore } from '../model';

const presetStore = usePresetStore();

onMounted(async () => {
  await presetStore.fetchPresets();
});

const columns: TableColumnType[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Min Duration',
    dataIndex: 'minDuration',
    key: 'minDuration',
  },
  {
    title: 'Max Duration',
    dataIndex: 'maxDuration',
    key: 'maxDuration',
  },
  {
    title: 'Risk',
    dataIndex: 'riskLevels',
    key: 'risk',
    customRender: ({ value }: { value: number[] }) => value.map((item) => riskTypeByLevel[item]).join(', '),
  },
  {
    title: 'Action',
    key: 'action',
  },
];
</script>
