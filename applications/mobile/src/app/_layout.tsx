import { Slot } from 'expo-router'
import { ShareIntentProvider } from 'expo-share-intent'

const HomeLayout = () => {
  return (
    <ShareIntentProvider
      options={{
        debug: true,
        resetOnBackground: true,
      }}
    >
      <Slot />
    </ShareIntentProvider>
  )
}

export default HomeLayout
