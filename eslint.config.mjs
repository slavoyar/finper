import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';
import simpleSortPlugin from 'eslint-plugin-simple-import-sort';

export const baseConfig = (config = [], prettierConfig) => {
  const prettierPluginConfig = prettierConfig ?? eslintPluginPrettierRecommended;
  return tseslint.config(
    {
      ignores: ['*.config.*'],
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    ...config,
    prettierPluginConfig,
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
};

export default baseConfig();
