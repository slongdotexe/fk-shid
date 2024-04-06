/**
 * Return an escaped pattern for consumption by a Regex constructor etc.
 * @param pattern The pattern to escape for Regex literals
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions#escaping Hat tip}.
 */
export const getEscapedPattern = (pattern: string) => {
  return pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

/**
 * Gets a pattern to match TLD-ish strings. thing: (thing.com, thing.co.uk thing.something, www.thing.com) with `domain` as a literal in the pattern.
 * This will match things like `somewhere.com.au.some.where.else` - Use something else if you need stricter validation.
 * @param domain  The domain with no protocol, `wwww` or TLD segments, e.g. `somewhere` for `somewhere.com`
 * @returns A regex pattern, e.g. for `somewhere` - `/^(?:www.)?(somewhere.[a-z.]{2,}$)/`
 */
export const getTLDishHostPattern = (domain: string) => {
  const pattern = `^(www.)?(${getEscapedPattern(domain)}\.[a-z.]{2,}$)`
  return new RegExp(pattern)
}

/**
 * Gets a pattern to match an exact TLD hostname with or without `www`, thing: (www.thing.com, thing.com)
 * @param domain The domain with no protocol or `www` segments. Should include TLD segments, e.g `somewhere.com` for `somewhere.com`
 * @returns A Regex pattern e.g. for `somewhere.com:` - `/^(?:www.)?(somewhere\.com$)/`
 */
export const getTLDStrictHostPattern = (domain: string) => {
  const pattern = `^(www.)?(${getEscapedPattern(domain)}$)`
  return new RegExp(pattern)
}
