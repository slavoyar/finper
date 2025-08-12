import 'ant-design-vue/dist/reset.css';

import TelegramOnlyPage from '@pages/TelegramOnlyPage.vue';
import Antd from 'ant-design-vue';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from './App.vue';
import i18n from './i18n';
import { router } from './router';

const app = Telegram.WebApp.initData || import.meta.env.DEV ? createApp(App) : createApp(TelegramOnlyPage);

app.use(createPinia());
app.use(router);
app.use(Antd);
app.use(i18n);

app.mount('#app');

if (Telegram.WebApp.initData) {
  Telegram.WebApp.ready();
}
