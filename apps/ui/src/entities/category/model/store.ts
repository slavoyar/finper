import { CategoryDto } from '@finper/shared';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCategoryStore = defineStore('category', () => {
  const categories = ref<CategoryDto[]>([]);

  const getCategories = async () => {
    // Placeholder for fetching categories
  };
  return { categories, getCategories };
});
