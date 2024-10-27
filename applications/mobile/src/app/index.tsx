import { css } from '@emotion/native'
import { useTheme } from '@emotion/react'
import { useRouter } from 'expo-router'
import React, { useRef, useState } from 'react'
import {
  GestureResponderEvent,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  View,
} from 'react-native'

import { Button, ButtonProps } from '../components/atomic/Buttons'
import { TextInput } from '../components/atomic/Input'
import { LinkCard } from '../components/atomic/LinkCard'
import { PageContainer } from '../components/atomic/PageContainer'
import { useHandleShareIntent } from '../hooks/useHandleShareIntent'
import { handleCopy, handleShareLink } from '../utils'
import { processLinkCleaning } from '../utils/process-link'

const InputControls = ({
  processedLink,
  handleClearInput,
  handleClean,
}: {
  processedLink: string | null
  handleClearInput: ButtonProps['onPress']
  handleClean?: ButtonProps['onPress']
}) => {
  useHandleShareIntent()
  return (
    <View
      style={css({
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 16,
      })}
    >
      <Button size="sm" variant="default" label="Clean" onPress={handleClean} />
      <Button
        disabled={!processedLink}
        size="sm"
        variant="secondary"
        label="Share"
        onPress={() => handleShareLink(processedLink)}
      />
      <Button
        disabled={!processedLink}
        size="sm"
        variant="secondary"
        label="Copy"
        onPress={() => handleCopy(processedLink)}
      />
      <Button
        size="sm"
        variant="destructive"
        label="Clear"
        onPress={handleClearInput}
      />
    </View>
  )
}

const Page = () => {
  const [linkCleaningResult, setLinkCleaningResult] = useState<
    ({ link: string; error: null } | { link: null; error: string }) | null
  >(null)
  const inputRef = useRef<React.ElementRef<typeof TextInput>>(null)

  const router = useRouter()
  const [linkInput, setLinkInput] = useState<string | null>(null)

  const navigateTestPage = () => {
    router.push('/test-page')
  }

  const theme = useTheme()
  const onBlurInput = (
    event: NativeSyntheticEvent<TextInputFocusEventData>
  ) => {
    const linkText = event.nativeEvent.text

    setLinkInput(linkText)
    const processedLink = processLinkCleaning(linkText)
    setLinkCleaningResult(processedLink)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- --
  const onHandleClean = (event: GestureResponderEvent) => {
    inputRef.current?.blur()
  }

  const clearInput: ButtonProps['onPress'] = () => {
    inputRef.current?.clear()
    setLinkInput(null)
    setLinkCleaningResult(null)
  }

  return (
    <PageContainer>
      <View style={css({ gap: 16 })}>
        <TextInput
          autoCapitalize="none"
          ref={inputRef}
          size="default"
          placeholder="Drop a link..."
          errorMessage={linkCleaningResult?.error}
          style={css({ color: theme.textColor.primary.DEFAULT })}
          onBlur={onBlurInput}
          label="New Link"
          slots={{
            label: {
              typographyProps: {
                size: 'sm',
                weight: 'bold',
              },
            },
          }}
        />

        <LinkCard titleText="Input Link:" linkText={linkInput} />

        <LinkCard
          titleText="Cleaned Link:"
          linkText={linkCleaningResult?.link}
        />
        <InputControls
          processedLink={linkCleaningResult?.link ?? null}
          handleClearInput={clearInput}
          handleClean={onHandleClean}
        />
      </View>

      <Button
        label="Test Page"
        styles={() => {
          return {
            position: 'absolute',
            bottom: theme.spacing(4),
            right: theme.spacing(2),
          }
        }}
        onPress={navigateTestPage}
      />
    </PageContainer>
  )
}

export default Page
