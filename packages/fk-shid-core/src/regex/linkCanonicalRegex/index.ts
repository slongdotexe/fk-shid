import { pathAfterSegmentValue, numberOfSegments } from '../util/canonicalUtils'

// Amazon
export const amazon = [numberOfSegments(3)] // Product, e.g /Some-Product-for-something-M358TF/dp/PR0DUC7ID

const getPathSegmentPattern = () => {
  return `(?:\/[^\/]+)`
}

const getLiteralSegmentPattern = (literalValue: string) => {
  return `\/${literalValue}`
}

export const facebook = [
  pathAfterSegmentValue('reel'),
  new RegExp(
    [
      getLiteralSegmentPattern('groups'),
      getPathSegmentPattern(),
      getLiteralSegmentPattern('permalink'),
      getPathSegmentPattern(),
    ].join('')
  ),
]

// Instagram
export const instagram = [
  pathAfterSegmentValue('p', false), // Post
  pathAfterSegmentValue('reel', false), // Reel
]

// YouTube
export const youtube = [numberOfSegments(1), pathAfterSegmentValue('shorts')]
export const youtubeShortened = []

export const vendorLinkCanonicalRegex = {
  amazon,
  facebook,
  instagram,
  youtube,
  // 'you.be': youtubeShortened,
}

export type CanonicalRegexVendors = keyof typeof vendorLinkCanonicalRegex
