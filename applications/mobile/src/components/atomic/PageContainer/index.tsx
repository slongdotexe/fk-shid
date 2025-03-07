import styled from '@emotion/native'
import { useTheme } from '@emotion/react'
import { ScrollView, ScrollViewProps, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { handleStyleOverrides } from '../../../utils/handle-style-overrides'
import { BaseCustomComponentProps } from '../../types'

export interface CustomPageContainerProps extends BaseCustomComponentProps {}

export interface PageContainerProps
  extends React.ComponentPropsWithoutRef<typeof View>,
    Partial<CustomPageContainerProps> {
  label?: string
}

export const SafeArea = styled.View<CustomPageContainerProps>(
  ({ theme, styles }) => {
    const { bottom, left, right, top } = useSafeAreaInsets()
    return {
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

export interface ScrollViewPageContainerProps
  extends CustomPageContainerProps,
    ScrollViewProps {
  slots?: {
    contentContainer?: {
      styles?: BaseCustomComponentProps['styles']
    }
  }
}

export const PageContainer = (props: ScrollViewPageContainerProps) => {
  const theme = useTheme()
  return (
    <ScrollView
      style={{
        backgroundColor: theme.backgroundColor.background,
      }}
      contentContainerStyle={{
        flexGrow: 1,
        padding: theme.spacing(4),
        backgroundColor: theme.backgroundColor.background,
        ...handleStyleOverrides(
          // eslint-disable-next-line react/destructuring-assignment -- --
          props.slots?.contentContainer?.styles,
          theme
        ),
      }}
      {...props}
    />
  )
}
