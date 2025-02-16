/**
 * Strips the entire query string from a given URL and returns the cleaned URL
 * @param url The URL to strip the query string from
 */
export const stripQueryString = (url: URL): URL => {
  const cleanedUrl = new URL(url)
  cleanedUrl.search = ''
  return cleanedUrl
}
