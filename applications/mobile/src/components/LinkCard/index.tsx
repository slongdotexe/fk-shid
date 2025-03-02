import { useTheme } from '@emotion/react'
import { useState, useCallback, useEffect, useRef } from 'react'
import { TouchableOpacity, View, LayoutChangeEvent } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated'

import { Typography } from '../atomic/Typography'

const COLLAPSED_HEIGHT = 100
const ANIMATION_DURATION = 200
const PADDING = 6

interface LinkCardProps {
  titleText?: string | null
  linkText?: string | null
}
export const LinkCard = ({ titleText, linkText }: LinkCardProps) => {
  const theme = useTheme()

  const [isExpanded, setIsExpanded] = useState(false)
  const [fullTextHeight, setFullTextHeight] = useState(0)
  const [fullTextMeasured, setFullTextMeasured] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const animatingHeight = useSharedValue(0)
  const progress = useSharedValue(0)
  const prevLinkTextRef = useRef(linkText)

  const isEmptyLinkText = linkText?.trim() === ''
  // Account for padding on all sides (vertical padding is 2x)
  const totalPadding = theme.spacing(PADDING * 2) + PADDING * 2
  const needsVerticalCentering =
    fullTextMeasured &&
    fullTextHeight < COLLAPSED_HEIGHT - theme.spacing(PADDING * 2)

  useEffect(() => {
    if (prevLinkTextRef.current === linkText) {
      return
    }
    prevLinkTextRef.current = linkText

    // Store current height for animation before resetting measurement flag
    if (fullTextMeasured) {
      animatingHeight.value = fullTextHeight
    }

    // Reset height measurement flag
    setFullTextMeasured(false)

    // If text is cleared or changed and was previously expanded, animate collapse
    if (isExpanded || isEmptyLinkText) {
      setIsExpanded(false)
      setIsAnimating(true)

      progress.value = withTiming(
        0,
        {
          duration: ANIMATION_DURATION,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        },
        (finished) => {
          if (!finished) {
            return
          }
          runOnJS(setIsAnimating)(false)
          // Only reset height after animation completes
          if (isEmptyLinkText) {
            runOnJS(setFullTextHeight)(0)
          }
        }
      )
    }
  }, [
    linkText,
    progress,
    isExpanded,
    fullTextHeight,
    fullTextMeasured,
    animatingHeight,
    isEmptyLinkText,
  ])

  const containerAnimStyle = useAnimatedStyle(() => {
    // Calculate expanded height directly in the animation style
    const heightToUse =
      isAnimating && isEmptyLinkText ? animatingHeight.value : fullTextHeight

    const expandedHeight = Math.max(
      COLLAPSED_HEIGHT,
      heightToUse + totalPadding
    )

    return {
      height:
        COLLAPSED_HEIGHT + (expandedHeight - COLLAPSED_HEIGHT) * progress.value,
    }
  })

  const onHiddenTextLayout = useCallback(
    (event: LayoutChangeEvent) => {
      if (fullTextMeasured) {
        return
      }
      const { height } = event.nativeEvent.layout
      setFullTextHeight(height)
      setFullTextMeasured(true)
    },
    [fullTextMeasured]
  )

  const toggleExpand = useCallback(() => {
    // Don't allow expansion if there's no content
    if (isEmptyLinkText) {
      return
    }

    const newExpandedState = !isExpanded
    setIsExpanded((oldExpandedState) => !oldExpandedState)
    setIsAnimating(true)

    progress.value = withTiming(
      newExpandedState ? 1 : 0,
      {
        duration: ANIMATION_DURATION,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      },
      (finished) => {
        if (finished) {
          runOnJS(setIsAnimating)(false)
        }
      }
    )
  }, [isEmptyLinkText, isExpanded, progress])

  // Calculate spacing outside animation worklet
  const paddingHorizontal = theme.spacing(PADDING)
  const paddingVertical = theme.spacing(PADDING)

  const textContainerStyle = useAnimatedStyle(() => {
    // Center text only when it's short AND not expanding
    const shouldCenter =
      needsVerticalCentering && !isExpanded && progress.value === 0

    return {
      paddingHorizontal,
      paddingVertical,
      height: '100%',
      justifyContent: shouldCenter ? 'center' : 'flex-start',
    }
  })

  return (
    <View
      style={{
        gap: theme.spacing(2),
        justifyContent: 'flex-start',
      }}
    >
      <Typography family="body" weight="normal" size="md">
        {titleText}
      </Typography>
      {/* Hidden Text element to allow for sizing measurement measurements */}
      {!fullTextMeasured && linkText && (
        <View
          style={{
            position: 'absolute',
            opacity: 0,
            width: '100%',
            paddingHorizontal: theme.spacing(PADDING),
          }}
        >
          <Typography
            family="body"
            weight="normal"
            size="sm"
            style={{
              color: theme.textColor.gray[200],
            }}
            onLayout={onHiddenTextLayout}
          >
            {linkText}
          </Typography>
        </View>
      )}
      <Animated.View
        style={[
          containerAnimStyle,
          {
            backgroundColor: theme.backgroundColor.gray[800],
            borderRadius: theme.spacing(4),
            overflow: 'hidden',
          },
        ]}
      >
        <TouchableOpacity activeOpacity={0.65} onPress={toggleExpand}>
          <Animated.View style={textContainerStyle}>
            <Typography
              ellipsizeMode="tail"
              numberOfLines={isExpanded ? undefined : 6}
              family="body"
              weight="normal"
              size="sm"
              style={{
                color: theme.textColor.gray[200],
              }}
            >
              {linkText}
            </Typography>
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
}
