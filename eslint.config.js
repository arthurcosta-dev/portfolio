import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import { defineConfig, globalIgnores } from "eslint/config";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

// Rotas só como objetos em src/routes.jsx.
const DECLARATIVE_ROUTER = ["react-router", "react-router-dom"].map((name) => ({
  name,
  importNames: ["BrowserRouter", "Routes", "Route", "createRoutesFromElements"],
  message: "Use createBrowserRouter com objetos em src/routes.jsx.",
}));

export default defineConfig([
  globalIgnores(["dist", "coverage"]),
  {
    files: ["**/*.{js,jsx,mjs}"],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
      "no-restricted-imports": ["error", { paths: DECLARATIVE_ROUTER }],
    },
  },
  {
    // Regra de ouro: componente não fala com API; quem chama service é hook.
    files: ["src/components/**/*.jsx", "src/pages/**/*.jsx"],
    ignores: ["**/*.test.jsx"],
    rules: {
      "no-restricted-globals": [
        "error",
        { name: "fetch", message: "Chamadas de API ficam em src/services." },
      ],
      "no-restricted-properties": [
        "error",
        {
          object: "window",
          property: "fetch",
          message: "Chamadas de API ficam em src/services.",
        },
      ],
      "no-restricted-imports": [
        "error",
        {
          paths: [
            ...DECLARATIVE_ROUTER,
            {
              name: "@supabase/supabase-js",
              message: "O Supabase fica em src/services.",
            },
          ],
          patterns: [
            {
              group: ["**/services/*"],
              message: "Componente usa um hook; o hook chama o service.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["**/*.mjs", "*.config.js"],
    languageOptions: { globals: globals.node },
  },
  prettier,
]);
