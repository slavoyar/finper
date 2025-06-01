<template>
  <component :is="getFormComponent(preset.type)" :preset="preset" @submit="onSubmit" />
</template>

<script lang="ts" setup>
import { PresetDto } from '@investments/shared';

import BondPresetForm from './forms/BondPresetForm.vue';

defineProps<{ preset: PresetDto }>();
const emit = defineEmits(['submit']);

const getFormComponent = (type: PresetDto['type']) => {
  switch (type) {
    case 'bond':
      return BondPresetForm;
    default:
      throw new Error(`Unknown preset type`);
  }
};

const onSubmit = (data: Omit<PresetDto, 'id'>) => {
  emit('submit', data);
};
</script>
