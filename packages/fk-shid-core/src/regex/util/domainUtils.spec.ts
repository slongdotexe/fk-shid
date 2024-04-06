import {
  getEscapedPattern,
  getTLDStrictHostPattern,
  getTLDishHostPattern,
} from './index'

describe('Domain regex utils', () => {
  const testHosts = [
    'bloglovin.com',
    'mozilla.org',
    'tiny.cc',
    'mapquest.com',
    'tumblr.com',
  ]

  describe('getEscapedPattern', () => {
    it('Should escape regex characters', () => {
      const result = getEscapedPattern('somewhere.com')
      const regex = new RegExp(result)
      expect(regex).toEqual(/somewhere\.com/)
      expect(result).toBe('somewhere\\.com')
    })

    it('Should not escape non-regex characters', () => {
      const result = getEscapedPattern('jeff')
      const regex = new RegExp(result)
      expect(result).toBe('jeff')
      expect(regex).toEqual(/jeff/)
    })
  })

  describe('getTLDishHostPattern', () => {
    const somewhereRegex = getTLDishHostPattern('somewhere')
    it('Should return a pattern to match a TLDish host string', () => {
      expect(somewhereRegex).toEqual(/^(www.)?(somewhere.[a-z.]{2,}$)/)
    })

    it('Should return a pattern that matches TLD hosts with or without `www`', () => {
      expect(somewhereRegex.test('www.somewhere.com')).toBe(true)
      expect(somewhereRegex.test('somewhere.com')).toBe(true)
    })

    it('Should return a pattern that does not match if TLD segments are 1 character', () => {
      expect(somewhereRegex.test('somewhere.c')).toEqual(false)
    })

    it('Should return a pattern with several TLD segments', () => {
      expect(somewhereRegex.test('somewhere.com.au')).toEqual(true)
      expect(somewhereRegex.test('somewhere.com.au.other.more')).toEqual(true)
    })

    it('Should return a pattern that does not match if protocol is included', () => {
      const protocolMatch = somewhereRegex.test('http://somewhere.com')
      expect(protocolMatch).toBe(false)
    })

    it('Should return a pattern that does not match if resource paths or queries are included', () => {
      const pathMatch = somewhereRegex.test('somewhere.com/some/path')
      const queryMatch = somewhereRegex.test('somewhere.com?some=query')
      expect(pathMatch).toBe(false)
      expect(queryMatch).toBe(false)
    })

    it('Should return a pattern where the first capture group is the `www` subdomain if it exists', () => {
      const plainResult = 'somewhere.com'.match(somewhereRegex)
      const prefixedResult = 'www.somewhere.com'.match(somewhereRegex)
      // @ts-expect-error -- It won't be null.
      expect(prefixedResult[1]).toBe('www.')
      // @ts-expect-error -- It won't be null.
      expect(plainResult[1]).toBe(undefined)
    })

    it('Should return a pattern where the second capture group is the TLD with www stripped', () => {
      const plainResult = 'somewhere.com'.match(somewhereRegex)
      const prefixedResult = 'www.somewhere.com'.match(somewhereRegex)
      // @ts-expect-error -- It won't be null.
      expect(prefixedResult[2]).toBe('somewhere.com')
      // @ts-expect-error -- It won't be null.
      expect(plainResult[2]).toBe('somewhere.com')
    })

    it('Should work for many domains', () => {
      expect(
        testHosts.every((host) => {
          return getTLDishHostPattern(host.split('.')[0]).test(host)
        })
      ).toEqual(true)
    })
  })

  describe('getTLDStrictHostPattern', () => {
    const somewhereStrictRegex = getTLDStrictHostPattern('somewhere.com')
    it('Should return a pattern to match a strict TLD host string', () => {
      expect(somewhereStrictRegex).toEqual(/^(www.)?(somewhere\.com$)/)
    })

    it('Should return a pattern that matches TLD hosts with or without `www`', () => {
      expect(somewhereStrictRegex.test('www.somewhere.com')).toBe(true)
      expect(somewhereStrictRegex.test('somewhere.com')).toBe(true)
    })

    it('Should return a pattern that does not match if protocol is included', () => {
      const protocolMatch = somewhereStrictRegex.test('http://somewhere.com')
      expect(protocolMatch).toBe(false)
    })

    it('Should return a pattern that does not match if resource paths or queries are included', () => {
      const pathMatch = somewhereStrictRegex.test('somewhere.com/some/path')
      const queryMatch = somewhereStrictRegex.test('somewhere.com?some=query')
      expect(pathMatch).toBe(false)
      expect(queryMatch).toBe(false)
    })

    it('Should return a pattern where the first capture group is the `www` subdomain if it exists', () => {
      const plainResult = 'somewhere.com'.match(somewhereStrictRegex)
      const prefixedResult = 'www.somewhere.com'.match(somewhereStrictRegex)
      expect(prefixedResult![1]).toBe('www.')
      expect(plainResult![1]).toBe(undefined)
    })

    it('Should return a pattern where the second capture group is the TLD with www stripped', () => {
      const plainResult = 'somewhere.com'.match(somewhereStrictRegex)
      const prefixedResult = 'www.somewhere.com'.match(somewhereStrictRegex)
      expect(prefixedResult![2]).toBe('somewhere.com')
      expect(plainResult![2]).toBe('somewhere.com')
    })

    it('Should work for many domains', () => {
      expect(
        testHosts.every((host) => {
          return getTLDStrictHostPattern(host).test(host)
        })
      ).toEqual(true)
    })
  })
})
