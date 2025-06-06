<template>
  <component :is="getFormComponent(type)" v-model:preset="preset" v-bind="$attrs" />
</template>

<script lang="ts" setup>
import { PresetDto } from '@investments/shared';

import BondPresetForm from './forms/BondPresetForm.vue';

const preset = defineModel<Partial<PresetDto>>('preset', { required: true });
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
