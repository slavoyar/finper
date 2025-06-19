<template>
  <slot name="filter" v-if="isMobile" />
  <component :is="component" v-bind="{ ...$attrs, ...props }">
    <template v-for="(_, slot) of $slots" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </component>
</template>

<script setup lang="ts" generic="T">
import { useIsMobile } from '@shared/composabes';
import { Table, TableProps } from 'ant-design-vue';
import { computed } from 'vue';

import MobileView from './MobileView.vue';

const props = defineProps<TableProps<T>>();

const isMobile = useIsMobile();

const component = computed(() => {
  if (isMobile.value) {
    return MobileView;
  }
  return Table;
});
</script>
