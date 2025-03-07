import { getTLDishHostPattern, getTLDStrictHostPattern } from '../../regex/util'
import { pathSegmentBanList } from '../actions/path-segment-banlist'
import { queryParamBanList } from '../actions/query-param-banlist'
import { queryParamGreenList } from '../actions/query-param-greenlist'
import { stripQueryString } from '../actions/strip-query-string'
import {
  IUrlDomainActionObject,
  TDomainPattern,
  TUrlActions,
} from '../actions/types'

export const domainMatchersMap = {
  TLDish: getTLDishHostPattern,
  TLDstrict: getTLDStrictHostPattern,
}

export const linkActionMap = {
  stripQueryString,
  queryParamBanList,
  queryParamGreenList,
  pathSegmentBanList,
}

const checkDomainPattern = (url: URL, domainPattern: TDomainPattern) => {
  const isStaticMatcher = typeof domainPattern === 'string'

  if (isStaticMatcher) {
    const regexPattern = new RegExp(domainPattern)
    return regexPattern.test(url.hostname)
  }
  const domainMatcherGetter = domainMatchersMap[domainPattern.type]
  const domainMatcher = domainMatcherGetter(domainPattern.pattern)

  return domainMatcher.test(url.hostname)
}

export const matchUrlActionObject = (
  url: URL,
  actionsList: IUrlDomainActionObject[]
) => {
  for (const urlAction of actionsList) {
    const match = checkDomainPattern(
      url,
      urlAction.domainPattern as TDomainPattern
    )
    if (match) {
      return urlAction
    }
  }
  return null
}

export const runUrlActions = (url: URL, urlActions: TUrlActions[]) => {
  const outputUrl = urlActions.reduce((acc, urlAction) => {
    const urlActionHandler = linkActionMap[urlAction.type]

    const actionResult = urlActionHandler(acc, urlAction.params ?? [])
    // eslint-disable-next-line no-param-reassign -- Reducer
    acc = actionResult
    return acc
  }, new URL(url))
  return outputUrl
}
