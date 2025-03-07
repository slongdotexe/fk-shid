import {
  matchUrlActionObject,
  runUrlActions,
  urlActionsList,
  IUrlDomainActionObject,
} from 'fk-shid-core'
import { useState, useEffect, useCallback } from 'react'

const DEFAULT_ACTIONS: IUrlDomainActionObject = {
  actions: [{ type: 'stripQueryString', params: null }],
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

const cleanLink = (link: string | null): LinkCleaningResult => {
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

export const useCleanLink = (initialInput: string | null) => {
  const [linkInput, setLinkInput] = useState<string | null>(initialInput)
  const [linkCleaningResult, setLinkCleaningResult] =
    useState<LinkCleaningResult>({
      link: null,
      error: null,
      fallbackCleaning: false,
    })

  useEffect(() => {
    const result =
      linkInput !== null
        ? cleanLink(linkInput)
        : { link: null, error: null, fallbackCleaning: false }
    setLinkCleaningResult(result)
  }, [linkInput])

  const resetLinkCleaning = useCallback(() => {
    setLinkInput(null)
    setLinkCleaningResult({
      link: null,
      error: null,
      fallbackCleaning: false,
    })
  }, [])

  return {
    linkInput,
    linkCleaningResult,
    setLinkInput,
    resetLinkCleaning,
    cleanLink,
  }
}
