<template>
  <a-form layout="vertical" @submit.prevent="handleSubmit">
    <a-form-item label="Risk Levels">
      <a-select
        v-model:value="form.riskLevels"
        mode="tags"
        type="number"
        :token-separators="[',']"
        placeholder="Enter risk levels (e.g., 1,2,3)"
      />
    </a-form-item>

    <a-form-item label="Minimum Duration">
      <a-input-number v-model:value="form.minDuration" :min="0" style="width: 100%" />
    </a-form-item>

    <a-form-item label="Maximum Duration">
      <a-input-number v-model:value="form.maxDuration" :min="form.minDuration" style="width: 100%" />
    </a-form-item>

    <a-form-item label="Count">
      <a-input-number v-model:value="form.count" :min="1" style="width: 100%" />
    </a-form-item>

    <a-form-item>
      <a-button type="primary" html-type="submit">Create Bond Preset</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { BondPresetDto } from '@investments/shared';
import { reactive } from 'vue';

const emit = defineEmits<{
  (e: 'submit', value: Omit<BondPresetDto, 'id'>): void;
}>();

const { preset } = defineProps<{ preset: BondPresetDto }>();

const form = reactive<Omit<BondPresetDto, 'type' | 'id'>>({
  name: '',
  riskLevels: preset.riskLevels,
  minDuration: preset.minDuration,
  maxDuration: preset.maxDuration,
  count: preset.count,
});

const handleSubmit = () => {
  emit('submit', {
    type: 'bond',
    ...form,
  });
};
</script>
