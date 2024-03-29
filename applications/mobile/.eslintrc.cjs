/* eslint-env node */
const { getTsOverride } = require('eslint-config-slongdotexe/getTsOverride.js')
const path = require('path')

module.exports = {
  extends: ['eslint-config-slongdotexe/react'],
  // parserOptions: {
  //   project: true,
  //   tsconfigRootDir: __dirname,
  // },
  overrides: [getTsOverride(path.join(__dirname, 'tsconfig.json'))],
}
