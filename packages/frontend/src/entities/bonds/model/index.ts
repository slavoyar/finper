import { BondDto } from '@investments/shared';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { bondsService } from '../api';
import { useBaseStore } from '@shared/store';

export const useBondsStore = defineStore('bonds', () => {
  const baseStore = useBaseStore();

  const bonds = ref<Array<BondDto>>([]);

  const fetchBonds = async () => {
    bonds.value = (await baseStore.makeRequest(bondsService.fetchBonds())) ?? [];
  };

  return {
    ...baseStore.flags,
    bonds,
    fetchBonds,
  };
});
