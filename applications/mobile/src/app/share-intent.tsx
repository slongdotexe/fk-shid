import { useRouter } from 'expo-router'
import { ShareIntent, useShareIntentContext } from 'expo-share-intent'
import { useRef } from 'react'
import { Button, Image, StyleSheet, Text, View } from 'react-native'

import { handleCopy, handleShareLink, processShareIntentLink } from '../utils'

const handleShareIntentLink = (
  shareIntent: ShareIntent,
  hasShareIntent: boolean
) => {
  try {
    const processedLink = processShareIntentLink(shareIntent, hasShareIntent)
    return {
      link: processedLink,
      error: null,
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

const ShareIntentPage = () => {
  const router = useRouter()
  const { hasShareIntent, shareIntent, error, resetShareIntent } =
    useShareIntentContext()
  const shareIntentRef = useRef(shareIntent)

  const { webUrl } = shareIntentRef.current
  const processedLink = handleShareIntentLink(shareIntentRef.current, true)

  return (
    <View style={styles.container}>
      <Image
        // eslint-disable-next-line global-require -- RN likes this
        source={require('../assets/icon.png')}
        style={[styles.logo, styles.gap]}
      />
      <Text style={{ fontSize: 20 }}>
        {hasShareIntent ? 'Share intent received' : 'No share intent received'}
      </Text>
      <View
        style={{
          alignItems: 'flex-start',
          gap: 10,
        }}
      >
        <Text>Received text: {webUrl}</Text>
        <Text>is webUrl: {webUrl ? 'true' : 'false'}</Text>
        {!!processedLink?.link && (
          <Text>Cleaned URL: {processedLink.link}</Text>
        )}
        {!!processedLink?.error && <Text>Error: {processedLink.error}</Text>}
        <Button
          title="copy"
          onPress={() => handleCopy(processedLink?.link ?? '')}
        />
        <Button
          title="Share"
          onPress={() => handleShareLink(processedLink?.link ?? '')}
        />
      </View>
      <Text style={[styles.error]}>{error}</Text>
      <View style={styles.horizontalContainer}>
        <Button onPress={() => router.replace('/')} title="Go home" />
        {hasShareIntent && (
          <Button onPress={() => resetShareIntent()} title="Reset" />
        )}
      </View>
    </View>
  )
}

export default ShareIntentPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  horizontalContainer: {
    flexDirection: 'row',
  },
  logo: {
    width: 75,
    height: 75,
    resizeMode: 'contain',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  gap: {
    marginBottom: 20,
  },
  error: {
    color: 'red',
  },
})
