<template>
  <div v-if="listed" class="filter-row">
    <button
      type="button"
      class="filters"
      :aria-expanded="open"
      aria-controls="bond-filters"
      @click="open = true"
    >
      {{ t('bonds.filters.title') }}
    </button>
    <p class="status" aria-live="polite">{{ status }}</p>
  </div>

  <van-popup
    id="bond-filters"
    v-model:show="open"
    class="filter-sheet"
    position="bottom"
    round
    safe-area-inset-bottom
    :style="{ maxHeight: '85%' }"
  >
    <div class="sheet">
      <h2>{{ t('bonds.filters.title') }}</h2>

      <p class="label">{{ t('bonds.filters.risk') }}</p>
      <van-checkbox-group v-model="selectedRisks" shape="square">
        <van-checkbox v-for="option in riskOptions" :key="option.value" :name="option.value">
          {{ option.label }}
        </van-checkbox>
      </van-checkbox-group>

      <p class="label">{{ t('bonds.filters.months') }}</p>
      <van-field
        v-model="minDurationText"
        type="digit"
        label-align="top"
        :label="t('bonds.filters.minLabel')"
      />
      <van-field
        v-model="maxDurationText"
        type="digit"
        label-align="top"
        :label="t('bonds.filters.maxLabel')"
        :error="minAboveMax"
        :error-message="minAboveMax ? t('bonds.durationOrder') : ''"
      />

      <p class="label">{{ t('bonds.filters.sort') }}</p>
      <van-radio-group :model-value="sortKey" @update:model-value="setSort">
        <van-radio name="yield:descend">{{ t('bonds.sort.yieldDesc') }}</van-radio>
        <van-radio name="yield:ascend">{{ t('bonds.sort.yieldAsc') }}</van-radio>
        <van-radio name="duration:ascend">{{ t('bonds.sort.durationAsc') }}</van-radio>
        <van-radio name="duration:descend">{{ t('bonds.sort.durationDesc') }}</van-radio>
      </van-radio-group>

      <van-button block type="primary" @click="open = false">{{ t('common.close') }}</van-button>
      <van-button block class="reset" @click="emit('reset')">{{ t('common.reset') }}</van-button>
    </div>
  </van-popup>
</template>

<script lang="ts" setup>
import { riskTypeByLevel } from '@shared/consts';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { BondSortField, BondSortOrder } from '../model/bond-filters';
import { describeMonths, riskSummary } from '../utils';

const { t } = useI18n();
const open = ref(false);
const emit = defineEmits<{ reset: [] }>();

const props = defineProps<{
  shown: number;
  total: number;
  listed: boolean;
  monthsConstrain: boolean;
}>();

const selectedRisks = defineModel<number[]>('selectedRisks', { required: true });
const minDuration = defineModel<number | null>('minDuration', { required: true });
const maxDuration = defineModel<number | null>('maxDuration', { required: true });
const sortField = defineModel<BondSortField>('sortField', { required: true });
const sortOrder = defineModel<BondSortOrder>('sortOrder', { required: true });

const riskOptions = computed(() =>
  Object.keys(riskTypeByLevel).map((key) => ({
    label: riskTypeByLevel[Number(key)],
    value: Number(key),
  }))
);

const durationText = (model: typeof minDuration) =>
  computed({
    get: () => (model.value ? String(model.value) : ''),
    set: (value: string) => {
      const parsed = Number(value);
      model.value = value && Number.isFinite(parsed) && parsed > 0 ? parsed : null;
    },
  });

const minDurationText = durationText(minDuration);
const maxDurationText = durationText(maxDuration);

const minAboveMax = computed(
  () => minDuration.value != null && maxDuration.value != null && minDuration.value > maxDuration.value
);

const sortKey = computed(() => `${sortField.value}:${sortOrder.value}`);

const setSort = (value: string) => {
  const [field, order] = value.split(':');
  if (field === 'yield' || field === 'duration') {
    sortField.value = field;
  }
  if (order === 'ascend' || order === 'descend') {
    sortOrder.value = order;
  }
};

const isDefaultRisk = computed(() => selectedRisks.value.length === 1 && selectedRisks.value[0] === 1);

const isDefaultSort = computed(() => sortField.value === 'yield' && sortOrder.value === 'descend');

const sortLabel = computed(() => {
  const sort =
    sortField.value === 'duration'
      ? sortOrder.value === 'ascend'
        ? 'durationAsc'
        : 'durationDesc'
      : sortOrder.value === 'ascend'
        ? 'yieldAsc'
        : 'yieldDesc';
  return t(`bonds.sort.${sort}`);
});

const status = computed(() => {
  const parts = [t('bonds.count', { shown: props.shown, total: props.total })];
  if (!isDefaultRisk.value) {
    parts.push(riskSummary(selectedRisks.value));
  }
  if (props.monthsConstrain) {
    const months = describeMonths(minDuration.value, maxDuration.value);
    if (months) {
      parts.push(months);
    }
  }
  if (!isDefaultSort.value) {
    parts.push(sortLabel.value);
  }
  return parts.join(' · ');
});
</script>

<style scoped>
.filter-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 16px 4px;
}

.status {
  margin: 0;
  color: var(--van-text-color-2);
  font-size: 13px;
  line-height: 1.35;
}

.filters {
  flex: none;
  min-width: 44px;
  min-height: 44px;
  padding: 0 4px;
  border: 0;
  background: transparent;
  color: var(--van-text-color-2);
  font: inherit;
  font-size: 13px;
}

.sheet {
  padding: 16px 16px calc(12px + env(safe-area-inset-bottom));
}

.sheet h2 {
  margin: 0 0 4px;
  font-size: 1.15rem;
  font-weight: 650;
  letter-spacing: -0.02em;
}

.label {
  margin: 16px 0 4px;
  color: var(--van-text-color-2);
  font-size: 13px;
}

.sheet .van-checkbox,
.sheet .van-radio {
  display: flex;
  align-items: center;
  min-height: 44px;
}

.sheet :deep(.van-checkbox__icon),
.sheet :deep(.van-radio__icon) {
  font-size: 22px;
}

.sheet :deep(.van-field) {
  padding: 4px 0 8px;
}

.sheet :deep(.van-field__control) {
  min-height: 44px;
  font-size: 16px;
}

.sheet .van-button {
  min-height: 44px;
  margin-top: 12px;
}

.sheet .reset {
  color: var(--van-text-color);
  background: transparent;
  border-color: var(--van-text-color-2);
}
</style>
