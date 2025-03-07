import { queryParamBanList } from './index'

describe('queryParamBanList', () => {
  it('should remove only the red listed parameters', () => {
    const url = new URL(
      'https://example.com/path?name=value&remove=this&keep=that'
    )
    const redList = ['remove']
    const cleanedUrl = queryParamBanList(url, redList)
    expect(cleanedUrl.toString()).toBe(
      'https://example.com/path?name=value&keep=that'
    )
  })

  it('should retain all parameters if red list is empty', () => {
    const url = new URL(
      'https://example.com/path?name=value&remove=this&keep=that'
    )
    const redList: string[] = []
    const cleanedUrl = queryParamBanList(url, redList)
    expect(cleanedUrl.toString()).toBe(
      'https://example.com/path?name=value&remove=this&keep=that'
    )
  })

  it('should remove all parameters if all are in the red list', () => {
    const url = new URL(
      'https://example.com/path?name=value&remove=this&keep=that'
    )
    const redList = ['name', 'remove', 'keep']
    const cleanedUrl = queryParamBanList(url, redList)
    expect(cleanedUrl.toString()).toBe('https://example.com/path')
  })

  it('should handle URLs with no query parameters correctly', () => {
    const url = new URL('https://example.com/path')
    const redList = ['name']
    const cleanedUrl = queryParamBanList(url, redList)
    expect(cleanedUrl.toString()).toBe('https://example.com/path')
  })

  it('should handle URLs with hash fragments correctly', () => {
    const url = new URL('https://example.com/path?name=value#section')
    const redList = ['name']
    const cleanedUrl = queryParamBanList(url, redList)
    expect(cleanedUrl.toString()).toBe('https://example.com/path#section')
  })

  // it('should handle URLs with duplicate query parameters correctly', () => {
  //   const url = new URL('https://example.com/path?name=value&name=another')
  //   const redList = ['name']
  //   const cleanedUrl = queryParamBanList(url, redList)
  //   expect(cleanedUrl.toString()).toBe('https://example.com/path')
  // })

  // it('should handle case sensitivity in query parameters', () => {
  //   const url = new URL('https://example.com/path?Name=value&name=another')
  //   const redList = ['name']
  //   const cleanedUrl = queryParamBanList(url, redList)
  //   expect(cleanedUrl.toString()).toBe('https://example.com/path?Name=value')
  // })

  // it('should handle special characters in query parameters', () => {
  //   const url = new URL('https://example.com/path?name=value&special=%40%23%24')
  //   const redList = ['special']
  //   const cleanedUrl = queryParamBanList(url, redList)
  //   expect(cleanedUrl.toString()).toBe('https://example.com/path?name=value')
  // })
})
