import { Stack, useRouter } from 'expo-router'
import { ShareIntentProvider } from 'expo-share-intent'
import { StatusBar } from 'expo-status-bar'
import { Button } from 'react-native'

import { SafeArea } from '../components/atomic/PageContainer'
import { ThemeProvider } from '../components/atomic/ThemeProvider'

const HeaderCancelButton = () => {
  const router = useRouter()
  return <Button title="Cancel" onPress={() => router.navigate('/')} />
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
        <SafeArea>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
              name="modal-share-intent"
              options={{
                presentation: 'modal',
                title: 'Link Received',
                headerLeft: HeaderCancelButton,
              }}
            />
          </Stack>
        </SafeArea>
      </ThemeProvider>
    </ShareIntentProvider>
  )
}

export default HomeLayout
