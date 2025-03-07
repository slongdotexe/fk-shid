/**
 * Strips the query string, retaining only the specifically green listed parameters
 * @param url Url to clean
 * @param greenList List of parameters to keep
 * @returns The cleaned URL with only the green listed parameters
 */
export const queryParamGreenList = (url: URL, greenList: string[]): URL => {
  const cleanedUrl = new URL(url)
  const params = new URLSearchParams(cleanedUrl.search)
  const greenListSet = new Set(greenList)

  // Remove all parameters that are not in the green list
  for (const param of Array.from(params.keys())) {
    if (!greenListSet.has(param)) {
      params.delete(param)
    }
  }

  cleanedUrl.search = params.toString()
  return cleanedUrl
}
