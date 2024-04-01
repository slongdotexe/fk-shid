/* eslint-env node */
const { getTsOverride } = require('eslint-config-slongdotexe/getTsOverride.js')
const path = require('path')

module.exports = {
  extends: ['eslint-config-slongdotexe/react'],
  rules: {
    'no-restricted-syntax': [
      'error',
      'ForInStatement',
      'LabeledStatement',
      'WithStatement',
    ],
  },
  overrides: [
    getTsOverride(path.join(__dirname, 'tsconfig.json')),
    {
      files: ['src/regex/**/*.ts'],
      rules: {
        'no-useless-escape': 'off',
      },
    },
  ],
}
