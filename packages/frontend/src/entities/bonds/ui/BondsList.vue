<template>
  <AList
    :loading="bondStore.isLoading"
    :data-source="bondStore.bonds"
    :grid="{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 3 }"
    :pagination="bondStore.isLoading ? false : paginationProps"
    row-key="id"
    bordered
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

const bondStore = useBondsStore();

onMounted(() => {
  bondStore.fetchBonds();
});

const getDuration = (maturityDate: string) => {
  const date = new Date(maturityDate);
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  const months = Math.floor(days / 30);
  return months > 0 ? `${months} months` : `${days} days`;
};

const riskTypeByLevel: Record<number, string> = {
  1: 'Low',
  2: 'Medium',
  3: 'High',
};
const currentPage = ref(1);
const pageSize = ref(10);
const totalItems = computed(() => bondStore.bonds.length);

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
