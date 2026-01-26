// for iOS deeplink redirect to this unmatched page
// catched link: exposhareintentexample:///dataUrl=exposhareintentexampleShareKey
import { useRouter } from 'expo-router'
import { useShareIntentContext } from 'expo-share-intent'
import { useEffect } from 'react'

import Home from './index'

export default function Page() {
  const router = useRouter()

  const { isReady } = useShareIntentContext()

  useEffect(() => {
    if (!isReady) return

    router.replace({
      pathname: '/',
    })
  }, [router, isReady])

  return <Home />
}
