import { css } from '@emotion/native'
import { useTheme } from '@emotion/react'
import { useRef } from 'react'
import {
  NativeSyntheticEvent,
  ScrollView,
  TextInputEndEditingEventData,
  TextInputFocusEventData,
} from 'react-native'

import { TextInput } from '../components/atomic/Input'
import { PageContainer } from '../components/atomic/PageContainer'
import { Typography } from '../components/atomic/Typography'
import { LinkCleanerLayout } from '../components/LinkCleanerLayout'
import { useCleanLink } from '../hooks/useCleanLink'
import { useHandleShareIntent } from '../hooks/useHandleShareIntent'

const Page = () => {
  useHandleShareIntent()

  const theme = useTheme()
  const { linkInput, linkCleaningResult, setLinkInput, resetLinkCleaning } =
    useCleanLink(null)
  const inputRef = useRef<React.ElementRef<typeof TextInput>>(null)

  const onChange = (
    event: NativeSyntheticEvent<
      TextInputFocusEventData | TextInputEndEditingEventData
    >
  ) => {
    const linkText = event.nativeEvent.text
    setLinkInput(linkText)
  }
  const resetCleaningAndInput = () => {
    inputRef.current?.clear()
    resetLinkCleaning()
  }

  return (
    <PageContainer>
      <ScrollView>
        <Typography size="xl">Clean New Link</Typography>
        <TextInput
          autoCapitalize="none"
          size="default"
          placeholder="Drop a link..."
          errorMessage={linkCleaningResult?.error}
          style={css({
            color: theme.textColor.primary.DEFAULT,
          })}
          ref={inputRef}
          onEndEditing={onChange}
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
          linkCleaningResult={linkCleaningResult}
          clearLinkCleaning={resetCleaningAndInput}
        />
      </ScrollView>
    </PageContainer>
  )
}

export default Page
