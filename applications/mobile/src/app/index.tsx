import { useRouter } from 'expo-router'
import { useShareIntentContext } from 'expo-share-intent'
import { useEffect, useState } from 'react'
import {
  Text,
  StyleSheet,
  View,
  Button,
  StatusBar,
  TextInput,
} from 'react-native'

import { handleCopy, handleShareLink, processInputLink } from '../utils'

const Page = () => {
  const [inputLink, setInputLink] = useState('')
  const router = useRouter()

  const { hasShareIntent } = useShareIntentContext()

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
  const outputLink = handleInputLink(inputLink)

  useEffect(() => {
    if (hasShareIntent) {
      // we want to handle share intent event in a specific page
      router.replace({
        pathname: 'share-intent',
      })
    }
  }, [hasShareIntent, router])

  return (
    <View style={styled.styles}>
      <TextInput
        onChangeText={(newText) => setInputLink(newText)}
        defaultValue={inputLink}
        style={styled.TextInput}
      />
      {!!outputLink?.link && <Text>Cleaned URL: {outputLink?.link}</Text>}
      {!!outputLink?.error && <Text>Error: {outputLink?.error}</Text>}
      <Button title="Copy" onPress={() => handleCopy(outputLink?.link ?? '')} />
      <Button title="Clear" onPress={() => setInputLink('')} />
      <Button
        title="Share"
        onPress={() => handleShareLink(outputLink.link ?? '')}
      />
      <StatusBar />
    </View>
  )
}

export default Page

const styled = StyleSheet.create({
  styles: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    paddingHorizontal: '5%',
  },
  TextInput: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
})
