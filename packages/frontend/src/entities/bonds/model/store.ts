import { BondDto } from '@investments/shared';
import { useBaseStore } from '@shared/store';
import { defineStore } from 'pinia';
import { ref } from 'vue';

import { bondsService } from '../api';

export const useBondsStore = defineStore('bonds', () => {
  const baseStore = useBaseStore();

  const bonds = ref<Array<BondDto>>([]);

  const fetchBonds = async () => {
    const rawBonds = (await baseStore.makeRequest(bondsService.fetchBonds())) ?? [];
    bonds.value = rawBonds
      .filter((bond) => bond.maturityDate > new Date().toISOString() && bond.yield && bond.yield > 0)
      .sort((a, b) => (b.yield ?? 0) - (a.yield ?? 0));
  };

  return {
    ...baseStore.flags,
    bonds,
    fetchBonds,
  };
});
