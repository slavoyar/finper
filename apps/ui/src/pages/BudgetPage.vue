<template>
  <CategoryForm v-model:category="category" />
</template>

<script lang="ts" setup>
import { CategoryForm } from '@entities/category';
import { CreateCategoryDto } from '@finper/shared';
import { ref } from 'vue';
const category = ref<Partial<CreateCategoryDto>>({ limit: { amount: 0, period: 'monthly' } });
</script>
