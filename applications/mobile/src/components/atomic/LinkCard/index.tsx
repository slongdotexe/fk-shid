import { useTheme } from '@emotion/react'
import { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'

import { Typography } from '../Typography'

export const LinkCard = ({
  titleText,
  linkText,
}: {
  titleText?: string | null
  linkText?: string | null
}) => {
  const theme = useTheme()

  const [textExpended, setTextExpended] = useState(false)

  return (
    <View
      style={{
        width: '100%',
        gap: theme.spacing(2),
        justifyContent: 'flex-start',
      }}
    >
      <Typography numberOfLines={6} family="body" weight="normal" size="sm">
        {titleText}
      </Typography>
      <TouchableOpacity
        activeOpacity={0.65}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: theme.spacing(36),
          backgroundColor: theme.backgroundColor.gray[800],
          borderRadius: theme.spacing(4),
          padding: theme.spacing(8),
        }}
        onPress={() => setTextExpended((old) => !old)}
      >
        <Typography
          ellipsizeMode="tail"
          numberOfLines={textExpended ? 0 : 6}
          family="body"
          weight="normal"
          size="sm"
          styles={{
            color: theme.textColor.gray[200],
          }}
        >
          {linkText}
        </Typography>
      </TouchableOpacity>
    </View>
  )
}
