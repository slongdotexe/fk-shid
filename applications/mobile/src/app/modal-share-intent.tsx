import { useRouter } from 'expo-router'
import { useShareIntentContext } from 'expo-share-intent'
import { ScrollView } from 'react-native'

import { PageContainer } from '../components/atomic/PageContainer'
import { Typography } from '../components/atomic/Typography'
import { LinkCleanerLayout } from '../components/LinkCleanerLayout'
import { useCleanLink } from '../hooks/useCleanLink'

const ModalShareIntent = () => {
  const router = useRouter()
  const { shareIntent, resetShareIntent } = useShareIntentContext()
  const { webUrl } = shareIntent

  const { linkInput, linkCleaningResult, resetLinkCleaning } =
    useCleanLink(webUrl)

  const resetCleaningAndShareIntent = () => {
    resetLinkCleaning()
    resetShareIntent()
    router.replace('/')
  }

  return (
    <PageContainer>
      <Typography size="xl">New Link Shared</Typography>
      <ScrollView>
        <LinkCleanerLayout
          linkInput={linkInput}
          linkCleaningResult={linkCleaningResult}
          clearLinkCleaning={resetCleaningAndShareIntent}
        />
      </ScrollView>
    </PageContainer>
  )
}

export default ModalShareIntent
