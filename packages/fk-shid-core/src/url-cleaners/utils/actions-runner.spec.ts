/// <reference types="jest" />

import urlActionsList from '../../url-actions-list/list.json'
import { IUrlDomainActionObject } from '../actions/types'

import { matchUrlActionObject, runUrlActions } from './actions-runner'

describe('actions-runner', () => {
  it('should match open.spotify.com and strip query string', () => {
    const url = new URL(
      'https://open.spotify.com/track/123?si=abc&utm_source=test'
    )

    const matchedActionObject = matchUrlActionObject(
      url,
      urlActionsList as IUrlDomainActionObject[]
    )

    expect(matchedActionObject).not.toBeNull()

    const cleanedUrl = runUrlActions(url, matchedActionObject!.actions)

    expect(cleanedUrl.toString()).toBe('https://open.spotify.com/track/123')
  })
})
