import * as Clipboard from 'expo-clipboard'
import { Linking, Share } from 'react-native'

export const handleCopy = (link: string | null) => {
  if (!link) return
  Clipboard.setStringAsync(link)
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
