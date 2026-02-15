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

const FAMILY_MAP = { body: 'sans', caption: 'sans', heading: 'serif' } as const

export const getTypographyStyle = (
  { size = 'md', weight = 'normal', family = 'body' }: TypographyCustomProps,
  theme: Theme
) => {
  const sizeKey = (
    size === 'md' ? 'base' : size
  ) as keyof Theme['typography']['fontSize']
  const familyKey = FAMILY_MAP[family]

  return {
    fontFamily: theme.typography.fontFamily[familyKey],
    fontSize: theme.spacing(theme.typography.fontSize[sizeKey]),
    lineHeight: theme.spacing(theme.typography.lineHeight[sizeKey]),
    fontWeight: theme.typography.fontWeight[weight],
    color: theme.typography.color.base,
  }
}

const StyledTypography = styled.Text<TypographyCustomProps>(
  ({ theme, size = 'md', family = 'body', weight = 'normal', styles }) => {
    const sizeKey = (
      size === 'md' ? 'base' : size
    ) as keyof Theme['typography']['fontSize']
    const familyKey = FAMILY_MAP[family]

    return {
      fontFamily: theme.typography.fontFamily[familyKey],
      fontSize: theme.spacing(theme.typography.fontSize[sizeKey]),
      lineHeight: theme.spacing(theme.typography.lineHeight[sizeKey]),
      fontWeight: theme.typography.fontWeight[weight],
      color: theme.typography.color.base,
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
