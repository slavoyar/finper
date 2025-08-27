<template>
  <template>{{ category?.name ?? categoryId }}</template>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useCategoryStore } from '../model';

const props = defineProps<{
  categoryId: string;
}>();

const categoryStore = useCategoryStore();

const category = computed(() => {
  return categoryStore.categories.find((cat) => cat.id === props.categoryId);
});
</script>
