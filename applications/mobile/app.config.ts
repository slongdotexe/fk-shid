type AppVariant = 'simulator' | 'development' | 'stage' | 'production'
type BuildSettings = { name: string; scheme: string }

const APP_IDENTIFIER_MAP: Record<AppVariant, string> = {
  simulator: 'com.slongdotexe.linklaundry.dev',
  development: 'com.slongdotexe.linklaundry.dev',
  stage: 'com.slongdotexe.linklaundry.stage',
  production: 'com.slongdotexe.linklaundry',
}

const BUILD_SETTINGS_MAP: Record<AppVariant, BuildSettings> = {
  simulator: { name: 'Link Laundry Dev', scheme: 'linklaundry-dev' },
  development: { name: 'Link Laundry Dev', scheme: 'linklaundry-dev' },
  stage: { name: 'Link Laundry Stage', scheme: 'linklaundry-stage' },
  production: { name: 'Link Laundry', scheme: 'linklaundry' },
}

const LEGACY_VARIANT_MAP: Record<string, AppVariant> = {
  preview: 'development',
  staging: 'stage',
}

function normalizeVariant(value?: string): AppVariant | undefined {
  if (!value) {
    return undefined
  }

  if (value in BUILD_SETTINGS_MAP) {
    return value as AppVariant
  }

  return LEGACY_VARIANT_MAP[value]
}

function getAppVariant(): AppVariant {
  const appVariantFromEnv = normalizeVariant(process.env.APP_VARIANT)
  if (appVariantFromEnv) {
    return appVariantFromEnv
  }

  const appVariantFromProfile = normalizeVariant(process.env.EAS_BUILD_PROFILE)
  if (appVariantFromProfile) {
    return appVariantFromProfile
  }

  return 'development'
}

const BUILD_SETTINGS = BUILD_SETTINGS_MAP[getAppVariant()]
const APP_IDENTIFIER = APP_IDENTIFIER_MAP[getAppVariant()]

function getShareIntentPluginConfig() {
  return {
    iosShareExtensionBundleIdentifier: `${APP_IDENTIFIER}.share-extension`,
    iosAppGroupIdentifier: `group.${APP_IDENTIFIER}`,
    androidIntentFilters: ['text/*', 'image/*'],
    iosActivationRules: {
      NSExtensionActivationSupportsText: true,
      NSExtensionActivationSupportsWebURL: true,
      NSExtensionActivationSupportsWebURLWithMaxCount: 1,
      NSExtensionActivationSupportsWebPageWithMaxCount: 1,
    },
  }
}

export default {
  expo: {
    newArchEnabled: true,
    name: BUILD_SETTINGS.name,
    jsEngine: 'hermes',
    orientation: 'portrait',
    icon: './src/assets/link-laundry-dark.png',
    scheme: BUILD_SETTINGS.scheme,
    userInterfaceStyle: 'automatic',
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: APP_IDENTIFIER,
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
      },
      runtimeVersion: {
        policy: 'fingerprint',
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './src/assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: APP_IDENTIFIER,
      runtimeVersion: {
        policy: 'fingerprint',
      },
    },
    web: {
      favicon: './src/assets/favicon.png',
    },
    plugins: [
      ['expo-share-intent', getShareIntentPluginConfig()],
      'expo-router',
      [
        'expo-splash-screen',
        {
          backgroundColor: '#0A0A0A',
          image: './src/assets/link-laundry-dark.png',
          imageWidth: 175,
        },
      ],
      [
        'expo-build-properties',
        {
          android: {
            buildReactNativeFromSource: true,
          },
          ios: {
            buildReactNativeFromSource: true,
          },
        },
      ],
    ],
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: '13029648-6d6f-4050-835c-f5d06324bbf1',
      },
    },
    owner: 'slong.exe',
    runtimeVersion: {
      policy: 'fingerprint',
    },
    updates: {
      url: 'https://u.expo.dev/13029648-6d6f-4050-835c-f5d06324bbf1',
    },
  },
}
