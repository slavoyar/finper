<template>
  <AConfigProvider :theme="themeConfig">
    <component
      :is="isMobile ? MobileLayout : DesktopLayout"
      v-model:selected-keys="selectedKeys"
      :items="items"
    />
  </AConfigProvider>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-floating-promises */
import { DesktopOutlined, FileOutlined } from '@ant-design/icons-vue';
import { useIsMobile } from '@shared/composabes';
import { ItemType } from 'ant-design-vue';
import { h, ref } from 'vue';
import { useRouter } from 'vue-router';

import DesktopLayout from './layouts/DesktopLayout.vue';
import MobileLayout from './layouts/MobileLayout.vue';
import { themeConfig } from './theme';
const router = useRouter();
const isMobile = useIsMobile();

const selectedKeys = ref(['home']);

const items: ItemType[] = [
  {
    label: 'Home',
    key: 'home',
    title: '',
    icon: () => h(DesktopOutlined),
    onClick: () => {
      router.push('/');
    },
  },
  {
    label: 'Presets',
    key: 'presets',
    title: '',
    icon: () => h(FileOutlined),
    onClick: () => {
      router.push('/presets');
    },
  },
];
</script>
