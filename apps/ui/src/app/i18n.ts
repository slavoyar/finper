import messages from '@finper/locales';
import { createI18n } from 'vue-i18n';

const tg = Telegram.WebApp;
const currentLocale = tg?.initDataUnsafe?.user?.language_code || 'en';

const i18n = createI18n({
  legacy: false,
  locale: currentLocale,
  fallbackLocale: 'en',
  messages,
});

export default i18n;
