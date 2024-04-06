import { getTLDStrictHostPattern, getTLDishHostPattern } from '../util'

// Amazon
export const amazon = [getTLDishHostPattern('amazon')]

// Instagram
export const instagram = [getTLDStrictHostPattern('instagram.com')]

// YouTube
export const youtube = [getTLDStrictHostPattern('youtube.com')]
export const youtubeShortener = [getTLDStrictHostPattern('youtu.be')]

// Facebook
export const facebook = [getTLDishHostPattern('facebook')]

export const vendorLinkDomainRegex = {
  amazon,
  facebook,
  instagram,
  youtube,
  // 'youtube.be': youtubeShortener,
}

export type LinkDomainRegexVendors = keyof typeof vendorLinkDomainRegex
