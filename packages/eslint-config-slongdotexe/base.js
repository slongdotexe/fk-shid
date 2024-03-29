/* eslint-env node  */
module.exports = {
  env: { browser: true, es6: true, node: true },
  extends: [
    'eslint:recommended',
    'airbnb',
    'plugin:import/recommended',
    'plugin:eslint-comments/recommended',
    'prettier',
  ],
  globals: { Atomics: 'readonly', SharedArrayBuffer: 'readonly' },
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['@shopify', 'import'],
  rules: {
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'no-use-before-define': 0,
    'no-undef': 0,
    'no-unused-vars': 0,
    'import/order': [
      2,
      {
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    'arrow-body-style': 2,
    'no-underscore-dangle': 0,
    quotes: [2, 'single'],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    '@shopify/prefer-early-return': 1,
    '@shopify/typescript/prefer-pascal-case-enums': 2,
    '@shopify/typescript/prefer-singular-enums': 2,
    'import/prefer-default-export': 'off',
    'eslint-comments/require-description': [
      'error',
      { ignore: ['eslint-env'] },
    ],
    'import/no-extraneous-dependencies': [
      'off',
      {
        devDependencies: false,
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
    'no-plusplus': [
      'error',
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    'eslint-comments/disable-enable-pair': 'off',
  },
  settings: { react: { version: 'detect' } },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      env: { browser: true, es6: true, node: true },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'prettier',
      ],
      plugins: ['react', '@typescript-eslint', 'prettier'],
      globals: { Atomics: 'readonly', SharedArrayBuffer: 'readonly' },
      parser: '@typescript-eslint/parser',
      rules: {
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
      },
    },
  ],
}

