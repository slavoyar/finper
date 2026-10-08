import i18n from '@app/i18n';

export function t(key: string, named?: Record<string, unknown>) {
  return named ? i18n.global.t(key, named) : i18n.global.t(key);
}

export function appLocale(): 'ru' | 'en' {
  const value = i18n.global.locale;
  const code = typeof value === 'string' ? value : value.value;
  return code?.toLowerCase().startsWith('ru') ? 'ru' : 'en';
}
