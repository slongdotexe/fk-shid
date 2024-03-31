function getTsOverride(configPath) {
  return {
    files: ['**/*.ts', '**/*.tsx'],
    parserOptions: {
      sourceType: 'module',
      project: configPath,
    },
  }
}

module.exports = {
  getTsOverride,
}
