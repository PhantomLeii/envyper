import { config } from "@envyper/eslint-config/reactjs";

/** @type {import("eslint").Linter.Config} */
export default [
  ...config,
  { ignores: ["node_modules/", "dist/"] },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
