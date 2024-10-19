import { useTheme } from '@emotion/react'
import { Text, View } from 'react-native'

import { PageContainer } from '../components/PageContainer'

export const LinkCard = ({
  titleText,
  linkText,
}: {
  titleText: string
  linkText: string
}) => {
  const theme = useTheme()

  return (
    <View
      style={{
        width: '100%',
        gap: theme.spacing(2),
        justifyContent: 'flex-start',
      }}
    >
      <Text
        style={{
          color: theme.textColor.gray[500],
          fontSize: theme.spacing(4),
          fontWeight: theme.fontWeight.semibold as '600',
        }}
      >
        {titleText}
      </Text>
      <View
        style={{
          display: 'flex',
          backgroundColor: theme.backgroundColor.gray[800],
          borderRadius: theme.spacing(4),
          padding: theme.spacing(8),
        }}
      >
        <Text
          style={{
            color: theme.textColor.gray[200],
            fontSize: theme.spacing(4),
            fontWeight: theme.fontWeight.semibold as '600',
          }}
        >
          {linkText}
        </Text>
      </View>
    </View>
  )
}

const TestPage = () => {
  const theme = useTheme()
  return (
    <PageContainer>
      <View
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          paddingHorizontal: theme.spacing(4),
          gap: theme.spacing(6),
        }}
      />
    </PageContainer>
  )
}

export default TestPage
