<template>
  <ALayout style="min-height: 100vh">
    <ALayout>
      <ALayoutContent :style="{ padding: '10px', height: '100%' }">
        <AFloatButton v-show="isCollapsed" :style="{ right: '10px', top: '16px' }" @click="toggleSidebar">
          <template #icon>
            <MenuOutlined />
          </template>
        </AFloatButton>
        <router-view v-show="isCollapsed || !isMobile" />
      </ALayoutContent>
    </ALayout>
    <ALayoutSider
      theme="light"
      v-model:collapsed="isCollapsed"
      :default-collapsed="true"
      collapsed-width="0"
      collapsible
      width="100%"
      :trigger="null"
    >
      <ASpace direction="vertical" :style="{ width: '100%' }">
        <AFlex justify="flex-end">
          <CloseOutlined
            :style="{ fontSize: '24px', height: '64px', padding: '10px' }"
            @click="toggleSidebar"
          />
        </AFlex>
        <AMenu
          v-model:selected-keys="selectedKeys"
          :style="{ lineHeight: '64px' }"
          :items="items"
          :mode="isCollapsed ? 'vertical' : 'inline'"
        >
        </AMenu>
      </ASpace>
    </ALayoutSider>
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
