import styled, { css } from '@emotion/native'
import { useTheme } from '@emotion/react'
import { useShareIntentContext } from 'expo-share-intent'
import React, { useEffect, useRef, useState } from 'react'
import {
  NativeSyntheticEvent,
  ScrollView,
  TextInputEndEditingEventData,
  TextInputFocusEventData,
  View,
} from 'react-native'

import { Button } from '../components/atomic/Buttons'
import { TextInput } from '../components/atomic/Input'
import { Typography } from '../components/atomic/Typography'
import { LinkCard } from '../components/LinkCard'
import { handleShareLink, handleCopy } from '../utils'
import { cleanLink, LinkCleaningResult } from '../utils/clean-link'
import { Alert } from '../components/atomic/Alert'

const StyledView = styled(View)(() => {
  return {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    padding: 16,
  }
})

const Page = () => {
  const inputRef = useRef<React.ElementRef<typeof TextInput>>(null)
  const [linkCleaningResult, setLinkCleaningResult] = useState<
    LinkCleaningResult & { input: string | null }
  >({
    error: null,
    link: null,
    fallbackCleaning: false,
    input: '',
  })

  const theme = useTheme()

  const { hasShareIntent, shareIntent, resetShareIntent } =
    useShareIntentContext()
  const { webUrl } = shareIntent

  useEffect(() => {
    if (hasShareIntent) {
      const processedLink = cleanLink(webUrl)
      setLinkCleaningResult({
        ...processedLink,
        input: processedLink.error ? '' : webUrl,
      })
    }
  }, [hasShareIntent, resetShareIntent, webUrl])

  const processedLinkResult = linkCleaningResult.link

  const handleOnCleanLink = (
    event: NativeSyntheticEvent<
      TextInputFocusEventData | TextInputEndEditingEventData
    >
  ) => {
    const linkText = event.nativeEvent.text

    if (!linkText) {
      setLinkCleaningResult({
        error: null,
        link: null,
        input: null,
        fallbackCleaning: false,
      })
      return
    }

    const processedLink = cleanLink(linkText)

    setLinkCleaningResult({
      ...processedLink,
      input: processedLink.error ? null : linkText,
    })
  }

  const handleClearInput = () => {
    if (hasShareIntent) {
      resetShareIntent()
    }
    inputRef.current?.clear()
    setLinkCleaningResult({
      error: null,
      input: '',
      link: null,
      fallbackCleaning: false,
    })
  }

  return (
    <ScrollView style={{backgroundColor:theme.color.background.base}} contentInset={{top:20, bottom:40}} automaticallyAdjustKeyboardInsets>
      {/* <KeyboardAvoidingView behavior="padding"> */}
        <Typography size="xl">Clean New Link</Typography>
        <View style={css({ gap: 32, })}>
          <LinkCard
            titleText="Received Link"
            linkText={linkCleaningResult.input}
          />
          <LinkCard
            titleText="Cleaned Link"
            linkText={linkCleaningResult.link}
          />
          {linkCleaningResult.fallbackCleaning && (
            <Alert
              styles={{ marginTop: 16 }}
              alertTitle="Fallback link processing"
              alertDescription="Link is not recognised and was processed by stripping query parameters."
            />
          )}
          <View >
        <TextInput
          autoCapitalize="none"
          size="default"
          defaultValue={webUrl ?? ''}
          placeholder="Drop a link..."
          errorMessage={linkCleaningResult?.error}
          ref={inputRef}
          onEndEditing={handleOnCleanLink}
          style={{borderRadius:999}}
          slots={{
            label: {
              typographyProps: {
                size: 'md',
                weight: 'bold',
              },
            },
          }}
        />
          <StyledView>
            
            <Button
              disabled={!processedLinkResult}
              size="sm"
              variant="default"
              label="Share"
              onPress={() => handleShareLink(processedLinkResult)}
              />
            <Button
              disabled={!processedLinkResult}
              size="sm"
              variant="default"
              label="Copy"
              onPress={() => handleCopy(processedLinkResult)}
              />
            <Button
              disabled={!processedLinkResult}
              size="sm"
              variant="destructive"
              label="Clear"
              onPress={handleClearInput}
              />
          </StyledView>
              </View>
        </View>
      {/* </KeyboardAvoidingView> */}

    </ScrollView>
  )
}

export default Page
