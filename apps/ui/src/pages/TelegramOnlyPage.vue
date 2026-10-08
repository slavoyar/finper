<template>
  <main class="shell gate">
    <h1>{{ t('gate.title') }}</h1>
    <p>{{ t('gate.body') }}</p>
    <p class="bot">@{{ botUsername }}</p>
    <van-button type="primary" block :url="telegramDeepLink">{{ t('gate.open') }}</van-button>
  </main>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const botUsername = ref('SlavoyarInvestmentsBot');
const telegramDeepLink = computed(() => `https://t.me/${botUsername.value}`);

onMounted(() => {
  document.title = t('gate.title');
});
</script>
