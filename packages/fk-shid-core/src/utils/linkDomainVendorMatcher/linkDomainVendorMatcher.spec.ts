import { LinkDomainMatchers, linkDomainVendorMatcher } from './index'

describe('linkDomainRegexMatcher', () => {
  const somewhereVendor: LinkDomainMatchers = {
    'some-vendor': [/^(www.)?(somewhere\.[a-z.]{2,}).*$/i],
  }
  const somewhereUrl = 'www.somewhere.com.au'
  it('Should return the vendor, domain and `has3WSubdomain` when provided', () => {
    expect(linkDomainVendorMatcher(somewhereVendor, somewhereUrl)).toEqual({
      vendor: 'some-vendor',
      domain: 'somewhere.com.au',
      has3WSubdomain: true,
    })
  })

  it('Should return the vendor, domain and `has3WSubdomain` when provided', () => {
    expect(
      linkDomainVendorMatcher(somewhereVendor, 'somewhere.com.au')
    ).toEqual({
      vendor: 'some-vendor',
      domain: 'somewhere.com.au',
      has3WSubdomain: false,
    })
  })

  it("Should return null when provided a domain string that doesn't match the regex", () => {
    expect(
      linkDomainVendorMatcher(somewhereVendor, 'www.some-different-domain.com')
    ).toEqual(null)
  })
})
