import { vendorLinkCanonicalRegex, CanonicalRegexVendors } from './index'

const matchingFixtureData = {
  amazon: ['/some-product-Descript-ME34-Large/dp/PR0DUC11D'],
  facebook: [
    '/reel/878972984798472', // Reel
    '/groups/112233445566/permalink/112233445566', // Group post
  ],
  instagram: [
    '/p/postId-Djasd8934bn', // Post without username segment
    '/someInstaUser/p/postId-Djasd8934bn', // Post with username segment
    '/reel/postId-Djasd8934bn', // Reel
  ],
  youtube: ['/s0mEv1d30ID', '/shorts/s0mEv1d30ID'],
}

const queryOnly =
  '?arcu=nulla&sed=nisl&augue=nunc&aliquam=nisl&erat=duis&volutpat=bibendum'

const firstSegmentOnly = '/first-segment'

const firstSegmentWithQuery = `/first-segment${queryOnly}`

const nonMatchingFixtureData = {
  amazon: [queryOnly],
  facebook: [queryOnly],
  instagram: [queryOnly, firstSegmentOnly, firstSegmentWithQuery],
  youtube: [queryOnly],
}

const testLinkCanonicalRegex = (
  regexQueries: RegExp[],
  matching: string[],
  nonMatching: string[]
) => {
  it('should match matching fixture data', () => {
    matching.forEach((link) => {
      const match = regexQueries.some((regex) => {
        return regex.test(link)
      })
      expect(match).toBe(true)
    })
  })

  it('should not match matching fixture data', () => {
    nonMatching.forEach((link) => {
      const match = regexQueries.some((regex) => regex.test(link))
      expect(match).toBe(false)
    })
  })
}

describe('Generated link canonical regex tests', () => {
  const vendorKeys = Object.keys(vendorLinkCanonicalRegex)
  vendorKeys.forEach((vendor) => {
    describe(vendor, () => {
      testLinkCanonicalRegex(
        vendorLinkCanonicalRegex[vendor as CanonicalRegexVendors],
        matchingFixtureData[vendor as CanonicalRegexVendors],
        nonMatchingFixtureData[vendor as CanonicalRegexVendors]
      )
    })
  })
})
