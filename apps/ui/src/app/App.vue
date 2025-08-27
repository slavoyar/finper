<template>
  <a-config-provider :theme="themeConfig">
    <component
      :is="isMobile ? MobileLayout : DesktopLayout"
      v-model:selected-keys="selectedKeys"
      :items="items"
    />
  </a-config-provider>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-floating-promises */
import { DesktopOutlined, FileOutlined } from '@ant-design/icons-vue';
import { useIsMobile } from '@shared/composabes';
import { ItemType } from 'ant-design-vue';
import { h, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import DesktopLayout from './layouts/DesktopLayout.vue';
import MobileLayout from './layouts/MobileLayout.vue';
import { themeConfig } from './theme';

const { t } = useI18n();
const router = useRouter();
const isMobile = useIsMobile();

const selectedKeys = ref(['home']);

const items: ItemType[] = [
  {
    label: t('common.home'),
    key: 'home',
    icon: () => h(DesktopOutlined),
    onClick: () => {
      router.push('/');
    },
  },
  {
    label: t('presets.title'),
    key: 'presets',
    icon: () => h(FileOutlined),
    onClick: () => {
      router.push('/presets');
    },
  },
  {
    label: t('budget.title'),
    key: 'budget',
    icon: () => h(FileOutlined),
    onClick: () => {
      router.push('/budget');
    },
  },
];
</script>
