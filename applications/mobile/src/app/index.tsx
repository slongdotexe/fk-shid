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
import Toast from 'react-native-toast-message'

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
      <Button
        size="sm"
        variant="default"
        label="Clean"
        onPress={() =>
          Toast.show({
            text1: 'Hello',
            visibilityTime: 2000,
            position: 'bottom',
            type: 'subtle',
          })
        }
      />
      <Button
        disabled={!processedLink}
        size="sm"
        variant="secondary"
        label="Share"
        onPress={handleClean}
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
    <PageContainer keyboardShouldPersistTaps="never">
      <View style={css({ gap: 16, paddingTop: theme.spacing(6) })}>
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
                size: 'md',
                weight: 'bold',
              },
            },
          }}
          defaultValue="https://www.amazon.com.au/Beelink-MINI-S12-Lake-N95-Processor-Computer/dp/B0C1N4VYBX/ref=pd_ci_mcx_mh_mcx_views_0_image?pd_rd_w=RTS9d&content-id=amzn1.sym.4acd438a-8f03-4368-a13d-db207e905984%3Aamzn1.symc.409c7fce-cbd2-4cf4-a6cb-824c258c8778&pf_rd_p=4acd438a-8f03-4368-a13d-db207e905984&pf_rd_r=A6K3T4D9WD7R8VKGSAGW&pd_rd_wg=8Wpf2&pd_rd_r=cdcebc10-701d-4e89-b21d-1980f03ae51b&pd_rd_i=B0C1N4VYBX"
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

      {/* <Button
        label="Test Page"
        styles={() => {
          return {
            position: 'absolute',
            top: theme.spacing(4),
            right: theme.spacing(2),
          }
        }}
        onPress={navigateTestPage}
      /> */}
    </PageContainer>
  )
}

export default Page
