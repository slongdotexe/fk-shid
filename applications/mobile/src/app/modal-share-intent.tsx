import { useTheme } from '@emotion/react'
import { router } from 'expo-router'
import { ShareIntent, useShareIntentContext } from 'expo-share-intent'
import React, { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'

import { PageContainer } from '../components/atomic/PageContainer'
import { LinkCleanerLayout } from '../components/LinkCleanerLayout'
import { TProcessedLink } from '../components/LinkCleanerLayout/types'

// const handleShareIntentLink = (shareIntent: ShareIntent) => {
//   const link = processShareIntentLink(shareIntent)
//   return link
// }

// const ErrorControls = () => {
//   const theme = useTheme()

//   return (
//     <View
//       style={{
//         width: '100%',
//         justifyContent: 'space-between',
//         gap: theme.spacing(4),
//       }}
//     >
//       <Button
//         label="Report bug"
//         variant="ghost"
//         styles={{
//           flexDirection: 'row',
//           gap: theme.spacing(2),
//           alignItems: 'center',
//         }}
//       >
//         <MaterialIcons name="bug-report" size={24} color="white" />
//       </Button>
//     </View>
//   )
// }

const DevMenuText = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme()
  return (
    <Text
      style={{ color: theme.textColor.red[700], fontSize: theme.spacing(4) }}
    >
      {children}
    </Text>
  )
}

const DevControls = ({
  shareIntent,
  shareIntentError,
  linkCleaningError,
  cleanLink,
}: {
  shareIntent: ShareIntent
  shareIntentError: string | null
  linkCleaningError: string | null
  cleanLink: string | null
}) => {
  const theme = useTheme()

  return __DEV__ ? (
    <View
      style={{
        bottom: 0,
        paddingBottom: theme.spacing(8),
      }}
    >
      <DevMenuText>shareIntent:{JSON.stringify(shareIntent)}</DevMenuText>
      <DevMenuText>shareIntentError:{shareIntentError}</DevMenuText>
      <DevMenuText>linkCleaningError:{linkCleaningError}</DevMenuText>
      <DevMenuText>cleanLink:{cleanLink}</DevMenuText>
    </View>
  ) : null
}

const ModalShareIntent = () => {
  const [cleanedLink, setCleanedLink] = useState<string | null>(null)
  const [linkCleaningError, setLinkCleaningError] = useState<string | null>(
    null
  )

  const theme = useTheme()
  const { shareIntent, error, resetShareIntent } = useShareIntentContext()

  const { webUrl } = shareIntent

  const setLinkCleaningResult = (processedLink: TProcessedLink) => {
    if (processedLink.error) {
      setCleanedLink(null)
      setLinkCleaningError(processedLink.error)
    }
    if (processedLink.link) {
      setCleanedLink(processedLink.link.toString())
      setLinkCleaningError(null)
    }
  }

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
          linkInput={webUrl}
          setInputLink={(link: string | null) => {
            console.log({ link })
            if (link === null) {
              resetShareIntent()
              router.replace('/')
            }
          }}
          setLinkCleanerResult={setLinkCleaningResult}
        />
        <DevControls
          cleanLink={cleanedLink ?? ''}
          linkCleaningError={linkCleaningError ?? ''}
          shareIntent={shareIntent}
          shareIntentError={error}
        />
      </ScrollView>
    </PageContainer>
  )
}

export default ModalShareIntent
