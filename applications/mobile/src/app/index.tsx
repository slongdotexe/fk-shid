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
import { LinkCleanerLayout } from '../components/LinkCleanerLayout'
import { useCleanLink } from '../hooks/useCleanLink'

const Page = () => {
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
          size="default"
          placeholder="Drop a link..."
          errorMessage={linkCleaningResult?.error}
          style={css({
            color: theme.textColor.primary.DEFAULT,
            marginVertical: theme.spacing(2),
          })}
          ref={inputRef}
          label="New Link"
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
