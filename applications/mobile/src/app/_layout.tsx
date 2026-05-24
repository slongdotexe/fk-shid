import { Slot, useRouter } from "expo-router";

import { Stack } from 'expo-router'
import { ShareIntentProvider } from 'expo-share-intent'
import { StatusBar } from 'expo-status-bar'
import { Platform, UIManager } from 'react-native'

import { SafeArea } from '../components/atomic/PageContainer'
import { ThemeProvider } from '../components/atomic/ThemeProvider'
import { AppToast } from '../components/Toast'

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
  }
}

const HomeLayout = () => {
  const router = useRouter();

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
          <Stack screenOptions={{ headerShown: false }} />
        </SafeArea>
        <AppToast />
      </ThemeProvider>
    </ShareIntentProvider>
  );
}

export default HomeLayout
