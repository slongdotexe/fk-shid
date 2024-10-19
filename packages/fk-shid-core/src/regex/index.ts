import { vendorLinkCanonicalRegex } from './linkCanonicalRegex'
import * as linkDomainRegex from './linkDomainRegex'

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
