import * as linkCanonicalRegex from './index'

const matchingFixtureData = {
  amazon: [
    '/Firewall-Appliance-Gigabit-Celeron-AES-NI/dp/B07G9NHRGQ/?_encoding=UTF8&pd_rd_w=fMQL9&content-id=amzn1.sym.0f8ee610-b659-4aa7-823c-064f1a0971f3%3Aamzn1.symc.79c255d6-0688-4760-bc39-1cacf7968323&pf_rd_p=0f8ee610-b659-4aa7-823c-064f1a0971f3&pf_rd_r=H6H1JN917RQDM3AZR7KF&pd_rd_wg=Diuya&pd_rd_r=ea1859bb-1c74-4b66-8ba3-e9c404e2929d&ref_=pd_gw_ci_mcx_mr_hp_atf_m',
    '/Firewall-Appliance-Gigabit-Celeron-AES-NI/',
  ],
  instagram: ['/p/C5FPDeGufXP'],
}

const queryOnly =
  '?arcu=nulla&sed=nisl&augue=nunc&aliquam=nisl&erat=duis&volutpat=bibendum'

const firstSegmentOnly = '/first-segment'

const firstSegmentWithQuery = `/first-segment${queryOnly}`

const nonMatchingFixtureData = {
  amazon: [queryOnly],
  instagram: [queryOnly, firstSegmentOnly, firstSegmentWithQuery],
}

const testLinkCanonicalRegex = (
  regexQueries: RegExp[],
  matching: string[],
  nonMatching: string[]
) => {
  it('should match matching fixture data', () => {
    matching.forEach((link) => {
      const match = regexQueries.some((regex) => regex.test(link))
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

describe('Link canonical regex tests', () => {
  describe('amazon', () => {
    testLinkCanonicalRegex(
      linkCanonicalRegex.amazon,
      matchingFixtureData.amazon,
      nonMatchingFixtureData.amazon
    )
  })
  describe('instagram', () => {
    testLinkCanonicalRegex(
      linkCanonicalRegex.instagram,
      matchingFixtureData.instagram,
      nonMatchingFixtureData.instagram
    )
  })
})
