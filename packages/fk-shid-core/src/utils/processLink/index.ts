import { LinkDomainRegexVendors } from '../../regex/linkDomainRegex'
import { canonicalExtractor } from '../canonicalExtractor'
import { linkDomainVendorMatcher } from '../linkDomainVendorMatcher'
import { shareIdCleaner } from '../shareIdCleaner'

type TResourceRegex = {
  canonicalMatchers?: RegExp[]
  shidMatchers?: RegExp[]
}

export const processLink = (
  domainMatchers: Record<string, RegExp[]>,
  resourceMatchers: Record<string, TResourceRegex>,
  link: string
) => {
  const domainMatch = linkDomainVendorMatcher(
    Object.entries(domainMatchers),
    link
  )

  if (!domainMatch) return null
  const matchers =
    resourceMatchers[domainMatch.vendor as LinkDomainRegexVendors]

  if (!matchers) {
    throw new Error('No resource matchers for vendor')
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- Temporary. TODO: Remove
  const { canonicalMatchers, shidMatchers } = matchers
  const resourceSegment = link.replace(domainMatch.domain, '')
  const cleanedResourceSegment = canonicalMatchers
    ? canonicalExtractor(canonicalMatchers, resourceSegment)
    : shareIdCleaner()

  return `${domainMatch.domain}${cleanedResourceSegment}`
}
