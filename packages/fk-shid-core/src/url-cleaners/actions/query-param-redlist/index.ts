/**
 * Retains the query string, removing only the specifically red listed parameters
 * @param url Url to clean
 * @param redList  List of parameters to remove
 */
export const queryParamBanList = (url: URL, redList: string[]) => {
  const cleanedUrl = new URL(url)
  const params = new URLSearchParams(cleanedUrl.search)
  const redListSet = new Set(redList)
  // Remove all parameters that are not in the green list
  for (const param of Array.from(params.keys())) {
    if (redListSet.has(param)) {
      params.delete(param)
    }
  }

  cleanedUrl.search = params.toString()
  return cleanedUrl
}
