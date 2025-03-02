const path = require('path')

const { getDefaultConfig } = require('expo/metro-config')
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config')

// Find the project and workspace directories
const projectRoot = __dirname
// This can be replaced with `find-yarn-workspace-root`
const monorepoRoot = path.resolve(projectRoot, '../..')

const config = getDefaultConfig(projectRoot)

// 1. Watch all files within the monorepo
config.watchFolders = [monorepoRoot]
// 2. Let Metro know where to resolve packages and in what order
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
]

config.cacheStores = ({ FileStore }) => [
  new FileStore({
    root: path.join(projectRoot, 'node_modules', '.cache', 'metro'),
  }),
]

module.exports = wrapWithReanimatedMetroConfig(config)
