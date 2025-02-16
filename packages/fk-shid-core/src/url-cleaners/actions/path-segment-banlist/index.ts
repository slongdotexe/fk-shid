/**
 * Strips specific path segments from a url if it matches a given query
 * @param url Url to clean
 * @param redListRegex List of path segment regex queries to strip if matched
 */
export const pathSegmentBanList = (
  url: URL,
  redListRegex: RegExp[] | string[]
): URL => {
  const cleanedUrl = redListRegex.reduce<URL>((acc, pattern) => {
    const isStringPattern = typeof pattern === 'string'
    if (isStringPattern) {
      if (!pattern.startsWith('/')) {
        const cleanedPath = acc.pathname.replace(
          new RegExp(`/${pattern}([^/])?`),
          ''
        )
        acc.pathname = cleanedPath
      }

      const cleanedPath = acc.pathname.replace(new RegExp(pattern), '')
      acc.pathname = cleanedPath
      return acc
    }

    const cleanedPath = acc.pathname.replace(pattern, '')
    acc.pathname = cleanedPath
    return acc
  }, new URL(url))

  if (!cleanedUrl.pathname) {
    cleanedUrl.pathname = '/'
  }

  return cleanedUrl
}
