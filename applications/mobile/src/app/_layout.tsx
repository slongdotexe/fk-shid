// import { useTheme } from '@emotion/react'
import { Stack, useRouter } from 'expo-router'
import { ShareIntentProvider } from 'expo-share-intent'
import { Button } from 'react-native'
// import { RootSiblingParent } from 'react-native-root-siblings'

import { ThemeProvider } from '../components/ThemeProvider'

const HeaderCancelButton = () => {
  const router = useRouter()
  return <Button title="Cancel" onPress={() => router.navigate('/')} />
}

const HomeLayout = () => {
  // const theme = useTheme()
  return (
    // <RootSiblingParent>
    <ShareIntentProvider
      options={{
        debug: true,
        resetOnBackground: true,
      }}
    >
      <ThemeProvider>
        {/* <RootSiblingParent> */}
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
        {/* </RootSiblingParent> */}
      </ThemeProvider>
    </ShareIntentProvider>
    // </RootSiblingParent>
  )
}

export default HomeLayout
