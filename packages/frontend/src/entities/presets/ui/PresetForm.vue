<template>
  <component :is="getFormComponent(type)" v-model:preset="preset" v-model:is-valid="isValid" />
</template>

<script lang="ts" setup>
import { PresetDto } from '@finper/shared';

import BondPresetForm from './forms/BondPresetForm.vue';

const preset = defineModel<Partial<PresetDto>>('preset', { required: true });
const isValid = defineModel<boolean>('isValid', { required: true });
defineProps<{ type: PresetDto['type'] }>();

const getFormComponent = (type: PresetDto['type']) => {
  switch (type) {
    case 'bond':
      return BondPresetForm;
    default:
      throw new Error(`Unknown preset type`);
  }
};
</script>
