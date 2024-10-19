import { vendorLinkDomainRegex, LinkDomainRegexVendors } from './index'

const matchingFixtureData = {
  amazon: ['amazon.com.au', 'amazon.co.uk', 'amazon.ca', 'amazon.com'],
  facebook: ['facebook.com', 'facebook.com.au', 'facebook.ca'],
  instagram: ['instagram.com'],
  youtube: ['youtube.com'],
  youtubeShortener: ['youtu.be'],
}

const nonMatchingFixtureData = ['shinystat.com']

const testLinkDomainRegex = (
  regexQueries: RegExp[],
  matching: string[],
  nonMatching: string[]
) => {
  matching.forEach((link) => {
    it(`it should match ${link}`, () => {
      const plainMatch = regexQueries.some((regex) => regex.test(link))
      const withPrefixMatch = regexQueries.some((regex) =>
        regex.test(`www.${link}`)
      )
      expect(plainMatch).toBe(true)
      expect(withPrefixMatch).toBe(true)
    })
  })

  nonMatching.forEach((link) => {
    it(`it should not match ${link}`, () => {
      const noPlainMatches = regexQueries.every((regex) => !regex.test(link))
      const noPrefixedMatches = regexQueries.every(
        (regex) => !regex.test(`www.${link}`)
      )
      expect(noPlainMatches).toBe(true)
      expect(noPrefixedMatches).toBe(true)
    })
  })
}

describe('Generated link domain regex tests', () => {
  const vendorKeys = Object.keys(vendorLinkDomainRegex)
  vendorKeys.forEach((vendor) => {
    describe(vendor, () => {
      testLinkDomainRegex(
        vendorLinkDomainRegex[vendor as LinkDomainRegexVendors],
        matchingFixtureData[vendor as LinkDomainRegexVendors],
        nonMatchingFixtureData
      )
    })
  })
})
