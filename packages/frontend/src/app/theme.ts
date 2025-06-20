import { theme } from 'ant-design-vue';
import { ThemeConfig } from 'ant-design-vue/es/config-provider/context';

const defaultTheme = {
  accent_text_color: '#6ab2f2',
  bg_color: '#17212b',
  bottom_bar_bg_color: '#17212b',
  button_color: '#5288c1',
  button_text_color: '#ffffff',
  destructive_text_color: '#ec3942',
  header_bg_color: '#17212b',
  hint_color: '#708499',
  link_color: '#6ab3f3',
  secondary_bg_color: '#232e3c',
  section_bg_color: '#17212b',
  section_header_text_color: '#6ab3f3',
  section_separator_color: '#111921',
  subtitle_text_color: '#708499',
  text_color: '#f5f5f5',
};
const telegramTheme = Object.keys(Telegram.WebApp.themeParams).length
  ? Telegram.WebApp.themeParams
  : defaultTheme;

const { darkAlgorithm, defaultAlgorithm } = theme;

const getAlgorithm = () => {
  if (!telegramTheme.text_color) {
    return defaultAlgorithm;
  }
  const colorHex = parseInt(telegramTheme.text_color.replace('#', ''), 16);

  if (colorHex <= parseInt('808080', 16)) {
    return defaultAlgorithm;
  }
  return darkAlgorithm;
};

// TODO: move it to store with theme change listener
export const themeConfig: ThemeConfig = {
  algorithm: [getAlgorithm()],
  token: {
    colorPrimary: telegramTheme.link_color,
    colorText: telegramTheme.text_color,
    colorTextSecondary: telegramTheme.subtitle_text_color,
    colorLink: telegramTheme.link_color,
    colorError: telegramTheme.destructive_text_color,

    colorBgBase: telegramTheme.secondary_bg_color,
    colorBgContainer: telegramTheme.bg_color,
  },
};
