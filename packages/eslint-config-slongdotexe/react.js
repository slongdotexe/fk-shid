/* eslint-env node */
module.exports = {
  extends: [
    'eslint-config-slongdotexe/base',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'airbnb/hooks',
    'plugin:react/jsx-runtime',
    'prettier',
  ],
  plugins: ['react'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'react/require-default-props': 0,
    'react/prop-types': 0,
    '@shopify/jsx-prefer-fragment-wrappers': 1,
    'react/jsx-props-no-spreading': 0,
    'react/function-component-definition': [
      0,
      { namedComponents: 'arrow-function' },
    ],
    'react/style-prop-object': 0,
  },
}
