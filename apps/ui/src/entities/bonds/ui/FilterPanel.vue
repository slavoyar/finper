<template>
  <ACard style="margin-bottom: 16px">
    <ARow :gutter="[16, 16]" align="middle">
      <!-- Risk Filter -->
      <ACol :xs="24" :sm="12" :md="8">
        <div style="margin-bottom: 8px">
          <strong>{{ $t('bonds.filters.risk') }}:</strong>
        </div>
        <ACheckboxGroup v-model:value="selectedRisks" :options="riskOptions" style="width: 100%" />
      </ACol>

      <!-- Duration Filter (Min) -->
      <ACol :xs="12" :sm="6" :md="4">
        <div style="margin-bottom: 8px">
          <strong>{{ $t('bonds.filters.minDuration') }}:</strong>
        </div>
        <AInputNumber v-model:value="minDuration" :min="0" placeholder="e.g. 6" style="width: 100%" />
      </ACol>

      <!-- Duration Filter (Max) -->
      <ACol :xs="12" :sm="6" :md="4">
        <div style="margin-bottom: 8px">
          <strong>{{ $t('bonds.filters.maxDuration') }}:</strong>
        </div>
        <AInputNumber v-model:value="maxDuration" :min="0" placeholder="e.g. 60" style="width: 100%" />
      </ACol>

      <!-- Sort Field -->
      <ACol :xs="12" :sm="6" :md="4">
        <div style="margin-bottom: 8px">
          <strong>{{ $t('bonds.filters.sort') }}:</strong>
        </div>
        <ASelect v-model:value="sortField" style="width: 100%">
          <ASelectOption value="yield"> {{ $t('bonds.yield') }} </ASelectOption>
          <ASelectOption value="duration"> {{ $t('bonds.duration') }} </ASelectOption>
        </ASelect>
      </ACol>

      <!-- Sort Order -->
      <ACol :xs="12" :sm="6" :md="4">
        <div style="margin-bottom: 8px">
          <strong>{{ $t('bonds.filters.sortOrder.title') }}:</strong>
        </div>
        <ASelect v-model:value="sortOrder" style="width: 100%">
          <ASelectOption value="descend"> {{ $t('bonds.filters.sortOrder.desc') }} </ASelectOption>
          <ASelectOption value="ascend"> {{ $t('bonds.filters.sortOrder.asc') }} </ASelectOption>
        </ASelect>
      </ACol>
    </ARow>
  </ACard>
</template>

<script lang="ts" setup>
import { riskTypeByLevel } from '@shared/consts';
import type { CheckboxOptionType } from 'ant-design-vue';
import { computed } from 'vue';

const selectedRisks = defineModel<number[]>('selectedRisks');
const minDuration = defineModel<number>('minDuration');
const maxDuration = defineModel<number>('maxDuration');
const sortField = defineModel<string>('sortField');
const sortOrder = defineModel<string>('sortOrder');

const riskOptions = computed((): CheckboxOptionType[] => {
  return Object.keys(riskTypeByLevel).map((key) => ({
    label: riskTypeByLevel[key as unknown as keyof typeof riskTypeByLevel],
    value: Number(key),
  }));
});
</script>
