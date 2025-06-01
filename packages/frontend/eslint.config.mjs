import eslintPluginTailwindCSS from 'eslint-plugin-tailwindcss';
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintPluginVue from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';
import simpleSortPlugin from 'eslint-plugin-simple-import-sort';
import path from 'path';
import { fileURLToPath } from 'url';
import globals from 'globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default tseslint.config(
  globalIgnores(['node_modules', 'dist', '**/*.d.ts']),
  {
    ignores: ['*.config.*'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...eslintPluginVue.configs['flat/strongly-recommended'],
  eslintPluginPrettierRecommended,
  {
    plugins: {
      vue: eslintPluginVue,
      tailwindcss: eslintPluginTailwindCSS,
    },
  },
  {
    files: ['*.vue', '**/*.vue', '*.ts', '**/*.ts'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.vue'],
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    plugins: {
      'simple-import-sort': simpleSortPlugin,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  }
);
