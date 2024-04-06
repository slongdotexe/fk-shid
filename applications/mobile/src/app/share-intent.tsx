/* eslint-disable eslint-comments/no-unlimited-disable -- Temp */
/* eslint-disable -- Temp */
import * as Clipboard from 'expo-clipboard'
import { useRouter } from 'expo-router'
import { useShareIntentContext } from 'expo-share-intent'
import { linkCanonicalRegex, linkDomainRegex, processUrl } from 'fk-shid-core'
import { Button, Image, StyleSheet, Text, View } from 'react-native'

const ShareIntent = () => {
  const router = useRouter()
  const { hasShareIntent, shareIntent, error, resetShareIntent } =
    useShareIntentContext()

  const handleCopy = async (link: string) => {
    await Clipboard.setStringAsync(link)
    console.log('copied link', link)
  }

  const processedLink =
    hasShareIntent && shareIntent.webUrl
      ? // ? processUrl(
        //     linkDomainRegex,
        //     {
        //       instagram: {
        //         canonicalMatchers: linkCanonicalRegex.instagram,
        //       },
        //     },
        //     shareIntent.webUrl
        //   )
        null
      : null

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
        <Text>Received text: {shareIntent.webUrl}</Text>
        <Text>is webUrl: {shareIntent.webUrl ? 'true' : 'false'}</Text>
        <Text>Cleaned URL: {processedLink}</Text>
        <Button title="copy" onPress={() => handleCopy(processedLink ?? '')} />
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

export default ShareIntent

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
