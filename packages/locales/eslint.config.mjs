import { baseConfig } from '../../eslint.config.mjs';

export default baseConfig([
  {
    languageOptions: {
      parserOptions: {
        project: ['tsconfig.json'],
      },
    },
  },
]);
