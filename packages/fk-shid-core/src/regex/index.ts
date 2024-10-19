import { vendorLinkCanonicalRegex } from './link-segment-matchers'
import * as linkDomainRegex from './domain-matchers'

const mergedVendorRegexes = Object.entries(vendorLinkCanonicalRegex).reduce(
  (acc, [vendor, regexes]) => {
    return {
      ...acc,
      [vendor]: {
        canonicalMatchers: regexes,
      },
    }
  },
  {}
)

export { vendorLinkCanonicalRegex, linkDomainRegex, mergedVendorRegexes }
