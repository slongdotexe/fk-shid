function getTsOverride(configPath) {
  return {
    files: ['**/*.ts', '**/*.tsx'],
    parserOptions: {
      sourceType: 'module',
      project: configPath,
    },
    // settings: {
    //   'import/resolver': {
    //     typescript: {
    //       project: path.join(process.cwd(), tsconfigName),
    //     },
    //   },
    // },
  }
}

module.exports = {
  getTsOverride,
}
