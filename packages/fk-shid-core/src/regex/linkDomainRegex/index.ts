import { getTLDStrictHostPattern, getTLDishHostPattern } from '../util'

export const amazon = [getTLDishHostPattern('amazon')]

export const instagram = [getTLDStrictHostPattern('instagram.com')]

export const vendorLinkDomainRegex = {
  amazon,
  instagram,
}

export type LinkDomainRegexVendors = keyof typeof vendorLinkDomainRegex
