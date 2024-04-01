import * as linkDomainRegex from './index'

const matchingFixtureData = {
  amazon: ['amazon.com.au', 'amazon.co.uk', 'amazon.ca'],
  instagram: ['instagram.com'],
}

const nonMatchingFixtureData = ['shinystat.com', 'shinystat.com']

const testlinkDomainRegex = (
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

describe('Link domain regex tests', () => {
  describe('amazon', () => {
    testlinkDomainRegex(
      linkDomainRegex.amazon,
      matchingFixtureData.amazon,
      nonMatchingFixtureData
    )
  })
  describe('instagram', () => {
    testlinkDomainRegex(
      linkDomainRegex.instagram,
      matchingFixtureData.instagram,
      nonMatchingFixtureData
    )
  })
})
