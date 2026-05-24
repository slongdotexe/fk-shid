const IS_DEV =
  process.env.APP_VARIANT === 'preview' ||
  process.env.APP_VARIANT === 'simulator'

function getUniqueIdentifier(): string {
  if (IS_DEV) {
    return 'com.slongdotexe.linklaundry.dev'
  }
  return 'com.slongdotexe.linklaundry'
}

function getShareExtensionBundleIdentifier(): string {
  return `${getUniqueIdentifier()}.share-extension`
}

function getAppGroupIdentifier(): string {
  return `group.${getUniqueIdentifier()}`
}

function getScheme(): string {
  if (IS_DEV) return 'link-laundry-dev'
  return 'link-laundry'
}

function getAppName(): string {
  if (IS_DEV) {
    return 'Link Laundry Dev'
  }

  return 'Link Laundry'
}

function getShareIntentPluginConfig() {
  return {
    iosShareExtensionBundleIdentifier: getShareExtensionBundleIdentifier(),
    iosAppGroupIdentifier: getAppGroupIdentifier(),
    androidIntentFilters: ['text/*', 'image/*'],
  }
}

function getSlug() {
  if (IS_DEV) {
    return 'link-laundry-dev'
  }
  return 'link-laundry'
}

export default {
  expo: {
    newArchEnabled: true,
    name: getAppName(),
    slug: getSlug(),
    jsEngine: 'hermes',
    orientation: 'portrait',
    icon: './src/assets/link-laundry-dark.png',
    scheme: getScheme(),
    userInterfaceStyle: 'automatic',
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: getUniqueIdentifier(),
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
      package: getUniqueIdentifier(),
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
