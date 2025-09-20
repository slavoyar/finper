import { CategoryDto, CreateCategoryDto } from '@finper/shared';
import { useBaseStore } from '@shared/store';
import { defineStore } from 'pinia';
import { onMounted, ref } from 'vue';

import { categoryService } from '../api';

export const useCategoryStore = defineStore('category', () => {
  const baseStore = useBaseStore();
  const categories = ref<CategoryDto[]>([]);

  onMounted(async () => {
    categories.value = (await baseStore.makeRequest(categoryService.getCategories())) ?? [];
  });

  const createCategory = async (category: CreateCategoryDto) => {
    const newCategory = await baseStore.makeRequest(categoryService.addCategory(category));
    if (!newCategory) return;
    categories.value.push(newCategory);
  };

  const deleteCategory = async (categoryId: string) => {
    await baseStore.makeRequest(categoryService.deleteCategory(categoryId));
    categories.value = categories.value.filter((c) => c.id !== categoryId);
  };

  return { ...baseStore.flags, categories, createCategory, deleteCategory };
});
