<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider width="300px" theme="light">
      <a-menu v-model:selected-keys="selectedKeys" :items="items" />
    </a-layout-sider>
    <a-layout>
      <a-layout-content :style="{ padding: '20px 50px', height: '100%' }">
        <router-view />
      </a-layout-content>
      <AppFooter />
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ItemType } from 'ant-design-vue';

import AppFooter from './AppFooter.vue';

const selectedKeys = defineModel<string[]>('selectedKeys');

defineProps<{
  items: ItemType[];
}>();
</script>
