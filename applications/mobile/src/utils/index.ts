import Clipboard from 'expo-clipboard'
import { ShareIntent } from 'expo-share-intent'
import {
  mergedVendorRegexes,
  processUrl,
  vendorLinkDomainRegex,
} from 'fk-shid-core'

export const processShareIntentLink = (
  shareIntent: ShareIntent,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- Temporary
  hasShareIntent: boolean
) => {
  const processedLink = processUrl(
    vendorLinkDomainRegex,
    mergedVendorRegexes,
    new URL(shareIntent.webUrl ?? '')
  )

  return `${processedLink.domain}${processedLink.resourceSegment}`
}

export const processInputLink = (link: string) => {
  const processedLink = processUrl(
    vendorLinkDomainRegex,
    mergedVendorRegexes,
    new URL(link)
  )
  return `${processedLink.domain}${processedLink.resourceSegment}`
}

export const handleCopy = (link: string) => {
  return Clipboard.setStringAsync(link)
}
