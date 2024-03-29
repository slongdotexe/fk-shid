import * as linkDomainRegex from './index'

const matchingFixtureData = {
  amazon: ['www.amazon.com.au', 'www.amazon.co.uk', 'www.amazon.ca'],
  instagram: ['www.instagram.com'],
}

const nonMatchingFixtureData = ['www.shinystat.com', 'shinystat.com']

const testlinkDomainRegex = (
  regexQueries: RegExp[],
  matching: string[],
  nonMatching: string[]
) => {
  // it('should match matching fixture data', () => {
  //   matching.forEach((link) => {
  //     const match = regexQueries.some((regex) => regex.test(link))
  //     expect(match).toBe(true)
  //   })
  // })

  // it('should not match matching fixture data', () => {
  //   nonMatching.forEach((link) => {
  //     const match = regexQueries.some((regex) => regex.test(link))
  //     expect(match).toBe(false)
  //   })
  // })
  matching.forEach((link) => {
    it(`it should match ${link}`, () => {
      const match = regexQueries.some((regex) => regex.test(link))
      expect(match).toBe(true)
    })
  })

  nonMatching.forEach((link) => {
    it(`it should not match ${link}`, () => {
      const match = regexQueries.some((regex) => regex.test(link))
      expect(match).toBe(false)
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
