<template>
  <a-list item-layout="horizontal" :data-source="categoryStore.categories">
    <template #renderItem="{ item }">
      <a-list-item>
        <a-card :title="item.name" style="width: 300px">
          <p>{{ item.descrtiption }}</p>
        </a-card>
      </a-list-item>
    </template>
  </a-list>
</template>

<script setup lang="ts">
import { useCategoryStore } from '../model';

const categoryStore = useCategoryStore();
</script>
