<template>
  <ALayout style="min-height: 100vh" :has-sider="isMobile">
    <ALayoutSider
      :collapsed="isCollapsed"
      :default-collapsed="true"
      collapsed-width="0"
      width="100%"
      :style="{
        height: '100vh',
        overflow: 'hidden',
        position: 'fixed',
        touchAction: 'none',
        zIndex: 10,
      }"
    >
      <ASpace direction="vertical" :style="{ width: '100%' }">
        <AFlex justify="flex-end" align="center" :style="{ height: '64px', padding: '10px' }">
          <CloseOutlined :style="{ fontSize: '24px', color: '#fff' }" @click="toggleSidebar" />
        </AFlex>
        <AMenu
          v-model:selected-keys="selectedKeys"
          :style="{ lineHeight: '64px' }"
          theme="dark"
          :items="items"
        >
        </AMenu>
      </ASpace>
    </ALayoutSider>
    <ALayout>
      <ALayoutHeader :style="{ padding: '10px' }">
        <AFlex justify="space-between" align="center" :style="{ height: '100%' }">
          <ATypography :style="{ fontSize: '24px', color: '#fff' }">Finper</ATypography>
          <MenuOutlined :style="{ fontSize: '24px', color: '#fff' }" @click="toggleSidebar" />
        </AFlex>
      </ALayoutHeader>
      <ALayoutContent :style="{ padding: '10px', height: '100%' }">
        <router-view v-show="isCollapsed || !isMobile" />
      </ALayoutContent>
    </ALayout>
  </ALayout>
</template>

<script setup lang="ts">
import { CloseOutlined, MenuOutlined } from '@ant-design/icons-vue';
import { useIsMobile } from '@shared/composabes';
import { ItemType } from 'ant-design-vue';
import { ref, watch } from 'vue';

defineProps<{
  items: ItemType[];
}>();

const selectedKeys = defineModel<string[]>('selectedKeys');
const isMobile = useIsMobile();
const isCollapsed = ref(true);

watch(
  () => isMobile.value,
  () => {
    isCollapsed.value = true;
  }
);

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};

watch(
  () => selectedKeys.value,
  () => {
    isCollapsed.value = true;
  }
);
</script>
