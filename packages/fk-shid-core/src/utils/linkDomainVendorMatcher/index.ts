export type LinkDomainMatchers = Record<string, RegExp[]>

export const linkDomainVendorMatcher = (
  matchers: LinkDomainMatchers,
  linkHost: string
) => {
  for (const [vendor, regexes] of Object.entries(matchers)) {
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
