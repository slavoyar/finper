<template>
  <ALayout style="min-height: 100vh">
    <ALayoutSider width="300px" theme="light">
      <AMenu v-model:selected-keys="selectedKeys" :items="items"> </AMenu>
    </ALayoutSider>
    <ALayout>
      <ALayoutContent :style="{ padding: '20px 50px', height: '100%' }">
        <router-view />
      </ALayoutContent>
      <AppFooter />
    </ALayout>
  </ALayout>
</template>

<script setup lang="ts">
import { ItemType } from 'ant-design-vue';

import AppFooter from './AppFooter.vue';

const selectedKeys = defineModel<string[]>('selectedKeys');

defineProps<{
  items: ItemType[];
}>();
</script>
