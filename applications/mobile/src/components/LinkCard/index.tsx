import { useTheme } from '@emotion/react'
import { useState } from 'react'
import { View, Pressable, LayoutChangeEvent } from 'react-native'
import Animated, {
  useAnimatedStyle,
  withTiming,
  interpolateColor,
  useSharedValue,
  Easing,
} from 'react-native-reanimated'

import { Typography } from '../atomic/Typography'

const PADDING = 6
const ANIMATION_DURATION = 150
const MIN_HEIGHT = 25 // Spacing units for minimum height

interface LinkCardProps {
  titleText?: string | null
  linkText?: string | null
  onPress?: () => void
}

export const LinkCard = ({ titleText, linkText, onPress }: LinkCardProps) => {
  const theme = useTheme()
  const [isExpanded, setIsExpanded] = useState(false)
  const pressed = useSharedValue(0)
  const [isInitialized, setIsInitialized] = useState(false)

  const collapsedHeight = useSharedValue(0)
  const expandedHeight = useSharedValue(0)
  const animatedHeight = useSharedValue(-1) // -1 means not yet measured

  const paddingHorizontal = theme.spacing(PADDING)
  const paddingVertical = theme.spacing(PADDING)
  const minHeight = theme.spacing(MIN_HEIGHT)

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      pressed.value,
      [0, 1],
      [theme.backgroundColor.gray[800], theme.backgroundColor.gray[700]]
    )

    return {
      backgroundColor,
    }
  })

  const animatedHeightStyle = useAnimatedStyle(() => {
    if (animatedHeight.value === -1) {
      return {}
    }

    const targetHeight = isExpanded
      ? expandedHeight.value
      : collapsedHeight.value

    return {
      height: withTiming(targetHeight, {
        duration: ANIMATION_DURATION,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
      }),
    }
  })

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev)
    if (onPress) onPress()
  }

  const onCollapsedLayout = (event: LayoutChangeEvent) => {
    if (collapsedHeight.value !== 0) {
      return
    }

    // Calculate height with additional space for two text lines
    // Use a line height multiplier to ensure two lines fit
    const twoLineHeight = event.nativeEvent.layout.height * 1.275
    const height = Math.max(twoLineHeight + paddingVertical * 2, minHeight)
    collapsedHeight.value = height

    // Initialize animatedHeight after first measurement
    if (animatedHeight.value === -1) {
      animatedHeight.value = height
      setIsInitialized(true)
    }
  }

  const onExpandedLayout = (event: LayoutChangeEvent) => {
    const height = Math.max(
      event.nativeEvent.layout.height + paddingVertical * 2,
      minHeight // Ensure expanded height is never less than minHeight
    )
    expandedHeight.value = height
  }

  // Only render if we actually have text content
  if (!titleText && !linkText) return null

  return (
    <View style={{ gap: theme.spacing(2), justifyContent: 'flex-start' }}>
      {/* Title section remains unchanged */}
      {titleText && (
        <Typography family="body" weight="normal" size="md">
          {titleText}
        </Typography>
      )}

      <Pressable
        onPress={toggleExpanded}
        onPressIn={() => {
          pressed.value = withTiming(1, { duration: 50 })
        }}
        onPressOut={() => {
          pressed.value = withTiming(0, { duration: 100 })
        }}
      >
        <Animated.View
          style={[
            {
              backgroundColor: theme.backgroundColor.gray[800],
              borderRadius: theme.spacing(4),
              overflow: 'hidden',
              paddingHorizontal,
              paddingVertical,
              minHeight, // Use the extracted minHeight constant
              justifyContent: 'center',
            },
            animatedStyle,
            isInitialized ? animatedHeightStyle : {},
          ]}
        >
          {/* Rest of component remains unchanged */}
          {/* Hidden measurement view for expanded height */}
          <View
            style={{ position: 'absolute', opacity: 0, width: '100%' }}
            onLayout={onExpandedLayout}
          >
            <Typography family="body" weight="normal" size="sm">
              {linkText || ''}
            </Typography>
          </View>

          {/* Visible text */}
          <View onLayout={onCollapsedLayout} style={{ width: '100%' }}>
            <Typography
              ellipsizeMode="tail"
              numberOfLines={isExpanded ? undefined : 2}
              family="body"
              weight="normal"
              size="sm"
              style={{ color: theme.textColor.gray[200] }}
            >
              {linkText || ''}
            </Typography>
          </View>
        </Animated.View>
      </Pressable>
    </View>
  )
}
