import { useTheme } from '@emotion/react'
import Toast, { BaseToast } from 'react-native-toast-message'

import { getTypographyStyle } from '../atomic/Typography'

const SubtleToast = (props: Record<string, unknown>) => {
  const theme = useTheme()
  return (
    <BaseToast
      {...props}
      contentContainerStyle={{ padding: 0 }}
      touchableContainerProps={{
        style: {
          paddingVertical: theme.spacing(2),
          paddingHorizontal: theme.spacing(2),
          borderRadius: theme.spacing(2),
          borderLeftColor: theme.color.success.border,
          backgroundColor: theme.color.background.base,
          borderColor: theme.color.gray.gray7,
          borderWidth: theme.spacing(0.25),
          borderLeftWidth: theme.spacing(1),
        },
      }}
      style={{
        borderLeftColor: theme.color.success.border,

        padding: 0,
        backgroundColor: theme.color.background.base,

        borderColor: theme.color.gray.gray7,
        borderWidth: theme.spacing(0.25),
      }}
      text1Style={getTypographyStyle(
        {
          size: 'md',
          weight: 'normal',
          family: 'body',
        },
        theme
      )}
    />
  )
}

const toastConfig = {
  subtle: (props: Record<string, unknown>) => <SubtleToast {...props} />,
}

export const AppToast = () => {
  return <Toast config={toastConfig} />
}
