import * as Clipboard from 'expo-clipboard'
import { Linking, Share, Alert } from 'react-native'
import Toast from 'react-native-toast-message'

export const handleCopy = (link: string | null) => {
  if (link === null) {
    Alert.alert('Error copying', 'Failed to copy link, please try again')
    return
  }
  Clipboard.setStringAsync(link)
  Toast.show({
    text1: 'Link copied to clipboard',
    visibilityTime: 2000,
    position: 'bottom',
    type: 'subtle',
  })
}

export const handleShareLink = async (link: string | null) => {
  if (!link) return
  await Share.share({
    url: link,
  })
}

export const handleOpenInBrowser = async (link: string | null) => {
  if (!link) return
  Linking.openURL(link)
}
