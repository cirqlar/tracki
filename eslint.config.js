import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginQuery from "@tanstack/eslint-plugin-query";

/** @type {import('eslint').Linter.Config[]} */
export default [
	{ files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
	{ languageOptions: { globals: { ...globals.browser, ...globals.node } } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	pluginReact.configs.flat["jsx-runtime"],
	{
		plugins: {
			"react-hooks": pluginReactHooks,
		},
		rules: pluginReactHooks.configs.recommended.rules,
	},
	...pluginQuery.configs["flat/recommended"],
	{ ignores: ["src-tauri", "dist/"] },
];
