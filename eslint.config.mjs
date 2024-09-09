import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  { files: ['*/.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: { process: true, console: true } } },

  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      'no-unused-vars': 'error',
      'no-undef': 'error',
      'no-unused-expressions': 'error',
      'prefer-const': 'error',
      'no-console': 'warn',
    },
  },
  {
    ignores: ['dist/', 'node_modules/', 'config'],
  },
];
