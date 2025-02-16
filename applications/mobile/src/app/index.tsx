import { css } from '@emotion/native'
import { useTheme } from '@emotion/react'
import React, { useRef, useState } from 'react'
import {
  NativeSyntheticEvent,
  ScrollView,
  TextInputEndEditingEventData,
  TextInputFocusEventData,
} from 'react-native'

import { TextInput } from '../components/atomic/Input'
import { PageContainer } from '../components/atomic/PageContainer'
import { LinkCleanerLayout } from '../components/LinkCleanerLayout'
import { TProcessedLink } from '../components/LinkCleanerLayout/types'

const Page = () => {
  const [, setCleanedLink] = useState<string | null>(null)
  const [linkCleaningError, setLinkCleaningError] = useState<string | null>(
    null
  )
  const inputRef = useRef<React.ElementRef<typeof TextInput>>(null)

  const theme = useTheme()

  const [linkInput, setLinkInput] = useState<string | null>(null)

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

  const onBlurInput = (
    event: NativeSyntheticEvent<
      TextInputFocusEventData | TextInputEndEditingEventData
    >
  ) => {
    const linkText = event.nativeEvent.text
    setLinkInput(linkText)
  }

  return (
    <PageContainer>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: theme.spacing(4),
        }}
        style={{
          width: '100%',
        }}
      >
        <TextInput
          autoCapitalize="none"
          ref={inputRef}
          size="default"
          placeholder="Drop a link..."
          errorMessage={linkCleaningError}
          style={css({
            color: theme.textColor.primary.DEFAULT,
            marginVertical: theme.spacing(2),
          })}
          label="New Link"
          onEndEditing={onBlurInput}
          slots={{
            label: {
              typographyProps: {
                size: 'md',
                weight: 'bold',
              },
            },
          }}
        />
        <LinkCleanerLayout
          linkInput={linkInput}
          setLinkCleanerResult={setLinkCleaningResult}
          setInputLink={setLinkInput}
        />
      </ScrollView>
    </PageContainer>
  )
}

export default Page
