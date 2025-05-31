<template>
  <ACard style="margin-bottom: 16px">
    <ARow :gutter="16" align="middle">
      <!-- Risk Filter -->
      <ACol :xs="24" :sm="12" :md="8">
        <div style="margin-bottom: 8px">
          <strong>Filter by Risk:</strong>
        </div>
        <ACheckboxGroup v-model:value="innerSelectedRisks" :options="riskOptions" style="width: 100%" />
      </ACol>

      <!-- Duration Filter (Min) -->
      <ACol :xs="12" :sm="6" :md="4">
        <div style="margin-bottom: 8px">
          <strong>Min Duration (mo):</strong>
        </div>
        <AInputNumber v-model:value="innerMinDuration" :min="0" placeholder="e.g. 6" style="width: 100%" />
      </ACol>

      <!-- Duration Filter (Max) -->
      <ACol :xs="12" :sm="6" :md="4">
        <div style="margin-bottom: 8px">
          <strong>Max Duration (mo):</strong>
        </div>
        <AInputNumber v-model:value="innerMaxDuration" :min="0" placeholder="e.g. 60" style="width: 100%" />
      </ACol>

      <!-- Sort Field -->
      <ACol :xs="12" :sm="6" :md="4">
        <div style="margin-bottom: 8px">
          <strong>Sort Field:</strong>
        </div>
        <ASelect v-model:value="innerSortField" style="width: 100%">
          <ASelectOption value="yield">Yield</ASelectOption>
          <ASelectOption value="duration">Duration</ASelectOption>
        </ASelect>
      </ACol>

      <!-- Sort Order -->
      <ACol :xs="12" :sm="6" :md="4">
        <div style="margin-bottom: 8px">
          <strong>Sort Order:</strong>
        </div>
        <ASelect v-model:value="innerSortOrder" style="width: 100%">
          <ASelectOption value="descend">Descending</ASelectOption>
          <ASelectOption value="ascend">Ascending</ASelectOption>
        </ASelect>
      </ACol>
    </ARow>
  </ACard>
</template>

<script lang="ts" setup>
import { ref, watch, defineProps, defineEmits } from 'vue';
import type { CheckboxOptionType } from 'ant-design-vue';

interface Props {
  selectedRisks: number[];
  minDuration?: number;
  maxDuration?: number;
  sortField: 'yield' | 'duration';
  sortOrder: 'ascend' | 'descend';
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'update:selectedRisks', value: number[]): void;
  (e: 'update:minDuration', value?: number): void;
  (e: 'update:maxDuration', value?: number): void;
  (e: 'update:sortField', value: 'yield' | 'duration'): void;
  (e: 'update:sortOrder', value: 'ascend' | 'descend'): void;
}>();

// Local refs for two-way binding via v-model
const innerSelectedRisks = ref<number[]>([...props.selectedRisks]);
const innerMinDuration = ref(props.minDuration);
const innerMaxDuration = ref(props.maxDuration);
const innerSortField = ref(props.sortField);
const innerSortOrder = ref(props.sortOrder);

// Watchers to emit updates when local refs change
watch(innerSelectedRisks, (newVal) => {
  emit('update:selectedRisks', newVal);
});
watch(innerMinDuration, (newVal) => {
  emit('update:minDuration', newVal);
});
watch(innerMaxDuration, (newVal) => {
  emit('update:maxDuration', newVal);
});
watch(innerSortField, (newVal) => {
  emit('update:sortField', newVal);
});
watch(innerSortOrder, (newVal) => {
  emit('update:sortOrder', newVal);
});

// Risk options
const riskOptions: CheckboxOptionType[] = [
  { label: 'Low', value: 1 },
  { label: 'Medium', value: 2 },
  { label: 'High', value: 3 },
];
</script>
