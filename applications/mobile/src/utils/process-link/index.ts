import { ShareIntent } from 'expo-share-intent'

import { Rule, rules } from '../../link-matchers'

export function processShareIntentLink(shareIntent: ShareIntent) {
  if (!shareIntent.webUrl)
    return {
      link: null,
      error: 'No link',
    }

  return processLinkCleaning(shareIntent.webUrl)
}

export const processLinkCleaning = (link: string) => {
  try {
    const url = new URL(link)
    const strippedQuery = new URL(`https://${url.host}${url.pathname}`)
    const matcherResult = runMatcherRules(url)
    const result = matcherResult
      ? matcherResult.toString()
      : strippedQuery.toString()

    return {
      link: result,
      error: null,
    }
  } catch (error) {
    console.log({ error })
    return {
      link: null,
      error: 'Error processing link',
    }
  }
}

export const removeRule = (url: URL, ruleMatch: Rule) => {
  console.log({
    ruleMatch,
  })
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
  console.log({ result })
  return result
}
