import { css } from '@emotion/native'
import { useRouter } from 'expo-router'
import { useShareIntentContext } from 'expo-share-intent'
import { useEffect, useState } from 'react'
import { Text, StatusBar, View } from 'react-native'

import { Button } from '../components/Buttons'
import { TextInput } from '../components/Input'
import { PageContainer } from '../components/PageContainer'
import { handleCopy, handleShareLink, processInputLink } from '../utils'

const handleInputLink = (link: string) => {
  try {
    const processedLink = processInputLink(link)
    return {
      error: null,
      link: processedLink,
    }
  } catch (error) {
    const _error = error as Error
    // eslint-disable-next-line no-console -- Debugging
    console.log(_error?.message)
    return {
      error: _error.message,
      link: null,
    }
  }
}

const Page = () => {
  const [inputLink, setInputLink] = useState('')
  const router = useRouter()

  const { hasShareIntent } = useShareIntentContext()

  const outputLink = handleInputLink(inputLink)

  useEffect(() => {
    if (hasShareIntent) {
      router.replace({
        pathname: 'share-intent',
      })
    }
  }, [hasShareIntent, router])

  return (
    <PageContainer>
      <TextInput
        onChangeText={(newText) => setInputLink(newText)}
        defaultValue={inputLink}
        size="sm"
      />
      {!!outputLink?.link && <Text>Cleaned URL: {outputLink?.link}</Text>}
      {!!outputLink?.error && <Text>Error: {outputLink?.error}</Text>}
      <View
        style={css({
          flexDirection: 'row',
          gap: 6,
        })}
      >
        <Button
          size="sm"
          variant="default"
          label="Share"
          onPress={() => handleShareLink(outputLink.link ?? '')}
        />
        <Button
          size="sm"
          variant="secondary"
          label="Copy"
          onPress={() => handleCopy(outputLink?.link ?? '')}
        />
        <Button
          size="sm"
          variant="destructive"
          label="Clear"
          onPress={() => setInputLink('')}
        />
      </View>
      <StatusBar translucent barStyle="light-content" />
    </PageContainer>
  )
}

export default Page
