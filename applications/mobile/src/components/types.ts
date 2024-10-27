import { ReactNativeStyle } from '@emotion/native'
import { Theme } from '@emotion/react'

export type StylesProp = ReactNativeStyle | ((theme: Theme) => ReactNativeStyle)

export interface BaseCustomComponentProps {
  styles?: StylesProp
}
