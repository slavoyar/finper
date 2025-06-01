import { PresetDto } from '@investments/shared';
import { useBaseStore } from '@shared/store';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import { presetsService } from '../api';

export const usePresetStore = defineStore('presets', () => {
  const baseStore = useBaseStore();

  const presets = ref<Array<PresetDto>>([]);

  const fetchPresets = async () => {
    const response = await baseStore.makeRequest(presetsService.fetchPresets());
    presets.value = response || [];
  };

  const createPreset = (preset: PresetDto) => {
    return baseStore.makeRequest(presetsService.createPreset(preset));
  };

  const bondPresets = computed(() => {
    return presets.value.filter((p) => p.type === 'bond');
  });

  return {
    ...baseStore.flags,
    bondPresets,
    fetchPresets,
    createPreset,
  };
});
