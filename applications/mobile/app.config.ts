/* eslint-disable no-console -- Fine for config file */
type AppVariant = 'simulator' | 'development' | 'staging' | 'production'
interface BuildSettings {
  appIdentifier: string
  name: string
  scheme: string
  iosIcon: string
  iosShareExtensionName: string
}

const APP_VARIANTS: AppVariant[] = [
  'simulator',
  'development',
  'staging',
  'production',
] as const

function isAppVariant(value: string): value is AppVariant {
  return APP_VARIANTS.includes(value as AppVariant)
}

const BUILD_SETTINGS_MAP: Record<AppVariant, BuildSettings> = {
  simulator: {
    appIdentifier: 'com.slongdotexe.linklaundry.dev',
    name: 'Link Laundry Dev',
    scheme: 'linklaundry-dev',
    iosIcon: './src/icons/V1Develop.icon',
    iosShareExtensionName: 'Link Laundry Dev Share',
  },
  development: {
    appIdentifier: 'com.slongdotexe.linklaundry.dev',
    name: 'Link Laundry Dev',
    scheme: 'linklaundry-dev',
    iosIcon: './src/icons/V1Develop.icon',
    iosShareExtensionName: 'Link Laundry Dev Share',
  },
  staging: {
    appIdentifier: 'com.slongdotexe.linklaundry.stage',
    name: 'Link Laundry Stg',
    scheme: 'linklaundry-stage',
    iosIcon: './src/icons/V1Staging.icon',
    iosShareExtensionName: 'Link Laundry Stg Share',
  },
  production: {
    appIdentifier: 'com.slongdotexe.linklaundry',
    name: 'Link Laundry',
    scheme: 'linklaundry',
    iosIcon: './src/icons/V1Staging.icon',
    iosShareExtensionName: 'Link Laundry Share',
  },
}

function getAppVariant(): AppVariant {
  const appVariantFromEnv: string | undefined = process.env.APP_VARIANT
  const appVariantFromProfile: string | undefined =
    process.env.EAS_BUILD_PROFILE
  const resolvedEnv = appVariantFromEnv ?? appVariantFromProfile

  if (resolvedEnv && isAppVariant(resolvedEnv)) {
    return resolvedEnv
  }

  console.error('No APP_VARIANT or EAS_BUILD_PROFILE set.')
  console.error(
    'If building locally check APP_VARIANT is exported from ios/.xcode.env.local'
  )
  throw new Error('No resolved app variant')
}

const APP_VARIANT = getAppVariant()
const BUILD_SETTINGS = BUILD_SETTINGS_MAP[APP_VARIANT]
const APP_SCHEME = BUILD_SETTINGS.scheme

export default {
  expo: {
    newArchEnabled: true,
    name: BUILD_SETTINGS.name,
    jsEngine: 'hermes',
    slug: 'link-laundry',
    orientation: 'portrait',
    icon: './src/assets/link-laundry-dark.png',
    scheme: APP_SCHEME,
    userInterfaceStyle: 'automatic',
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      icon: BUILD_SETTINGS.iosIcon,
      bundleIdentifier: BUILD_SETTINGS.appIdentifier,
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './src/assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: BUILD_SETTINGS.appIdentifier,
    },
    web: {
      favicon: './src/assets/favicon.png',
    },
    plugins: [
      [
        'expo-share-intent',
        {
          iosShareExtensionBundleIdentifier: `${BUILD_SETTINGS.appIdentifier}.share-extension`,
          iosShareExtensionName: BUILD_SETTINGS.iosShareExtensionName,
          iosAppGroupIdentifier: `group.${BUILD_SETTINGS.appIdentifier}`,
          androidIntentFilters: ['text/*', 'image/*'],
          iosActivationRules: {
            NSExtensionActivationSupportsText: true,
            NSExtensionActivationSupportsWebURL: true,
            NSExtensionActivationSupportsWebURLWithMaxCount: 1,
            // NSExtensionActivationSupportsWebPageWithMaxCount: 1,
          },
        },
      ],
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
        'expo-dev-client',
        {
          launchMode: 'most-recent',
          defaultLaunchURL: 'http://localhost:8081',
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
      appVariant: APP_VARIANT,
      appScheme: APP_SCHEME,
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

console.warn('############################################')
console.warn(`App variant is: ${APP_VARIANT}`)
console.warn(`App scheme is: ${APP_SCHEME}`)
console.warn('############################################')
