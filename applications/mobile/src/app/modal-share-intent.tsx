import { useShareIntentContext } from 'expo-share-intent'
import { ScrollView } from 'react-native'

import { PageContainer } from '../components/atomic/PageContainer'
import { LinkCleanerLayout } from '../components/LinkCleanerLayout'
import { useCleanLink } from '../hooks/useCleanLink'

const ModalShareIntent = () => {
  const { shareIntent, resetShareIntent } = useShareIntentContext()
  const { webUrl } = shareIntent

  const { linkInput, linkCleaningResult, resetLinkCleaning } =
    useCleanLink(webUrl)

  const resetCleaningAndShareIntent = () => {
    resetLinkCleaning()
    resetShareIntent()
  }

  return (
    <PageContainer>
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
