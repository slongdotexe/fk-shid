import { ShareIntent } from 'expo-share-intent'

import { Rule, rules } from '../../link-matchers'

export function processShareIntentLink(shareIntent: ShareIntent) {
  if (!shareIntent.webUrl)
    return {
      link: null,
      error: 'No link',
    }

  const link = processLinkCleaning(shareIntent.webUrl)
  return link
}

const createUrlLinks = (link: string) => {
  const url = new URL(link)
  try {
    return {
      url,
      strippedQuery: new URL(url.origin),
    }
  } catch (error) {
    console.log(error)
    return null
  }
}

export const processLinkCleaning = (link: string) => {
  const urls = createUrlLinks(link)
  if (urls === null)
    return {
      link: null,
      error: 'Error process your link, please try again.',
    }
  const { strippedQuery, url } = urls

  const matcherResult = runMatcherRules(url)
  const result = matcherResult
    ? matcherResult.toString()
    : strippedQuery.toString()

  return {
    link: result,
    error: null,
  }
}

export const removeRule = (url: URL, ruleMatch: Rule) => {
  const match = url.toString().match(ruleMatch.linkMatcher)
  if (!match?.[0]) return null
  return url.toString().replace(match[0], '')
}

export const replaceRule = (url: URL, ruleMatch: Rule) => {
  if (ruleMatch.mode !== 'replace') return null
  return url.toString().replace(ruleMatch.linkMatcher, ruleMatch.replacer)
}

const ruleMap = {
  replace: replaceRule,
  remove: removeRule,
}
export const runMatcherRules = (url: URL) => {
  const ruleMatch = Object.values(rules).find((rule) => {
    const match = rule.domainMatcher.some((pattern) => url.host.match(pattern))
    return match
  })
  if (!ruleMatch) return null
  const rule = ruleMap[ruleMatch.mode]
  const result = rule(url, ruleMatch)
  return result
}
