<template>
  <FilterPanel
    v-model:selected-risks="selectedRisks"
    v-model:sort-field="sortField"
    v-model:sort-order="sortOrder"
    v-model:min-duration="minDuration"
    v-model:max-duration="maxDuration"
    :shown="filteredSortedBonds.length"
    :total="bonds.length"
    :listed="listed"
    :months-constrain="monthsConstrain"
    @reset="resetFilters"
  />

  <div v-if="bondStore.isLoading && !bondStore.bonds.length" class="state" role="status">
    <p>{{ t('bonds.loading') }}</p>
    <van-skeleton title :row="6" />
  </div>

  <van-empty
    v-else-if="bondStore.isError && !bondStore.bonds.length"
    class="quiet-empty"
    :description="t('bonds.loadFailed')"
    role="alert"
  >
    <template #image><span class="empty-mark" /></template>
    <van-button type="primary" block @click="bondStore.fetchBonds()">{{ t('bonds.retry') }}</van-button>
  </van-empty>

  <van-empty
    v-else-if="!filteredSortedBonds.length"
    class="quiet-empty"
    :description="emptyDescription"
    role="status"
  >
    <template #image><span class="empty-mark" /></template>
    <van-button type="primary" block @click="emptyAction">{{ emptyActionLabel }}</van-button>
  </van-empty>

  <template v-else>
    <van-cell-group inset>
      <van-cell
        v-for="bond in pageBonds"
        :key="bond.id"
        tag="a"
        :href="bondUrl(bond.ticker)"
        target="_blank"
        rel="noopener noreferrer"
        :title="bond.name"
        :label="bondMeta(bond)"
        :aria-label="bondLabel(bond)"
        is-link
        @click="openBond($event, bond.ticker)"
      >
        <template #value>
          <span class="yield">{{ formatYield(bond.yield) }}</span>
        </template>
      </van-cell>
    </van-cell-group>

    <van-pagination
      v-if="filteredSortedBonds.length > pageSize"
      v-model="page"
      :total-items="filteredSortedBonds.length"
      :items-per-page="pageSize"
      :show-page-size="5"
      force-ellipses
    />
  </template>
</template>

<script setup lang="ts">
import { BondDto } from '@finper/shared';
import { riskTypeByLevel } from '@shared/consts';
import { computed, onMounted, ref, toRef, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { useBondsStore, useFilters } from '../model';
import { describeMonths, getDuration, riskSummary } from '../utils';
import FilterPanel from './FilterPanel.vue';

const { t } = useI18n();
const bondStore = useBondsStore();
const bonds = toRef(bondStore, 'bonds');
const {
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
} = useFilters(bonds);

const page = ref(1);
const pageSize = 10;

const listed = computed(() => !bondStore.isLoading && !(bondStore.isError && !bondStore.bonds.length));

const pageBonds = computed(() => {
  const start = (page.value - 1) * pageSize;
  return filteredSortedBonds.value.slice(start, start + pageSize);
});

const minAboveMax = computed(
  () => minDuration.value != null && maxDuration.value != null && minDuration.value > maxDuration.value
);

const emptyDescription = computed(() => {
  if (minAboveMax.value) {
    return t('bonds.durationOrder');
  }
  const risks = riskSummary(selectedRisks.value);
  const months = describeMonths(minDuration.value, maxDuration.value);
  if (months) {
    return t('bonds.emptyMonths', { months, risks });
  }
  return t('bonds.emptyRisk', { risks });
});

const emptyActionLabel = computed(() => {
  if (minAboveMax.value) {
    return t('bonds.swapMonths');
  }
  if (minDuration.value != null || maxDuration.value != null) {
    return t('bonds.clearMonths');
  }
  return t('common.reset');
});

const emptyAction = () => {
  if (minAboveMax.value) {
    swapDuration();
    return;
  }
  if (minDuration.value != null || maxDuration.value != null) {
    clearDuration();
    return;
  }
  resetFilters();
};

watch(
  () => filteredSortedBonds.value.length,
  (length) => {
    const maxPage = Math.max(1, Math.ceil(length / pageSize));
    if (page.value > maxPage) {
      page.value = 1;
    }
  }
);

watch(page, () => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
});

onMounted(() => {
  void bondStore.fetchBonds();
});

const formatYield = (value?: number) => `${((value ?? 0) * 100).toFixed(2)}%`;

const bondMeta = (bond: BondDto) =>
  `${bond.lastPrice.toFixed(2)} ${bond.currency} · ${getDuration(bond.maturityDate)} · ${t('bonds.riskMark', { level: riskTypeByLevel[bond.riskLevel] })}`;

const bondUrl = (ticker: string) => `https://www.tbank.ru/invest/bonds/${ticker}/`;

const bondLabel = (bond: BondDto) =>
  t('bonds.openBond', {
    name: bond.name,
    yield: formatYield(bond.yield),
    meta: bondMeta(bond),
  });

const openBond = (event: MouseEvent, ticker: string) => {
  if (!Telegram.WebApp.initData) {
    return;
  }
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) {
    return;
  }
  event.preventDefault();
  Telegram.WebApp.openLink(bondUrl(ticker));
};
</script>

<style scoped>
.state {
  padding: 8px 16px 16px;
}

.state p {
  margin: 0 0 8px;
  color: var(--van-text-color-2);
}

.yield {
  color: var(--yield-color, #6ab3f3);
  font-variant-numeric: tabular-nums;
  font-weight: 650;
}

.van-pagination {
  margin: 16px;
}

:deep(.van-pagination__item) {
  min-width: 44px;
  min-height: 44px;
}

:deep(.van-cell) {
  min-height: 44px;
}

:deep(.van-cell__title) {
  min-width: 0;
  overflow-wrap: anywhere;
}

:deep(.van-cell__label) {
  font-size: 13px;
  line-height: 1.35;
}

:deep(.van-cell__value) {
  flex: none;
  margin-left: 12px;
}

.quiet-empty :deep(.van-empty__image) {
  display: none;
}

.quiet-empty :deep(.van-empty__description) {
  margin-top: 12px;
  padding: 0 8px;
  color: var(--van-text-color);
  font-size: 16px;
  line-height: 1.4;
}

.quiet-empty .van-button {
  min-height: 44px;
}
</style>
