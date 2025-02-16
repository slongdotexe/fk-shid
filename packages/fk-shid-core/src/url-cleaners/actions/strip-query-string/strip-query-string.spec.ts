import { stripQueryString } from './index'

describe('stripQueryString', () => {
  it('should remove the query string from the URL', () => {
    const url = new URL('https://example.com/path?name=value&another=value2')
    const cleanedUrl = stripQueryString(url)
    expect(cleanedUrl.toString()).toBe('https://example.com/path')
  })

  it('should return the same URL if there is no query string', () => {
    const url = new URL('https://example.com/path')
    const cleanedUrl = stripQueryString(url)
    expect(cleanedUrl.toString()).toBe('https://example.com/path')
  })

  it('should handle URLs with hash fragments correctly', () => {
    const url = new URL('https://example.com/path?name=value#section')
    const cleanedUrl = stripQueryString(url)
    expect(cleanedUrl.toString()).toBe('https://example.com/path#section')
  })

  it('should handle URLs with only query string correctly', () => {
    const url = new URL('https://example.com/?name=value')
    const cleanedUrl = stripQueryString(url)
    expect(cleanedUrl.toString()).toBe('https://example.com/')
  })

  it('should handle URLs with no path correctly', () => {
    const url = new URL('https://example.com?name=value')
    const cleanedUrl = stripQueryString(url)
    expect(cleanedUrl.toString()).toBe('https://example.com/')
  })
})
