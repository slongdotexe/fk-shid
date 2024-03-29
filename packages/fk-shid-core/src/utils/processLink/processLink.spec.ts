import { linkCanonicalRegex } from '../../regex'
import { segmentAfterSegmentValue } from '../../regex/linkCanonicalRegex'
import { linkDomainRegex } from '../../regex/linkDomainRegex'

import { processLink } from './index'

describe('processLink', () => {
  it('should return a processed link when both the link domain and resource segment are covered by regex', () => {
    const result = processLink(
      linkDomainRegex,
      {
        amazon: { canonicalMatchers: linkCanonicalRegex.amazon },
        instagram: { canonicalMatchers: linkCanonicalRegex.instagram },
      },
      'https://www.instagram.com/whatsonot/p/C5H847pO30-/'
    )
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
