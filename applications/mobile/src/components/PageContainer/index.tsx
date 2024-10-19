import styled, { ReactNativeStyle } from '@emotion/native'
import { Theme } from '@emotion/react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export interface CustomPageContainerProps {
  styles?: ReactNativeStyle | ((theme: Theme) => ReactNativeStyle)
}

export interface PageContainerProps
  extends React.ComponentPropsWithoutRef<typeof View>,
    Partial<CustomPageContainerProps> {
  label?: string
}

export const PageContainer = styled.View<CustomPageContainerProps>(
  ({ theme, styles }) => {
    const { bottom, left, right, top } = useSafeAreaInsets()
    return {
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      paddingTop: top,
      paddingRight: right,
      paddingBottom: bottom,
      paddingLeft: left,
      backgroundColor: theme.backgroundColor.background,
      ...(typeof styles === 'function' ? styles(theme) : styles),
    }
  }
)
