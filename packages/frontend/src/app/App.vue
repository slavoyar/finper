<template>
  <ALayout style="min-height: 100vh" :has-sider="isMobile">
    <template v-if="!isMobile">
      <ALayoutHeader>
        <AMenu v-model:selected-keys="selectedKeys" mode="horizontal" theme="dark">
          <AMenuItem key="1"><router-link to="/">Home</router-link></AMenuItem>
          <AMenuItem key="2"><router-link to="/presets">Presets</router-link></AMenuItem>
        </AMenu>
      </ALayoutHeader>
      <ALayoutContent :style="{ padding: '20px 50px', height: '100%' }">
        <router-view />
      </ALayoutContent>
    </template>
    <template v-else>
      <ALayout>
        <ALayoutHeader :style="{ padding: '10px' }">
          <AFlex justify="flex-end" align="center" :style="{ height: '100%' }">
            <MenuOutlined :style="{ fontSize: '24px', color: '#fff' }" @click="toggleSidebar" />
          </AFlex>
        </ALayoutHeader>
        <ALayoutContent :style="{ padding: '10px', height: '100%' }">
          <router-view v-show="isCollapsed || !isMobile" />
        </ALayoutContent>
      </ALayout>
      <ALayoutSider :collapsed="isCollapsed" :default-collapsed="true" collapsed-width="0" width="100%">
        <ASpace direction="vertical" :style="{ width: '100%' }">
          <AFlex justify="flex-end" align="center" :style="{ height: '64px', padding: '10px' }">
            <CloseOutlined :style="{ fontSize: '24px', color: '#fff' }" @click="toggleSidebar" />
          </AFlex>
          <AMenu v-model:selected-keys="selectedKeys" :style="{ lineHeight: '64px' }" theme="dark">
            <AMenuItem key="1"><router-link to="/">Home</router-link></AMenuItem>
            <AMenuItem key="2"><router-link to="/presets">Presets</router-link></AMenuItem>
          </AMenu>
        </ASpace>
      </ALayoutSider>
    </template>
  </ALayout>
</template>

<script setup lang="ts">
import { CloseOutlined, MenuOutlined } from '@ant-design/icons-vue';
import { useIsMobile } from '@shared/composabes';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const selectedKeys = ref(['1']);
const isCollapsed = ref(true);

router.beforeEach((to) => {
  toggleSidebar();
  if (to.path === '/') {
    selectedKeys.value = ['1'];
  } else if (to.path === '/presets') {
    selectedKeys.value = ['2'];
  }
});

const isMobile = useIsMobile();

watch(
  () => isMobile.value,
  () => {
    isCollapsed.value = false;
  }
);

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};
</script>
