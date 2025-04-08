import eslintPluginTailwindCSS from 'eslint-plugin-tailwindcss';
import eslintPluginVue from 'eslint-plugin-vue';

import { createConfig } from '../../eslint.config.js';

export default createConfig([
  ...eslintPluginVue.configs['flat/recommended'],
  {
    files: ['*.vue', '**/*.vue', '*.ts', '**/*.ts', '*.js', '**/*.js'],
    languageOptions: {
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.vue'],
      },
    },
  },
  {
    plugins: {
      vue: eslintPluginVue,
      tailwindcss: eslintPluginTailwindCSS,
    },
    rules: {},
  },
]);
