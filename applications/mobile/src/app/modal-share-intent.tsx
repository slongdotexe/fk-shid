import { useTheme } from '@emotion/react'
import Entypo from '@expo/vector-icons/Entypo'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import Fontisto from '@expo/vector-icons/Fontisto'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { ShareIntent, useShareIntentContext } from 'expo-share-intent'
import React, { useRef } from 'react'
import { ScrollView, Text, View } from 'react-native'

import { Button } from '../components/Buttons'
import { Card } from '../components/Card'
import { PageContainer } from '../components/PageContainer'
import { handleCopy, handleOpenInBrowser, handleShareLink } from '../utils'

// const handleShareIntentLink = (
// shareIntent: ShareIntent,
// hasShareIntent: boolean
// ) => {
//   try {
//     const processedLink = processShareIntentLink(shareIntent, hasShareIntent)
//     return {
//       link: processedLink,
//       error: null,
//     }
//   } catch (error) {
//     const _error = error as Error
//     // eslint-disable-next-line no-console -- Debugging
//     console.log(_error?.message)
//     return {
//       error: _error.message,
//       link: null,
//     }
//   }
// }

const handleShareIntentLink = (shareIntent: ShareIntent) => {
  if (!shareIntent.webUrl) {
    return {}
  }
  const link = new URL(shareIntent.webUrl)
  const cleanedLink = `${link.host}${link.pathname}`
  return {
    error: null,
    link: cleanedLink,
  }
}
const LinkCard = ({
  titleText,
  linkText,
}: {
  titleText: string
  linkText: string
}) => {
  const theme = useTheme()

  return (
    <View
      style={{
        width: '100%',
        gap: theme.spacing(2),
        justifyContent: 'flex-start',
      }}
    >
      <Text
        style={{
          color: theme.textColor.gray[500],
          fontSize: theme.spacing(4),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Theme types issue
          fontWeight: theme.fontWeight.semibold as any,
        }}
      >
        {titleText}
      </Text>
      <View
        style={{
          display: 'flex',
          backgroundColor: theme.backgroundColor.gray[800],
          borderRadius: theme.spacing(4),
          padding: theme.spacing(8),
        }}
      >
        <Text
          style={{
            color: theme.textColor.gray[200],
            fontSize: theme.spacing(4),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Theme types issue
            fontWeight: theme.fontWeight.semibold as any,
          }}
        >
          {linkText}
        </Text>
      </View>
    </View>
  )
}

const LinkControls = ({ link }: { link: string }) => {
  const theme = useTheme()

  return (
    <View
      style={{
        width: '100%',
        justifyContent: 'space-between',
        gap: theme.spacing(4),
      }}
    >
      <Button
        label="Open in browser"
        variant="ghost"
        onPress={() => handleOpenInBrowser(link)}
        styles={{
          flexDirection: 'row',
          gap: theme.spacing(2),
          alignItems: 'center',
        }}
      >
        <Fontisto name="world-o" size={24} color="white" />
      </Button>

      <Button
        label="Copy"
        variant="ghost"
        onPress={() => handleCopy(link)}
        styles={{
          flexDirection: 'row',
          gap: theme.spacing(2),
          alignItems: 'center',
        }}
      >
        <FontAwesome5 name="clipboard" size={24} color="white" />
      </Button>

      <Button
        label="Reshare"
        variant="ghost"
        onPress={() => handleShareLink(link)}
        styles={{
          flexDirection: 'row',
          gap: theme.spacing(2),
          alignItems: 'center',
        }}
      >
        <Entypo name="share" size={24} color="white" />
      </Button>
    </View>
  )
}

const ErrorControls = () => {
  const theme = useTheme()

  return (
    <View
      style={{
        width: '100%',
        justifyContent: 'space-between',
        gap: theme.spacing(4),
      }}
    >
      <Button
        label="Report bug"
        variant="ghost"
        styles={{
          flexDirection: 'row',
          gap: theme.spacing(2),
          alignItems: 'center',
        }}
      >
        <MaterialIcons name="bug-report" size={24} color="white" />
      </Button>
    </View>
  )
}

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
  const theme = useTheme()

  const { shareIntent, error } = useShareIntentContext()
  const shareIntentRef = useRef(shareIntent)

  const { webUrl } = shareIntentRef.current
  const { error: linkProcessingError, link } = handleShareIntentLink(
    shareIntentRef.current
    // true
  )
  console.log({ linkProcessingError, link })

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
          // height: '100%',
          // alignItems: 'center',
        }}
      >
        <LinkCard titleText="Original link" linkText={webUrl ?? ''} />
        {link && (
          <>
            <LinkCard titleText="Cleaned link" linkText={link} />
            <LinkControls link={link} />
          </>
        )}
        {linkProcessingError && (
          <>
            <Card
              fullWidth
              style={{
                borderColor: theme.textColor.destructive.DEFAULT,
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: theme.spacing(4),
                  color: theme.textColor.destructive.DEFAULT,
                }}
              >
                Error while processing link
              </Text>
            </Card>
            <ErrorControls />
          </>
        )}
        <DevControls
          cleanLink={link ?? ''}
          linkCleaningError={linkProcessingError ?? ''}
          shareIntent={shareIntent}
          shareIntentError={error}
        />
      </ScrollView>
    </PageContainer>
  )
}

export default ModalShareIntent
