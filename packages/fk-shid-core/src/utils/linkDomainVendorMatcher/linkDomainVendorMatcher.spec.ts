import { linkDomainVendorMatcher } from './index'

describe('linkDomainRegexMatcher', () => {
  const somewhereVendorTuple: [string, RegExp[]][] = [
    ['some-vendor', [/^(www.)?(somewhere\.[a-z.]{2,}).*$/i]],
  ]
  const somewhereUrl = 'www.somewhere.com.au'
  it('Should return the vendor, domain and `has3WSubdomain` when provided', () => {
    expect(linkDomainVendorMatcher(somewhereVendorTuple, somewhereUrl)).toEqual(
      {
        vendor: 'some-vendor',
        domain: 'somewhere.com.au',
        has3WSubdomain: true,
      }
    )
  })

  it('Should return the vendor, domain and `has3WSubdomain` when provided', () => {
    expect(
      linkDomainVendorMatcher(somewhereVendorTuple, 'somewhere.com.au')
    ).toEqual({
      vendor: 'some-vendor',
      domain: 'somewhere.com.au',
      has3WSubdomain: false,
    })
  })

  it("Should return null when provided a domain string that doesn't match the regex", () => {
    expect(
      linkDomainVendorMatcher(
        [['some-vendor', [/^www\.?somewhere\.[a-z.]{2,}.*$/i]]],
        'www.some-different-domain.com'
      )
    ).toEqual(null)
  })
})
