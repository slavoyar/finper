<template>
  <ACard style="margin-bottom: 16px">
    <ARow :gutter="16" align="middle">
      <!-- Risk Filter -->
      <ACol :xs="24" :sm="12" :md="8">
        <div style="margin-bottom: 8px">
          <strong>Filter by Risk:</strong>
        </div>
        <ACheckboxGroup v-model:value="selectedRisks" :options="riskOptions" style="width: 100%" />
      </ACol>

      <!-- Duration Filter (Min) -->
      <ACol :xs="12" :sm="6" :md="4">
        <div style="margin-bottom: 8px">
          <strong>Min Duration (mo):</strong>
        </div>
        <AInputNumber v-model:value="minDuration" :min="0" placeholder="e.g. 6" style="width: 100%" />
      </ACol>

      <!-- Duration Filter (Max) -->
      <ACol :xs="12" :sm="6" :md="4">
        <div style="margin-bottom: 8px">
          <strong>Max Duration (mo):</strong>
        </div>
        <AInputNumber v-model:value="maxDuration" :min="0" placeholder="e.g. 60" style="width: 100%" />
      </ACol>

      <!-- Sort Field -->
      <ACol :xs="12" :sm="6" :md="4">
        <div style="margin-bottom: 8px">
          <strong>Sort Field:</strong>
        </div>
        <ASelect v-model:value="sortField" style="width: 100%">
          <ASelectOption value="yield"> Yield </ASelectOption>
          <ASelectOption value="duration"> Duration </ASelectOption>
        </ASelect>
      </ACol>

      <!-- Sort Order -->
      <ACol :xs="12" :sm="6" :md="4">
        <div style="margin-bottom: 8px">
          <strong>Sort Order:</strong>
        </div>
        <ASelect v-model:value="sortOrder" style="width: 100%">
          <ASelectOption value="descend"> Descending </ASelectOption>
          <ASelectOption value="ascend"> Ascending </ASelectOption>
        </ASelect>
      </ACol>
    </ARow>
  </ACard>
</template>

<script lang="ts" setup>
import type { CheckboxOptionType } from 'ant-design-vue';

const selectedRisks = defineModel<number[]>('selectedRisks');
const minDuration = defineModel<number>('minDuration');
const maxDuration = defineModel<number>('maxDuration');
const sortField = defineModel<string>('sortField');
const sortOrder = defineModel<string>('sortOrder');

// Risk options
const riskOptions: CheckboxOptionType[] = [
  { label: 'Low', value: 1 },
  { label: 'Medium', value: 2 },
  { label: 'High', value: 3 },
];
</script>
