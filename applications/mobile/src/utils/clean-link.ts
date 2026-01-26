import {
  matchUrlActionObject,
  runUrlActions,
  urlActionsList,
  IUrlDomainActionObject,
} from 'fk-shid-core'

const DEFAULT_ACTIONS: IUrlDomainActionObject = {
  actions: [{ type: 'stripQueryString', params: null }],
  name: 'DEFAULT',
  domainPattern: '',
}

export interface LinkCleaningResult {
  link: string | null
  error: string | null
  fallbackCleaning: boolean
}

const createUrlObject = (link: string | null) => {
  if (link === null) return null
  try {
    return new URL(link)
  } catch (error) {
    return null
  }
}

export const cleanLink = (link: string | null): LinkCleaningResult => {
  const urlLink = createUrlObject(link)
  if (urlLink === null) {
    return {
      link: null,
      error: 'Invalid link provided',
      fallbackCleaning: false,
    }
  }

  const matchedActionsObject = matchUrlActionObject(urlLink, urlActionsList)

  if (matchedActionsObject === null) {
    const cleanedLink = runUrlActions(urlLink, DEFAULT_ACTIONS.actions)
    return {
      link: cleanedLink.toString(),
      fallbackCleaning: true,
      error: null,
    }
  }

  const cleanedLink = runUrlActions(urlLink, matchedActionsObject.actions)
  return {
    link: cleanedLink.toString(),
    fallbackCleaning: false,
    error: null,
  }
}
