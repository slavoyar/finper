import tseslint from 'typescript-eslint';
import eslintPluginTailwindCSS from 'eslint-plugin-tailwindcss';
import eslintPluginVue from 'eslint-plugin-vue';
import path from 'path';
import globals from 'globals';
import { globalIgnores } from 'eslint/config';
import { fileURLToPath } from 'url';

import { baseConfig } from '../../eslint.config.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default baseConfig([
  globalIgnores(['node_modules', 'dist', '**/*.d.ts', 'vite.config.ts']),
  {
    plugins: {
      vue: eslintPluginVue,
      tailwindcss: eslintPluginTailwindCSS,
    },
  },
  ...eslintPluginVue.configs['flat/strongly-recommended'],
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
]);
