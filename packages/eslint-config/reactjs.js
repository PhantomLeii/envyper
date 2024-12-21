import react from "eslint-plugin-react";
import js from "@eslint/js";
import globals from "globals";
import * as reactHooks from "eslint-plugin-react-hooks";
import * as reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { config as baseConfig } from "./base.js";

/** @type {import("eslint").Linter.Config} */
export const config = [
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...baseConfig,
  {
    files: ["*.jsx", "*.tsx", "*.ts"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      react,
    },
    settings: {
      react: {
        version: "19.0.0",
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
];
