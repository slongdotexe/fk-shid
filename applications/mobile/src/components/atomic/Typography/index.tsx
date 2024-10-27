import styled from '@emotion/native'
import { Theme } from '@emotion/react'
import { forwardRef } from 'react'
import { Text } from 'react-native'

import { handleStyleOverrides } from '../../../utils/handle-style-overrides'
import { BaseCustomComponentProps } from '../../types'

export type TTypographySizes =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'

export type TTypographyFamilies = {
  body: 'sans'
  caption: 'sans'
  heading: 'serif'
}
export type TTypographyFamily = keyof TTypographyFamilies

export type TTypographyWeight = {
  normal: '400'
  medium: '500'
  semibold: '600'
  bold: '700'
  extrabold: '800'
}
export type TTypographyWeights = keyof TTypographyWeight

export type TVariants =
  | 'bodySm'
  | 'bodyLg'
  | 'headingSm'
  | 'headingMd'
  | 'headingLg'

export interface TypographyCustomProps extends BaseCustomComponentProps {
  variant?: TVariants
  size?: TTypographySizes
  family?: keyof TTypographyFamilies
  weight?: keyof TTypographyWeight
}

interface RemapSizes extends Partial<Record<TTypographySizes, string>> {}

const remapKeys: RemapSizes = {
  md: 'base',
} as const

const getSize = (size: TTypographySizes, theme: Theme): number => {
  const remappedSize = (remapKeys[size] ?? size) as keyof Theme['fontSize']
  const fontSize = theme.fontSize[remappedSize] ?? theme.fontSize.base // Fallback to base size
  return theme.spacing(fontSize)
}

const getLineHeight = (size: TTypographySizes, theme: Theme): number => {
  const remappedSize = (remapKeys[size] ?? size) as keyof Theme['lineHeight']
  const lineHeight = theme.lineHeight[remappedSize] ?? theme.lineHeight.base // Fallback to base size
  return theme.spacing(lineHeight)
}

const fontFamilyMap = {
  body: 'sans',
  caption: 'sans',
  heading: 'serif',
} as const
const getFontFamily = (
  family: keyof TTypographyFamilies,
  theme: Theme
): string => {
  const remap = fontFamilyMap[family] ?? 'sans'
  return theme.fontFamily[remap]
}

const fontWeightMap: TTypographyWeight = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
} as const

const getFontWeight = (weight: keyof TTypographyWeight, theme: Theme) => {
  const fontWeight = theme.fontWeight[
    weight
  ] as (typeof fontWeightMap)[keyof typeof fontWeightMap]

  return fontWeight
}

const StyledTypography = styled.Text<TypographyCustomProps>(
  ({ theme, size, family, weight, styles }) => {
    return {
      fontFamily: getFontFamily(family ?? 'body', theme),
      fontSize: getSize(size ?? 'md', theme),
      lineHeight: getLineHeight(size ?? 'md', theme),
      fontWeight: getFontWeight(weight ?? 'normal', theme),
      color: theme.textColor.gray[200],
      ...handleStyleOverrides(styles, theme),
    }
  }
)

export interface TypographyProps
  extends React.ComponentPropsWithoutRef<typeof Text>,
    Partial<TypographyCustomProps> {}

const Typography = forwardRef<React.ElementRef<typeof Text>, TypographyProps>(
  (props, ref) => {
    return <StyledTypography ref={ref} {...props} />
  }
)

Typography.displayName = 'Typography'

export { Typography }
