import { pathSegmentBanList } from './index'

describe('pathSegmentBanList', () => {
  it('should remove segments that match the regex', () => {
    const url = new URL('http://example.com/foo/bar/baz')
    const redListRegex = [/\/bar/]
    const result = pathSegmentBanList(url, redListRegex)
    expect(result.toString()).toBe('http://example.com/foo/baz')
  })

  it('should remove multiple segments that match the regex', () => {
    const url = new URL('http://example.com/foo/bar/baz/qux')
    const redListRegex = [/\/bar/, /\/qux/]
    const result = pathSegmentBanList(url, redListRegex)
    expect(result.toString()).toBe('http://example.com/foo/baz')
  })

  it('should not remove segments that do not match the regex', () => {
    const url = new URL('http://example.com/foo/bar/baz')
    const redListRegex = [/\/qux/]
    const result = pathSegmentBanList(url, redListRegex)
    expect(result.toString()).toBe('http://example.com/foo/bar/baz')
  })

  it('should handle an empty regex list', () => {
    const url = new URL('http://example.com/foo/bar/baz')
    const redListRegex: RegExp[] = []
    const result = pathSegmentBanList(url, redListRegex)
    expect(result.toString()).toBe('http://example.com/foo/bar/baz')
  })

  it('should handle an empty path', () => {
    const url = new URL('http://example.com/')
    const redListRegex = [/\/foo/]
    const result = pathSegmentBanList(url, redListRegex)
    expect(result.toString()).toBe('http://example.com/')
  })

  it('should handle a URL with no path', () => {
    const url = new URL('http://example.com')
    const redListRegex = [/\/foo/]
    const result = pathSegmentBanList(url, redListRegex)
    expect(result.toString()).toBe('http://example.com/')
  })

  it('should handle string parameters', () => {
    const url = new URL('http://example.com/foo/bar/baz/qux')
    const redListRegex = ['bar', 'qux']
    const result = pathSegmentBanList(url, redListRegex)
    expect(result.toString()).toBe('http://example.com/foo/baz')
  })
})
