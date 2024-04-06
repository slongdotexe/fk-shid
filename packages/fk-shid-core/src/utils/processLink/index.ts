import { LinkDomainRegexVendors } from '../../regex/linkDomainRegex'
import { canonicalExtractor } from '../canonicalExtractor'
import {
  LinkDomainMatchers,
  linkDomainVendorMatcher,
} from '../linkDomainVendorMatcher'

type TResourceRegex = {
  canonicalMatchers?: RegExp[]
  shidMatchers?: RegExp[]
}

export const processUrl = (
  domainMatchers: LinkDomainMatchers,
  resourceMatchers: Record<string, TResourceRegex>,
  url: URL
) => {
  const domainMatch = linkDomainVendorMatcher(domainMatchers, url.host)

  if (!domainMatch) {
    return {
      domain: null,
      resourceSegment: null,
    }
  }
  const matchers =
    resourceMatchers[domainMatch.vendor as LinkDomainRegexVendors]

  if (!matchers) {
    throw new Error('No resource matchers for vendor')
  }
  const { canonicalMatchers } = matchers
  const cleanedResourceSegment = canonicalExtractor(
    canonicalMatchers ?? [],
    url.pathname
      // Trim trailing slash
      .replace(/\/$/, '')
  )
  return {
    domain: domainMatch.domain,
    resourceSegment: cleanedResourceSegment,
  }
}
