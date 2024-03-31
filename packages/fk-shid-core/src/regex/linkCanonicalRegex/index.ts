/* eslint-disable no-useless-escape -- For Regex patterns */
export const firstPathSegmentMatcher = /(^\/[^/]+)/
export const secondSegment = /^\/(?:[^/]+)\/([^/?]+)/
export const thirdSegment = /^\/(?:[^/]+)\/(?:[^/?]+)([^/?]+)/

export const segmentAfterSegmentValue = (segmentValue: string) => {
  const regexPattern = `\/${segmentValue}\/([^/?]+)`
  return new RegExp(regexPattern)
}

export const amazon = [firstPathSegmentMatcher]

export const instagram = [segmentAfterSegmentValue('p')]

export const linkCanonicalRegex = {
  amazon,
  instagram,
}

export type CanonicalRegexVendors = keyof typeof linkCanonicalRegex
