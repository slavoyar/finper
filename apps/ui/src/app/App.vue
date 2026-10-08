<template>
  <div class="shell">
    <van-nav-bar :title="title" :left-arrow="!isHome" @click-left="router.push('/')" />
    <main class="shell-main">
      <router-view />
    </main>
    <footer class="shell-footer">
      <nav :aria-label="t('common.legal')">
        <router-link to="/privacy-policy">{{ t('privacy.title') }}</router-link>
        <router-link to="/terms-of-use">{{ t('terms.title') }}</router-link>
      </nav>
      <p>Finper ©{{ year }}</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const year = new Date().getFullYear();
const isHome = computed(() => route.path === '/');
const title = computed(() => {
  const key = route.meta.titleKey;
  return typeof key === 'string' ? t(key) : t('bonds.title');
});

watch(title, (value) => {
  document.title = value;
}, { immediate: true });
</script>
