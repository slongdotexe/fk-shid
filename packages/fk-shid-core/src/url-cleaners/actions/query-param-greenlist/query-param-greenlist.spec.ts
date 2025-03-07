import { queryParamGreenList } from './index'

describe('queryParamGreenList', () => {
  it('should retain only the green listed parameters', () => {
    const url = new URL(
      'https://example.com/path?name=value&keep=this&remove=that'
    )
    const greenList = ['keep']
    const cleanedUrl = queryParamGreenList(url, greenList)
    expect(cleanedUrl.toString()).toBe('https://example.com/path?keep=this')
  })

  it('should remove all parameters if green list is empty', () => {
    const url = new URL(
      'https://example.com/path?name=value&keep=this&remove=that'
    )
    const greenList: string[] = []
    const cleanedUrl = queryParamGreenList(url, greenList)
    expect(cleanedUrl.toString()).toBe('https://example.com/path')
  })

  it('should retain all parameters if all are in the green list', () => {
    const url = new URL(
      'https://example.com/path?name=value&keep=this&remove=that'
    )
    const greenList = ['name', 'keep', 'remove']
    const cleanedUrl = queryParamGreenList(url, greenList)
    expect(cleanedUrl.toString()).toBe(
      'https://example.com/path?name=value&keep=this&remove=that'
    )
  })

  it('should handle URLs with no query parameters correctly', () => {
    const url = new URL('https://example.com/path')
    const greenList = ['name']
    const cleanedUrl = queryParamGreenList(url, greenList)
    expect(cleanedUrl.toString()).toBe('https://example.com/path')
  })

  it('should handle URLs with hash fragments correctly', () => {
    const url = new URL('https://example.com/path?name=value#section')
    const greenList = ['name']
    const cleanedUrl = queryParamGreenList(url, greenList)
    expect(cleanedUrl.toString()).toBe(
      'https://example.com/path?name=value#section'
    )
  })
})
