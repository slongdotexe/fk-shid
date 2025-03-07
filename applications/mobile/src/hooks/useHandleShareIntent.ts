import { useRouter } from 'expo-router'
import { useShareIntentContext } from 'expo-share-intent'
import { useEffect } from 'react'

export const useHandleShareIntent = () => {
  const router = useRouter()

  const { hasShareIntent } = useShareIntentContext()

  useEffect(() => {
    if (hasShareIntent) {
      router.replace({
        pathname: '/modal-share-intent',
      })
    }
  }, [hasShareIntent, router])
}
