import { BondDto } from '@finper/shared';
import { computed, Ref, ref, watch } from 'vue';

export const usePagination = (bonds: Ref<Array<BondDto>>, scrollToTop?: () => void) => {
  const currentPage = ref(1);
  const pageSize = ref(10);
  const totalItems = computed(() => bonds.value.length);

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
      scrollToTop?.();
    },
  }));

  return paginationProps;
};
