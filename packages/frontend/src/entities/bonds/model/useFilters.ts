import { BondDto } from '@finper/shared';
import { computed, Ref, ref } from 'vue';

import { getDurationValue } from '../utils';

export const useFilters = (bonds: Ref<Array<BondDto>>) => {
  const selectedRisks = ref<number[]>([1]);
  const sortField = ref<'yield' | 'duration'>('yield');
  const sortOrder = ref<'ascend' | 'descend'>('descend');
  const minDuration = ref<number | undefined>(undefined);
  const maxDuration = ref<number | undefined>(undefined);

  const filteredSortedBonds = computed((): BondDto[] => {
    let arr = bonds.value.slice();

    if (selectedRisks.value.length > 0) {
      arr = arr.filter((bond) => selectedRisks.value.includes(bond.riskLevel));
    }

    if (minDuration.value || maxDuration.value) {
      arr = arr.filter((bond) => {
        const durMonths = getDurationValue(bond.maturityDate);
        if (minDuration.value && durMonths < minDuration.value) {
          return false;
        }
        if (maxDuration.value && durMonths > maxDuration.value) {
          return false;
        }
        return true;
      });
    }

    if (sortField.value === 'yield') {
      arr.sort((a, b) => {
        const aVal = a.yield ?? 0;
        const bVal = b.yield ?? 0;
        return sortOrder.value === 'ascend' ? aVal - bVal : bVal - aVal;
      });
    } else if (sortField.value === 'duration') {
      arr.sort((a, b) => {
        const aVal = getDurationValue(a.maturityDate);
        const bVal = getDurationValue(b.maturityDate);
        return sortOrder.value === 'ascend' ? aVal - bVal : bVal - aVal;
      });
    }

    return arr;
  });

  return {
    selectedRisks,
    sortField,
    sortOrder,
    minDuration,
    maxDuration,
    filteredSortedBonds,
  };
};
