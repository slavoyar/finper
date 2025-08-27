<template>
  <template>{{ category?.name ?? categoryId }}</template>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';

import { useCategoryStore } from '../model';

const props = defineProps<{
  categoryId: string;
}>();

const categoryStore = useCategoryStore();

onMounted(async () => {
  await categoryStore.getCategories();
});

const category = computed(() => {
  return categoryStore.categories.find((cat) => cat.id === props.categoryId);
});
</script>
