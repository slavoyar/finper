<template>
  <AdaptiveTable :columns="columns" :data-source="presetStore.bondPresets" show-header>
    <template #cardAction="{ record }">
      <APopconfirm
        :title="$t('presets.areYouSure')"
        :ok-text="$t('common.yes')"
        :cancel-text="$t('common.no')"
        @confirm="presetStore.deletePreset(record.id)"
      >
        <AButton type="link">{{ $t('common.delete') }}</AButton>
      </APopconfirm>
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <APopconfirm
          :title="$t('presets.areYouSure')"
          :ok-text="$t('common.yes')"
          :cancel-text="$t('common.no')"
          @confirm="presetStore.deletePreset(record.id)"
        >
          <AButton type="link">{{ $t('common.delete') }}</AButton>
        </APopconfirm>
      </template>
    </template>
  </AdaptiveTable>
</template>

<script setup lang="ts">
import { riskTypeByLevel } from '@shared/consts';
import { AdaptiveTable } from '@shared/ui';
import { TableColumnType } from 'ant-design-vue';
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

import { usePresetStore } from '../model';

const { t } = useI18n();
const presetStore = usePresetStore();

onMounted(async () => {
  await presetStore.fetchPresets();
});

const columns: TableColumnType[] = [
  {
    title: t('presets.name'),
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: t('presets.minDuration'),
    dataIndex: 'minDuration',
    key: 'minDuration',
  },
  {
    title: t('presets.maxDuration'),
    dataIndex: 'maxDuration',
    key: 'maxDuration',
  },
  {
    title: t('presets.risk'),
    dataIndex: 'riskLevels',
    key: 'risk',
    customRender: ({ text }: { text: number[] }) => text.map((item) => riskTypeByLevel[item]).join(', '),
  },
  {
    title: t('presets.action'),
    key: 'action',
  },
];
</script>
