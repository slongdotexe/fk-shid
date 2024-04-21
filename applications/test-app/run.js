const fs = require('fs')

const theme = require('./theme.json')

const colorRegex = /^#[0-9a-fA-F]{6}$/

const sizeRegex = /^\d\.\d{1,3}rem$/

const fineSize = /^\dpx$/

const degreesRegex = /^\d{1,3}deg$/

const opacityRegex = /^0.?\d{1,2}/

const primitiveGreenList = [
  'animation',
  'blur',
  'boxShadow',
  'borderRadius',
  'brightness',
  'colors',
  'cursor',
  'fontSize',
  'fontWeight',
  'hueRotate',
  'keyframes',
  'letterSpacing',
  'lineHeight',
  'opacity',
  'size',
]

const colorCachedKeys = [
  'accentColor',
  'backgroundColor',
  'borerColor',
  'boxShadowColor',
  'fill',
  'gradientColorStops',
  'outlineColor',
  'placeholderColor',
  'ringColor',
  'ringOffsetColor',
  'stroke',
  'textColor',
  'testDecorationColor',
]

const primitivesSet = new Set(primitiveGreenList)

const processPrimitivePaths = (primitivesPath, parentPath = '') => {
  const flat = Object.entries(primitivesPath).reduce((acc, [key, value]) => {
    const isString = typeof value === 'string'
    if (isString) {
      const keyPath = parentPath.concat(key)

      return [...acc, [keyPath, value]]
    }
    const parentKeyPath = parentPath.concat(`${key}.`)

    return [...acc, ...processPrimitivePaths(value, parentKeyPath)]
  }, [])
  return flat
}

const splitColorTokens = (tokens) => {
  const splitTokens = Object.entries(tokens).reduce((acc, [key, themePath]) => {
    if (colorCachedKeys.includes(key)) {
      return { ...acc, [key]: '{colorCache}' }
    }
    return { ...acc, [key]: themePath }
  }, {})
  // console.log(splitTokens)
  return splitTokens
}

/**
 *
 * @param {object} tokenPath
 * @param {Map} reversePrimitiveCache
 * @param {string} parentPath
 */
const replacesCachedPrimitives = (
  tokenPath,
  reversePrimitiveCache,
  parentPath = '',
  originalTokens = tokenPath
) => {
  const tokenized = Object.entries(tokenPath).reduce(
    (acc, [tokenKey, tokenValue]) => {
      const isObject = typeof tokenValue === 'object'
      if (isObject) {
        const path = parentPath.concat(`${tokenKey}.`)
        return {
          ...acc,
          [tokenKey]: replacesCachedPrimitives(
            tokenValue,
            reversePrimitiveCache,
            path,
            originalTokens
          ),
        }
      }
      const cachedPrimitiveEntry = reversePrimitiveCache.get(tokenValue)
      if (!cachedPrimitiveEntry) {
        return {
          ...acc,
          [tokenKey]: tokenValue,
        }
      }
      const { index: cacheIndex } = cachedPrimitiveEntry
      return {
        ...acc,
        [tokenKey]: `{{primitiveCache[${cacheIndex}]}}`,
      }
    },
    {}
  )

  return tokenized
}

const dynamicCacheThemeKeys = (tokenizedTheme) => {
  const rootKeysCache = Object.entries(tokenizedTheme).reduce(
    (mapAcc, [rootThemeKey, rootThemeKeyValue]) => {
      const stringThemeVal = JSON.stringify(rootThemeKeyValue)
      if (mapAcc.has(stringThemeVal)) {
        const currentVal = mapAcc.get(stringThemeVal)
        mapAcc.set(stringThemeVal, {
          ...currentVal,
          keys: [...currentVal.keys, rootThemeKey],
        })
        return mapAcc
      }
      mapAcc.set(stringThemeVal, {
        themeData: rootThemeKeyValue,
        keys: [rootThemeKey],
      })
      return mapAcc
    },
    new Map()
  )
  const overOne = Array.from(rootKeysCache.values()).filter((themeEntry) => {
    const { keys } = themeEntry
    return keys.length > 1
  })
  return overOne
}

const writeThemeFile = (
  tokenizedTokens,
  primitiveCache,
  cachedRootThemeValues
) => {
  const cacheHead = []
  cachedRootThemeValues.forEach((cachedValue, index) => {
    const { keys, themeData } = cachedValue
    cacheHead.push(`
      const rootCacheData${index} = ${JSON.stringify(themeData)}
    `)
    keys.forEach((key) => {
      // eslint-disable-next-line no-param-reassign -- --
      tokenizedTokens[key] = `{{rootCacheData${index}}}`
    })
  })
  const arrayPrimitiveCache = Object.values(primitiveCache)
  const file = `
  const primitiveCache = ${JSON.stringify(arrayPrimitiveCache)}


  ${cacheHead.join('\n')}

  const tokens = ${JSON.stringify(tokenizedTokens)}

  `

  let cleanedFile = file.replace(/"{{/g, '')
  cleanedFile = cleanedFile.replace(/}}"/g, '')
  fs.writeFileSync('./themeFile.js', cleanedFile)
}

const processTheme = () => {
  const themeValues = Object.entries(theme.theme).reduce(
    (acc, [key, value]) => {
      if (!primitivesSet.has(key)) {
        return {
          primitives: acc.primitives,
          tokens: { ...acc.tokens, [key]: value },
        }
      }
      return {
        primitives: { ...acc.primitives, [key]: value },
        tokens: acc.tokens,
      }
    },
    {
      primitives: {},
      tokens: {},
    }
  )

  /**
   * @type {[string,string][]}
   */
  const flattenedTheme = processPrimitivePaths(themeValues.primitives)

  const primitives = flattenedTheme.reduce(
    (acc, [themeKey, themeValue]) => ({
      ...acc,
      [themeKey]: themeValue,
    }),
    {}
  )
  const reverseCache = new Map(
    flattenedTheme.map(([themeKey, themeValue], index) => [
      themeValue,
      {
        themeKey,
        themeValue,
        index,
      },
    ])
  )

  const tokenizedTokens = replacesCachedPrimitives(
    themeValues.tokens,
    reverseCache
  )
  const cachedRootKeys = dynamicCacheThemeKeys(tokenizedTokens)

  writeThemeFile(tokenizedTokens, primitives, cachedRootKeys)
}
processTheme()
