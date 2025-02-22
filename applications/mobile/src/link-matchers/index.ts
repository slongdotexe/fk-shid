interface BaseRule {
  domainMatcher: RegExp[]
  linkMatcher: RegExp
}

export interface ReplaceRule extends BaseRule {
  mode: 'replace'
  replacer: string
}

export interface RemoveRule extends BaseRule {
  mode: 'remove'
  replacer?: undefined
}

export type Rule = ReplaceRule | RemoveRule

export const rules: Record<string, Rule> = {
  amazon: {
    mode: 'remove',
    domainMatcher: [/'/],
    linkMatcher: /(\/ref=\S+)([/?]|$)/,
  },
  youtube: {
    mode: 'replace',
    domainMatcher: [/'/],
    linkMatcher: /(^\S+)(\?v=)(\S+)(?:[&/]|$)/,
    replacer: '$1/watch/$3',
  },
} as const
