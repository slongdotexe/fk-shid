import * as linkCanonicalRegex from './linkCanonicalRegex'
import * as linkDomainRegex from './linkDomainRegex'

const mergedVendorRegexes = Object.entries(linkCanonicalRegex).reduce(
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

export { linkCanonicalRegex, linkDomainRegex, mergedVendorRegexes }
