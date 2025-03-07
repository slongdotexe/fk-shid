import { useTheme } from '@emotion/react'
import { Stack, useRouter } from 'expo-router'
import { ShareIntentProvider, useShareIntent } from 'expo-share-intent'
import { StatusBar } from 'expo-status-bar'
import { Platform, UIManager } from 'react-native'
import Toast, { BaseToast } from 'react-native-toast-message'

import { Button } from '../components/atomic/Buttons'
import { SafeArea } from '../components/atomic/PageContainer'
import { ThemeProvider } from '../components/atomic/ThemeProvider'
import { getTypographyStyle } from '../components/atomic/Typography'

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
  }
}

const HeaderCancelButton = () => {
  const router = useRouter()
  const { resetShareIntent, shareIntent, hasShareIntent } = useShareIntent()

  return (
    <Button
      label="Cancel"
      variant="ghost"
      styles={{ padding: 8 }}
      onPress={() => {
        resetShareIntent(true)
        console.log({ shareIntent, hasShareIntent })
        router.replace('/')
      }}
    />
  )
}

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
          borderLeftColor: theme.borderColor.green[900],
          backgroundColor: theme.backgroundColor.background,
          borderColor: theme.borderColor.slate[700],
          borderWidth: theme.spacing(0.25),
          borderLeftWidth: theme.spacing(0.75),
        },
      }}
      style={{
        borderLeftColor: theme.borderColor.green[700],

        padding: 0,
        backgroundColor: theme.backgroundColor.background,

        borderColor: theme.borderColor.slate[700],
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

const HomeLayout = () => {
  return (
    <ShareIntentProvider
      options={{
        debug: true,
        resetOnBackground: true,
      }}
    >
      <StatusBar style="light" />
      <ThemeProvider>
        <Toast config={toastConfig} />
        <SafeArea>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
              name="modal-share-intent"
              options={{
                presentation: 'modal',
                title: 'Link Received',
                headerLeft: HeaderCancelButton,
                headerShown: false,
              }}
            />
          </Stack>
        </SafeArea>
      </ThemeProvider>
    </ShareIntentProvider>
  )
}

export default HomeLayout
