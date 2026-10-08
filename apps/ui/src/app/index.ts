import 'vant/lib/index.css';
import './shell.css';

import TelegramOnlyPage from '@pages/TelegramOnlyPage.vue';
import { createPinia } from 'pinia';
import {
  Button,
  Cell,
  CellGroup,
  Checkbox,
  CheckboxGroup,
  Empty,
  Field,
  NavBar,
  Pagination,
  Popup,
  Radio,
  RadioGroup,
  Skeleton,
} from 'vant';
import { createApp } from 'vue';

import App from './App.vue';
import i18n from './i18n';
import { router } from './router';
import { applyTelegramTheme } from './theme';

applyTelegramTheme();

const forceGate = import.meta.env.DEV && new URLSearchParams(window.location.search).has('gate');
const app =
  !forceGate && (Telegram.WebApp.initData || import.meta.env.DEV) ? createApp(App) : createApp(TelegramOnlyPage);

app.use(createPinia());
app.use(router);
[
  Button,
  Cell,
  CellGroup,
  Checkbox,
  CheckboxGroup,
  Empty,
  Field,
  NavBar,
  Pagination,
  Popup,
  Radio,
  RadioGroup,
  Skeleton,
].forEach((component) => app.use(component));
app.use(i18n);

app.mount('#app');

if (Telegram.WebApp.initData) {
  Telegram.WebApp.ready();
}
