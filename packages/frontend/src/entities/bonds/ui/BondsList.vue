<template>
  <FilterPanel
    v-model:selectedRisks="selectedRisks"
    v-model:sortField="sortField"
    v-model:sortOrder="sortOrder"
    v-model:minDuration="minDuration"
    v-model:maxDuration="maxDuration"
  />
  <AList
    :loading="bondStore.isLoading"
    :data-source="filteredSortedBonds"
    :grid="{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 3 }"
    :pagination="bondStore.isLoading ? false : paginationProps"
    row-key="id"
  >
    <template #renderItem="{ item: bond }">
      <AListItem>
        <div style="width: 100%">
          <ACard :title="bond.name" style="width: 100%">
            <ATypography>
              <ATypographyParagraph>
                <ATypographyText strong>Risk:</ATypographyText>
                {{ riskTypeByLevel[bond.riskLevel] }}
              </ATypographyParagraph>
              <ATypographyParagraph>
                <ATypographyText strong>Price:</ATypographyText>
                {{ bond.lastPrice.toFixed(2) }} {{ bond.currency }}
              </ATypographyParagraph>
              <ATypographyParagraph>
                <ATypographyText strong>Yield:</ATypographyText>
                {{ (bond.yield * 100).toFixed(2) }} %
              </ATypographyParagraph>
              <ATypographyParagraph>
                <ATypographyText strong>Duration:</ATypographyText>
                {{ getDuration(bond.maturityDate) }}
              </ATypographyParagraph>
              <ATypographyLink :href="`https://www.tbank.ru/invest/bonds/${bond.ticker}/`" target="_blank">
                More details
              </ATypographyLink>
            </ATypography>
          </ACard>
        </div>
      </AListItem>
    </template>
  </AList>
</template>

<script lang="ts" setup>
import { useBondsStore } from '../model';
import { computed, onMounted, ref, watch } from 'vue';
import FilterPanel from './FilterPanel.vue';
import { BondDto } from '@investments/shared';

const bondStore = useBondsStore();

onMounted(() => {
  bondStore.fetchBonds();
});

function getDurationValue(maturityDate: string): number {
  const now = Date.now();
  const target = new Date(maturityDate).getTime();
  const diff = target - now;
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return days / 30; // fractional months
}

function getDuration(maturityDate: string): string {
  const monthsDecimal = getDurationValue(maturityDate);
  if (monthsDecimal >= 1) {
    const months = Math.floor(monthsDecimal);
    return `${months} month${months > 1 ? 's' : ''}`;
  } else {
    // less than 1 month → show days
    const days = Math.ceil((new Date(maturityDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return `${days} day${days > 1 ? 's' : ''}`;
  }
}

const riskTypeByLevel: Record<number, string> = {
  1: 'Low',
  2: 'Medium',
  3: 'High',
};

const selectedRisks = ref<number[]>([1, 2, 3]); // default: show all three risk levels
const sortField = ref<'yield' | 'duration'>('yield');
const sortOrder = ref<'ascend' | 'descend'>('descend');
const minDuration = ref<number | undefined>(undefined);
const maxDuration = ref<number | undefined>(undefined);

const filteredSortedBonds = computed((): BondDto[] => {
  let arr = bondStore.bonds.slice();

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

const currentPage = ref(1);
const pageSize = ref(10);
const totalItems = computed(() => filteredSortedBonds.value.length);

// Whenever bonds reload or change length, ensure currentPage is still valid
watch(totalItems, (newTotal) => {
  const maxPage = Math.ceil(newTotal / pageSize.value) || 1;
  if (currentPage.value > maxPage) {
    currentPage.value = maxPage;
  }
});

const paginationProps = computed(() => ({
  current: currentPage.value,
  pageSize: pageSize.value,
  total: totalItems.value,
  showSizeChanger: false,
  onChange: (page: number) => {
    currentPage.value = page;
  },
}));
</script>
