import { Slot } from 'expo-router'
import { ShareIntentProvider } from 'expo-share-intent'

import { ThemeProvider } from '../components/ThemeProvider'

const HomeLayout = () => {
  return (
    <ShareIntentProvider
      options={{
        debug: true,
        resetOnBackground: true,
      }}
    >
      <ThemeProvider>
        <Slot />
      </ThemeProvider>
    </ShareIntentProvider>
  )
}

export default HomeLayout
