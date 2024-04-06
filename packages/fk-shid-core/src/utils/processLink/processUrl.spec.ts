import { mergedVendorRegexes } from '../../regex'
import { vendorLinkDomainRegex } from '../../regex/linkDomainRegex'

import { processUrl } from './index'

describe('processLink', () => {
  it('should return a processed link when both the link domain and resource segment are covered by regex', () => {
    const url = new URL('https://www.instagram.com/whatsonot/p/C5H847pO30-')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- temp
    const result = processUrl(vendorLinkDomainRegex, mergedVendorRegexes, url)
    // console.log(result)
  })

  it.skip('should return null when a processed link is not covered by any domain matchers', () => {
    throw new Error('implement')
  })

  it.skip('should return null when a processed link is not covered by resource matchers', () => {
    throw new Error('implement')
  })

  it.skip('should throw an error when a vendor has been matched but that vendor does not have any resource matchers', () => {
    throw new Error('implement')
  })
})
