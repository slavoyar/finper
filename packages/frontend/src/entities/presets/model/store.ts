import { PresetDto } from '@finper/shared';
import { useBaseStore } from '@shared/store';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import { presetsService } from '../api';

export const usePresetStore = defineStore('presets', () => {
  const baseStore = useBaseStore();

  const presets = ref<Array<PresetDto>>([]);

  const fetchPresets = async (type: PresetDto['type'] = 'bond') => {
    const response = await baseStore.makeRequest(presetsService.fetchPresets(type));
    presets.value = response || [];
  };

  const createPreset = async (preset: PresetDto) => {
    await baseStore.makeRequest(presetsService.createPreset(preset));
    await fetchPresets();
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
