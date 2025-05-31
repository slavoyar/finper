import { BondDto } from '@investments/shared';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { bondsService } from '../api';
import { useBaseStore } from '@shared/store';

export const useBondsStore = defineStore('bonds', () => {
  const baseStore = useBaseStore();

  const bonds = ref<Array<BondDto>>([]);

  const fetchBonds = async () => {
    const rawBonds = (await baseStore.makeRequest(bondsService.fetchBonds())) ?? [];
    rawBonds.sort((a, b) => a.yield ?? 0 - (b.yield ?? 0));
    bonds.value = rawBonds.filter(
      (bond) => bond.maturityDate > new Date().toISOString() && bond.yield && bond.yield > 0
    );
  };

  return {
    ...baseStore.flags,
    bonds,
    fetchBonds,
  };
});
