/* eslint-env node */
module.exports = {
  extends: [
    "eslint-config-slongdotexe/base",
  ],
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  root: true,
};
