<template>
  <ALayout class="telegram-only-container">
    <ALayoutContent>
      <AResult
        status="warning"
        title="Use Telegram to Access"
        sub-title="This mini-app only works inside Telegram"
      >
        <template #extra>
          <div class="qr-container">
            <p>Scan this QR code with Telegram:</p>
            <AQrcode :value="telegramDeepLink" :size="200" color="#0088cc" class="qr-code" />
            <p class="bot-name">@{{ botUsername }}</p>

            <AButton type="primary" size="large" :href="telegramDeepLink" class="open-button">
              Open in Telegram
            </AButton>
          </div>
        </template>
      </AResult>
    </ALayoutContent>
  </ALayout>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

const botUsername = ref('SlavoyarInvestmentsBot');

const telegramDeepLink = computed(() => {
  return `https://t.me/${botUsername.value}`;
});
</script>

<style scoped>
.telegram-only-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f2f5;
}

.qr-container {
  text-align: center;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.qr-code {
  margin: 15px 0;
  padding: 10px;
  background: white;
  border: 1px solid #eee;
}

.bot-name {
  font-size: 18px;
  font-weight: 500;
  color: #1890ff;
  margin-bottom: 20px;
}

.open-button {
  margin-top: 10px;
}

.legal-links {
  margin-top: 25px;
  font-size: 13px;
  color: #666;
}

.legal-links a {
  margin: 0 5px;
}
</style>
