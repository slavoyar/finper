<template>
  <FilterPanel
    v-model:selectedRisks="selectedRisks"
    v-model:sortField="sortField"
    v-model:sortOrder="sortOrder"
    v-model:minDuration="minDuration"
    v-model:maxDuration="maxDuration"
  />
  <div ref="scrollRef" />
  <AList
    :loading="bondStore.isLoading"
    :data-source="filteredSortedBonds"
    :grid="{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 3 }"
    :pagination="bondStore.isLoading ? false : pagination"
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
import { useBondsStore, useFilters } from '../model';
import { onMounted, ref, toRef } from 'vue';
import FilterPanel from './FilterPanel.vue';
import { usePagination, riskTypeByLevel } from '../model';
import { getDuration } from '../utils';

const bondStore = useBondsStore();
const bonds = toRef(bondStore, 'bonds');

const scrollRef = ref<HTMLDivElement>();

onMounted(() => {
  bondStore.fetchBonds();
});

const scrollToTop = () => {
  scrollRef.value?.scrollIntoView({ behavior: 'smooth' });
};

const { selectedRisks, sortField, sortOrder, minDuration, maxDuration, filteredSortedBonds } =
  useFilters(bonds);

const pagination = usePagination(filteredSortedBonds, scrollToTop);
</script>
