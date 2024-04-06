import { Slot } from 'expo-router'
import { ShareIntentProvider } from 'expo-share-intent'

const HomeLayout = () => {
  // const router = useRouter()

  return (
    <ShareIntentProvider
      options={{
        debug: true,
        resetOnBackground: true,
        // onResetShareIntent: () =>
        //   router.replace({
        //     pathname: '/',
        //   }),
      }}
    >
      <Slot />
    </ShareIntentProvider>
  )
}

export default HomeLayout
