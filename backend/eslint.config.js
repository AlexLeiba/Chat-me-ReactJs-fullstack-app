import globals from 'globals';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.js'],
    languageOptions: { sourceType: 'module' },
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,

  {
    rules: {
      'no-process-env': 'off', // Disable the rule for using process.env
      'no-undef': 'off', //disable the rule for using undefined variables
      'no-console': 'warn',
      'no-unused-vars': 'warn',
    },
  },
];
