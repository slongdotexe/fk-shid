export const amazon = [/^(?:(?:https?:\/\/)?(?:www\.)?)?amazon\.[a-z.]{2,}.*$/i]

// export const instagram = [/^(http(s)?:\/\/)?www\.?instagram\.com.*$/i]
export const instagram = [/^(?:(?:https?:\/\/)?(?:www\.)?)?instagram\.com/]

export const linkDomainRegex = {
  amazon,
  instagram,
}

export type LinkDomainRegexVendors = keyof typeof linkDomainRegex
