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

const Page = () => {
  const [inputLink, setInputLink] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- I am the captain.
  const [outputLink, setOutputLink] = useState('')

  const router = useRouter()

  const { hasShareIntent } = useShareIntentContext()

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
      <Button
        title="Remove tracking"
        onPress={() => {
          //   const link = removeTracking(inputLink)
          //   setOutputLink(link)
        }}
      />
      <Text>{outputLink}</Text>
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
