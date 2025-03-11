export interface IQueryParamGreenListAction {
  type: 'queryParamGreenList'
  params: string[]
}
export interface IQueryParamBanListAction {
  type: 'queryParamBanList'
  params: string[]
}

export interface IPathSegmentBanListAction {
  type: 'pathSegmentBanList'
  params: string[]
}

export interface IStripQueryStringAction {
  type: 'stripQueryString'
  params: null
}

export type TDomainMatchPatterns = 'TLDish' | 'TLDstrict'

export interface IDomainPatternAction {
  type: TDomainMatchPatterns
  pattern: string
}

export type TUrlActions =
  | IQueryParamGreenListAction
  | IQueryParamBanListAction
  | IPathSegmentBanListAction
  | IStripQueryStringAction

export type TDomainPattern = IDomainPatternAction | string

export interface IUrlDomainActionObject {
  name: string
  domainPattern: TDomainPattern
  actions: TUrlActions[]
}
