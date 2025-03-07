import urlActionsList from './url-actions-list/list.json'

export * as domainMatchers from './regex/domain-matchers'
export * as linkSegmentMatchers from './regex/link-segment-matchers'
export { pathSegmentBanList } from './url-cleaners/actions/path-segment-banlist'
export { queryParamGreenList } from './url-cleaners/actions/query-param-greenlist'
export { queryParamBanList } from './url-cleaners/actions/query-param-redlist'
export { stripQueryString } from './url-cleaners/actions/strip-query-string'
export {
  domainMatchersMap,
  linkActionMap,
  matchUrlActionObject,
  runUrlActions,
} from './url-cleaners/utils/actions-runner'

export { urlActionsList }

export type {
  IDomainPatternAction,
  IPathSegmentBanListAction,
  IQueryParamBanListAction,
  IQueryParamGreenListAction,
  IStripQueryStringAction,
  IUrlDomainActionObject,
  TDomainMatchPatterns,
  TDomainPattern,
  TUrlActions,
} from './url-cleaners/actions/types'
