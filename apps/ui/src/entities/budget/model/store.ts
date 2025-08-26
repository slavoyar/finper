import { LimitDto, Recurrence } from '@finper/shared';
import { defineStore } from 'pinia';
import { ref } from 'vue';

import { limitService } from '../api';

export const useBudgetStore = defineStore('budget', () => {
  const recurrence = ref<Recurrence>('monthly');
  const selectedDate = ref<string>(new Date().toISOString().slice(0, 7));
  const limits = ref<LimitDto[]>([]);

  const getLimits = async () => {
    limits.value = await limitService.getLimits(selectedDate.value);
  };

  return { recurrence, selectedDate, getLimits, limits };
});
