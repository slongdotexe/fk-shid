export const canonicalExtractor = (regexes: RegExp[], resource: string) => {
  for (const regex of regexes) {
    const match = resource.match(regex)
    if (match) {
      return match[0]
    }
  }
  return null
}
