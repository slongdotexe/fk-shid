import { useTheme } from '@emotion/react'
import { useShareIntentContext } from 'expo-share-intent'
import { ScrollView } from 'react-native'

import { PageContainer } from '../components/atomic/PageContainer'
import { LinkCleanerLayout } from '../components/LinkCleanerLayout'
import { useCleanLink } from '../hooks/useCleanLink'

const ModalShareIntent = () => {
  const theme = useTheme()
  const {
    shareIntent,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- Temp
    error: shareIntentError,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- Temp
    resetShareIntent,
  } = useShareIntentContext()
  const { webUrl } = shareIntent

  const { linkInput, linkCleaningResult, resetLinkCleaning } =
    useCleanLink(webUrl)

  return (
    <PageContainer styles={{ flexGrow: 1 }}>
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          paddingHorizontal: theme.spacing(4),
          gap: theme.spacing(6),
        }}
        style={{
          width: '100%',
        }}
      >
        <LinkCleanerLayout
          linkInput={linkInput}
          linkCleaningResult={linkCleaningResult}
          clearLinkCleaning={resetLinkCleaning}
        />
      </ScrollView>
    </PageContainer>
  )
}

export default ModalShareIntent
