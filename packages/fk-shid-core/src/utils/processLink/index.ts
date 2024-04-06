import { LinkDomainRegexVendors } from '../../regex/linkDomainRegex'
import { canonicalExtractor } from '../canonicalExtractor'
import { linkDomainVendorMatcher } from '../linkDomainVendorMatcher'
import { shareIdCleaner } from '../shareIdCleaner'

type TResourceRegex = {
  canonicalMatchers?: RegExp[]
  shidMatchers?: RegExp[]
}

export const processUrl = (
  domainMatchers: Record<string, RegExp[]>,
  resourceMatchers: Record<string, TResourceRegex>,
  url: URL
) => {
  const domainMatch = linkDomainVendorMatcher(
    Object.entries(domainMatchers),
    url.host
  )

  if (!domainMatch) return null
  const matchers =
    resourceMatchers[domainMatch.vendor as LinkDomainRegexVendors]

  if (!matchers) {
    throw new Error('No resource matchers for vendor')
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- Temporary. TODO: Remove
  const { canonicalMatchers, shidMatchers } = matchers
  const cleanedResourceSegment = canonicalMatchers
    ? canonicalExtractor(canonicalMatchers, url.pathname)
    : shareIdCleaner()

  return `${domainMatch.domain}${cleanedResourceSegment}`
}
