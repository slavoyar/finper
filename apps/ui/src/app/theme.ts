const defaultTheme = {
  accent_text_color: '#6ab2f2',
  bg_color: '#17212b',
  bottom_bar_bg_color: '#17212b',
  button_color: '#3d6ea3',
  button_text_color: '#ffffff',
  destructive_text_color: '#ff8d8a',
  header_bg_color: '#17212b',
  hint_color: '#93aec4',
  link_color: '#6ab3f3',
  secondary_bg_color: '#232e3c',
  section_bg_color: '#17212b',
  section_header_text_color: '#6ab3f3',
  section_separator_color: '#111921',
  subtitle_text_color: '#93aec4',
  text_color: '#f5f5f5',
};

type TelegramTheme = typeof defaultTheme;

const themeParams = Telegram.WebApp.themeParams;
const telegramTheme: TelegramTheme = { ...defaultTheme };

if (Object.keys(themeParams).length) {
  Object.entries(themeParams).forEach(([key, value]) => {
    if (typeof value === 'string' && key in telegramTheme) {
      telegramTheme[key as keyof TelegramTheme] = value;
    }
  });
}

const isDarkTheme = (textColor?: string) => {
  if (!textColor) {
    return false;
  }
  return parseInt(textColor.replace('#', ''), 16) > parseInt('808080', 16);
};

export const applyTelegramTheme = () => {
  const root = document.documentElement;
  const dark = isDarkTheme(telegramTheme.text_color);
  root.classList.toggle('van-theme-dark', dark);
  root.style.colorScheme = dark ? 'dark' : 'light';

  const vars: Record<string, string> = {
    '--app-canvas': telegramTheme.section_separator_color,
    '--link-color': telegramTheme.link_color,
    '--yield-color': telegramTheme.link_color,
    '--van-primary-color': telegramTheme.button_color,
    '--van-danger-color': telegramTheme.destructive_text_color,
    '--van-text-color': telegramTheme.text_color,
    '--van-text-color-2': telegramTheme.subtitle_text_color,
    '--van-text-color-3': telegramTheme.hint_color,
    '--van-active-color': telegramTheme.secondary_bg_color,
    '--van-background': telegramTheme.bg_color,
    '--van-background-2': telegramTheme.secondary_bg_color,
    '--van-background-3': telegramTheme.section_bg_color,
    '--van-border-color': telegramTheme.section_separator_color,
    '--van-nav-bar-background': telegramTheme.header_bg_color,
    '--van-nav-bar-title-text-color': telegramTheme.text_color,
    '--van-nav-bar-icon-color': telegramTheme.link_color,
    '--van-nav-bar-text-color': telegramTheme.link_color,
    '--van-cell-background': telegramTheme.secondary_bg_color,
    '--van-cell-text-color': telegramTheme.text_color,
    '--van-cell-value-color': telegramTheme.link_color,
    '--van-cell-label-color': telegramTheme.subtitle_text_color,
    '--van-button-primary-background': telegramTheme.button_color,
    '--van-button-primary-border-color': telegramTheme.button_color,
    '--van-button-primary-color': telegramTheme.button_text_color,
    '--van-popup-background': telegramTheme.secondary_bg_color,
    '--van-pagination-background': telegramTheme.bg_color,
    '--van-pagination-item-default-color': telegramTheme.secondary_bg_color,
    '--van-pagination-item-disabled-background': telegramTheme.bg_color,
  };

  Object.entries(vars).forEach(([name, value]) => {
    if (value) {
      root.style.setProperty(name, value);
    }
  });
};
