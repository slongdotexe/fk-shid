/* eslint-disable no-restricted-syntax -- I am the captain.  */
export const linkDomainVendorMatcher = (
  matchers: [string, RegExp[]][],
  linkDomain: string
) => {
  for (const [vendor, regexes] of matchers) {
    for (const regex of regexes) {
      const match = linkDomain.match(regex)
      if (match) {
        return {
          vendor,
          domain: match[0],
        }
      }
    }
  }
  return null
}
