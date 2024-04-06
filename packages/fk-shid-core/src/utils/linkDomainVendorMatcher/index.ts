export type LinkDomainVendorTuple = [string, RegExp[]][]

export const linkDomainVendorMatcher = (
  matchers: [string, RegExp[]][],
  linkHost: string
) => {
  for (const [vendor, regexes] of matchers) {
    for (const regex of regexes) {
      const match = linkHost.match(regex)
      if (match) {
        return {
          vendor,
          domain: match[2],
          has3WSubdomain: typeof match[1] === 'string',
        }
      }
    }
  }
  return null
}
