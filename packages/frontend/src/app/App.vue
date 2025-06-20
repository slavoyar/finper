<template>
  <component
    :is="isMobile ? MobileLayout : DesktopLayout"
    v-model:selected-keys="selectedKeys"
    :items="items"
  />
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useIsMobile } from '@shared/composabes';
import { ItemType } from 'ant-design-vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import DesktopLayout from './layouts/DesktopLayout.vue';
import MobileLayout from './layouts/MobileLayout.vue';

const router = useRouter();
const isMobile = useIsMobile();

const selectedKeys = ref(['home']);

const items: ItemType[] = [
  {
    label: 'Home',
    key: 'home',
    title: '',
    onClick: () => {
      router.push('/');
    },
  },
  {
    label: 'Presets',
    key: 'presets',
    title: '',
    onClick: () => {
      router.push('/presets');
    },
  },
];
</script>
