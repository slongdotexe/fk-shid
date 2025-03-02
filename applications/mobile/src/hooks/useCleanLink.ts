import {
  matchUrlActionObject,
  runUrlActions,
  urlActionsList,
} from 'fk-shid-core'
import { IUrlDomainActionObject } from 'fk-shid-core/pack/esm/url-cleaners/actions/types'
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

export const useCleanLink = (initialInput: string | null) => {
  const [linkInput, setLinkInput] = useState<string | null>(initialInput)
  const [linkCleaningResult, setLinkCleaningResult] =
    useState<LinkCleaningResult>({
      link: null,
      error: initialInput ? null : 'No link provided',
      fallbackCleaning: false,
    })

  const cleanLink = useCallback((link: string | null): LinkCleaningResult => {
    console.log(link)
    const isParsableLink = link && !URL.canParse(link)
    if (!isParsableLink) {
      return {
        link: null,
        error: 'Invalid link provided',
        fallbackCleaning: false,
      }
    }

    const urlLink = new URL(link)
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
  }, [])

  // Process the link whenever input changes
  useEffect(() => {
    const result =
      linkInput !== null
        ? cleanLink(linkInput)
        : { link: null, error: 'No link provided', fallbackCleaning: false }
    setLinkCleaningResult(result)
  }, [linkInput, cleanLink])

  const resetLinkCleaning = useCallback(() => {
    setLinkInput(null)
    setLinkCleaningResult({
      link: null,
      error: 'No link provided',
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
