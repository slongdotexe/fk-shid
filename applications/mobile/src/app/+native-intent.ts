import { getShareExtensionKey } from 'expo-share-intent'

export function redirectSystemPath({
  path,
}: {
  path: string
  initial: string
}) {
  try {
    console.log(getShareExtensionKey())
    if (path.includes(`dataUrl=${getShareExtensionKey()}`)) {
      // redirect to the ShareIntent Screen to handle data with the hook
      console.debug('[expo-router-native-intent] ')
      return '/'
    }
    return path
  } catch {
    return '/'
  }
}
