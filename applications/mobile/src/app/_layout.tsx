import { Stack, useRouter } from 'expo-router'
import { ShareIntentProvider, useShareIntent } from 'expo-share-intent'
import { StatusBar } from 'expo-status-bar'
import { Platform, UIManager } from 'react-native'

import { Button } from '../components/atomic/Buttons'
import { SafeArea } from '../components/atomic/PageContainer'
import { ThemeProvider } from '../components/atomic/ThemeProvider'
import { AppToast } from '../components/Toast'

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
  }
}

const HeaderCancelButton = () => {
  const router = useRouter()
  const { resetShareIntent } = useShareIntent()

  return (
    <Button
      label="Cancel"
      variant="ghost"
      styles={{ padding: 8 }}
      onPress={() => {
        resetShareIntent(true)
        router.replace('/')
      }}
    />
  )
}

const HomeLayout = () => {
  return (
    <ShareIntentProvider
      options={{
        resetOnBackground: true,
        debug: true,
      }}
    >
      <StatusBar style="light" />
      <ThemeProvider>
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
        <AppToast />
      </ThemeProvider>
    </ShareIntentProvider>
  )
}

export default HomeLayout
