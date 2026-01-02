import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier/recommended';

export default [
  {
    ignores: ['dist/**', 'build/**', 'coverage/**', '**/*.js', '!eslint.config.js'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
];
