import { CategoryDto, CreateCategoryDto } from '@finper/shared';
import { defineStore } from 'pinia';
import { onMounted, ref } from 'vue';

import { categoryService } from '../api';

export const useCategoryStore = defineStore('category', () => {
  const categories = ref<CategoryDto[]>([]);
  onMounted(async () => {
    categories.value = await categoryService.getCategories();
  });

  const createCategory = async (category: CreateCategoryDto) => {
    const newCategory = await categoryService.addCategory(category);
    categories.value.push(newCategory);
    return newCategory;
  };

  const deleteCategory = async (categoryId: string) => {
    await categoryService.deleteCategory(categoryId);
    categories.value = categories.value.filter((c) => c.id !== categoryId);
  };

  return { categories, createCategory, deleteCategory };
});
