import { numberOfSegments, pathAfterSegmentValue } from './index'

describe('Canonical regex utils', () => {
  describe('numberOfSegments', () => {
    it('Should match 1 URL pathname segment', () => {
      const segments = '/one'
      const pattern = numberOfSegments(1)
      expect(pattern.test(segments)).toBe(true)
    })
    it('Should match 3 URL pathname segments', () => {
      const segments = '/one/two'
      const pattern = numberOfSegments(2)
      expect(pattern.test(segments)).toBe(true)
    })
    it('Should match 200 URL pathname segments', () => {
      const segments = ['', ...new Array(200).keys()].join('/')
      const pattern = numberOfSegments(200)
      expect(pattern.test(segments)).toBe(true)
    })
    it('Should only match if pattern is at start and end of the string by default', () => {
      const segments = 'some/one/two'
      const pattern = numberOfSegments(1)
      expect(pattern.test(segments)).toBe(false)
    })
    it('Should match anywhere', () => {
      const segments = 'three/one/two'
      const pattern = numberOfSegments(1, false, false)
      expect(pattern.test(segments)).toBe(true)
    })
    it('Should match only if the pattern begins is at the start', () => {
      const segments = '/one/two'
      const pattern = numberOfSegments(1, true, false)
      expect(pattern.test(segments)).toBe(true)
    })
    it('Should match only if the pattern is at the end', () => {
      const segments = '/two/one'
      const pattern = numberOfSegments(1, false, true)
      expect(pattern.test(segments)).toBe(true)
    })
  })
  describe('pathAfterSegmentValue', () => {
    it('Should match a path literal value and the segment after it', () => {
      const segments = '/segment/something-else'
      const pattern = pathAfterSegmentValue('segment')
      expect(pattern.test(segments)).toBe(true)
    })
    it('Should not match a different path literal value and the segment after it', () => {
      const segments = '/segment/something-else'
      const pattern = pathAfterSegmentValue('not-segment')
      expect(pattern.test(segments)).toBe(false)
    })
    it('Should only match if pattern is at start and end of by default', () => {
      const segments = '/segment/something-else'
      const pattern = pathAfterSegmentValue('segment')
      expect(pattern.test(segments)).toBe(true)
    })
    it('Should match anywhere', () => {
      const segments = '/one/segment/something-else/two'
      const pattern = pathAfterSegmentValue('segment', false, false)
      expect(pattern.test(segments)).toBe(true)
    })
    it('Should match only if the pattern is at the start', () => {
      const segments = '/segment/something-else/two'
      const pattern = pathAfterSegmentValue('segment', true, false)
      expect(pattern.test(segments)).toBe(true)
    })
    it('Should match only if the pattern is at the end', () => {
      const segments = '/one/segment/something-else'
      const pattern = pathAfterSegmentValue('segment', false, true)
      expect(pattern.test(segments)).toBe(true)
    })
  })
})
