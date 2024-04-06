import { numberOfSegments } from '../../regex/util/canonicalUtils'

import { canonicalExtractor } from './index'

describe('canonicalExtractor', () => {
  it('Should return the cannonical link segment when given a resource string covered by provided regex.', () => {
    expect(canonicalExtractor([numberOfSegments(1)], '/somewhere')).toEqual(
      '/somewhere'
    )
  })

  it('Should return null when give a resource string not-covered by provided regex.', () => {
    expect(
      canonicalExtractor(
        [numberOfSegments(1)],
        '?arcu=nulla&sed=nisl&augue=nunc&aliquam=nisl&erat=duis&volutpat=bibendum'
      )
    ).toEqual(null)
  })
})
