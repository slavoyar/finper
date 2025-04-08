import eslint from "@eslint/js";
import { globalIgnores } from "eslint/config";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import simpleSortPlugin from "eslint-plugin-simple-import-sort";
import typescriptEslint from "typescript-eslint";

export const createConfig = (options = []) =>
  typescriptEslint.config(
    globalIgnores(["node_modules", "dist"]),
    eslint.configs.recommended,
    ...typescriptEslint.configs.recommended,
    {
      plugins: {
        "simple-import-sort": simpleSortPlugin,
      },
      rules: {
        "simple-import-sort/imports": "error",
        "simple-import-sort/exports": "error",
      },
    },
    ...options,
    eslintPluginPrettier,
  );
