import { BondDto } from '@finper/shared';
import { computed, Ref, ref, watch } from 'vue';

import { getDurationValue } from '../utils';
import {
  BondFilters,
  BondSortField,
  BondSortOrder,
  defaultBondFilters,
  loadBondFilters,
  orderDuration,
  saveBondFilters,
} from './bond-filters';

export const useFilters = (bonds: Ref<Array<BondDto>>) => {
  const initial = loadBondFilters();
  const selectedRisks = ref<number[]>(initial.selectedRisks);
  const sortField = ref<BondSortField>(initial.sortField);
  const sortOrder = ref<BondSortOrder>(initial.sortOrder);
  const minDuration = ref<number | null>(initial.minDuration);
  const maxDuration = ref<number | null>(initial.maxDuration);

  const snapshot = (): BondFilters => ({
    selectedRisks: selectedRisks.value,
    sortField: sortField.value,
    sortOrder: sortOrder.value,
    minDuration: minDuration.value,
    maxDuration: maxDuration.value,
  });

  watch([selectedRisks, sortField, sortOrder, minDuration, maxDuration], () => saveBondFilters(snapshot()), {
    deep: true,
  });

  const resetFilters = () => {
    const defaults = defaultBondFilters();
    selectedRisks.value = defaults.selectedRisks;
    sortField.value = defaults.sortField;
    sortOrder.value = defaults.sortOrder;
    minDuration.value = defaults.minDuration;
    maxDuration.value = defaults.maxDuration;
  };

  const clearDuration = () => {
    minDuration.value = null;
    maxDuration.value = null;
  };

  const swapDuration = () => {
    const next = orderDuration(minDuration.value, maxDuration.value);
    minDuration.value = next.min;
    maxDuration.value = next.max;
  };

  const matchesDuration = (bond: BondDto) => {
    const min = minDuration.value;
    const max = maxDuration.value;
    if (min == null && max == null) {
      return true;
    }
    const durMonths = getDurationValue(bond.maturityDate);
    if (min != null && durMonths < min) {
      return false;
    }
    if (max != null && durMonths > max) {
      return false;
    }
    return true;
  };

  const filteredSortedBonds = computed((): BondDto[] => {
    let arr = bonds.value.slice();

    if (selectedRisks.value.length > 0) {
      arr = arr.filter((bond) => selectedRisks.value.includes(bond.riskLevel));
    }

    if (minDuration.value != null || maxDuration.value != null) {
      arr = arr.filter(matchesDuration);
    }

    arr.sort((a, b) => {
      const aVal = sortField.value === 'yield' ? (a.yield ?? 0) : getDurationValue(a.maturityDate);
      const bVal = sortField.value === 'yield' ? (b.yield ?? 0) : getDurationValue(b.maturityDate);
      return sortOrder.value === 'ascend' ? aVal - bVal : bVal - aVal;
    });

    return arr;
  });

  const monthsConstrain = computed(() => {
    const min = minDuration.value;
    const max = maxDuration.value;
    if (min == null && max == null) {
      return false;
    }
    if (min != null && max != null && min > max) {
      return false;
    }
    const pool =
      selectedRisks.value.length > 0
        ? bonds.value.filter((bond) => selectedRisks.value.includes(bond.riskLevel))
        : bonds.value;
    const narrowed = pool.filter(matchesDuration);
    return narrowed.length > 0 && narrowed.length < pool.length;
  });

  return {
    selectedRisks,
    sortField,
    sortOrder,
    minDuration,
    maxDuration,
    filteredSortedBonds,
    monthsConstrain,
    resetFilters,
    clearDuration,
    swapDuration,
  };
};
