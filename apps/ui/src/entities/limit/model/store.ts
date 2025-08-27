import { LimitDto } from '@finper/shared';
import { defineStore } from 'pinia';
import { onMounted, ref } from 'vue';

import { limitService } from '../api';

export const useLimitStore = defineStore('limit', () => {
  const limits = ref<LimitDto[]>([]);

  onMounted(async () => {
    limits.value = await limitService.getLimits();
  });

  return { limits };
});
