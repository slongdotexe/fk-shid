import { linkDomainVendorMatcher } from './index'

describe('linkDomainRegexMatcher', () => {
  it('Should return the domain when provided a domain string and regex that match', () => {
    expect(
      linkDomainVendorMatcher(
        [['some-vendor', [/^www\.?somewhere\.[a-z.]{2,}.*$/i]]],
        'www.somewhere.com.au'
      )
    ).toEqual({
      vendor: 'some-vendor',
      domain: 'www.somewhere.com.au',
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
