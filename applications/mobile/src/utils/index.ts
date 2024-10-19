import * as Clipboard from 'expo-clipboard'
import { ShareIntent } from 'expo-share-intent'
import {
  mergedVendorRegexes,
  processUrl,
  vendorLinkDomainRegex,
} from 'fk-shid-core'
import { Linking, Share } from 'react-native'

export const processShareIntentLink = (
  shareIntent: ShareIntent,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- Temporary
  hasShareIntent: boolean
) => {
  const url = new URL(shareIntent.webUrl ?? '')
  const processedLink = processUrl(
    vendorLinkDomainRegex,
    mergedVendorRegexes,
    url
  )

  return `${url.protocol}//${processedLink.domain}${processedLink.resourceSegment}`
}

export const processInputLink = (link: string) => {
  const inputUrl = new URL(link)
  const processedLink = processUrl(
    vendorLinkDomainRegex,
    mergedVendorRegexes,
    inputUrl
  )
  return `${inputUrl.protocol}//${processedLink.domain}${processedLink.resourceSegment}`
}

export const handleCopy = (link: string) => {
  return Clipboard.setStringAsync(link)
}

export const handleShareLink = async (link: string) => {
  try {
    await Share.share({
      url: link,
    })
  } catch (error) {
    console.log(error)
  }
}

export const handleOpenInBrowser = async (link: string) => {
  try {
    Linking.openURL(link)
  } catch (error) {
    console.log(error)
  }
}
