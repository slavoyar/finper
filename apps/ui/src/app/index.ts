import 'ant-design-vue/dist/reset.css';

import TelegramOnlyPage from '@pages/TelegramOnlyPage.vue';
import Antd from 'ant-design-vue';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from './App.vue';
import { router } from './router';

const app = Telegram.WebApp.initData ? createApp(App) : createApp(TelegramOnlyPage);

app.use(createPinia());
app.use(router);
app.use(Antd);

app.mount('#app');
