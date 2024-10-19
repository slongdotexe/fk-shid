/* eslint-disable @typescript-eslint/no-unused-vars -- --*/
import styled, { ReactNativeStyle } from '@emotion/native'
import { Theme, useTheme } from '@emotion/react'
import { forwardRef } from 'react'
import { View as RNView, Text as RNText } from 'react-native'

interface CustomCardProps {
  fullWidth?: boolean
  styles?: ReactNativeStyle | ((theme: Theme) => ReactNativeStyle)
}

interface CardProps
  extends React.ComponentPropsWithoutRef<typeof RNView>,
    Partial<CustomCardProps> {}

const StyledCard = styled.View<CustomCardProps>(
  ({ theme, fullWidth, styles }) => {
    return {
      borderRadius: theme.spacing(1),
      backgroundColor: theme.backgroundColor.card.DEFAULT,
      borderColor: theme.borderColor.primary.DEFAULT,
      borderWidth: theme.spacing(0.25),
      width: fullWidth ? '100%' : 'auto',
      paddingHorizontal: theme.spacing(4),
      paddingVertical: theme.spacing(4),
      ...(typeof styles === 'function' ? styles(theme) : styles),
    }
  }
)

export const Card = forwardRef<React.ElementRef<typeof RNView>, CardProps>(
  ({ children, fullWidth, ...restProps }, ref) => {
    const theme = useTheme()
    return (
      <StyledCard fullWidth={fullWidth} {...restProps} ref={ref}>
        {children}
      </StyledCard>
    )
  }
)
Card.displayName = 'Card'

interface CustomCardTitleProps {
  styles?: ReactNativeStyle | ((theme: Theme) => ReactNativeStyle)
}

interface CardTitleProps
  extends React.ComponentPropsWithoutRef<typeof RNView>,
    Partial<CustomCardProps> {}

const StyledCardTitle = styled.Text<CustomCardTitleProps>(
  ({ theme, styles }) => {
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Issue with theme types
      fontWeight: theme.fontWeight.semibold as any,
      fontSize: theme.spacing(6),
      color: theme.textColor.primary.DEFAULT,
      ...(typeof styles === 'function' ? styles(theme) : styles),
    }
  }
)

export const CardTitle = forwardRef<
  React.ElementRef<typeof RNText>,
  CardTitleProps
>(({ children, ...restProps }, ref) => {
  const theme = useTheme()
  return (
    <StyledCardTitle ref={ref} {...restProps}>
      {children}
    </StyledCardTitle>
  )
})
CardTitle.displayName = 'CardTitle'

interface CustomCardContentProps {
  styles?: ReactNativeStyle | ((theme: Theme) => ReactNativeStyle)
}
interface CardContentProps
  extends React.ComponentPropsWithoutRef<typeof RNView>,
    Partial<CustomCardContentProps> {}

const StyledCardContent = styled.View<CustomCardContentProps>(
  ({ theme, styles }) => {
    return {
      padding: theme.spacing(6),
      paddingTop: 0,

      ...(typeof styles === 'function' ? styles(theme) : styles),
    }
  }
)

export const CardContent = forwardRef<
  React.ElementRef<typeof RNView>,
  CardContentProps
>(({ children, ...restProps }, ref) => {
  const theme = useTheme()
  return (
    <StyledCardContent ref={ref} {...restProps}>
      {children}
    </StyledCardContent>
  )
})
CardContent.displayName = 'CardContent'

interface CustomCardFooterProps {
  styles?: ReactNativeStyle | ((theme: Theme) => ReactNativeStyle)
}
interface CardFooterProps
  extends React.ComponentPropsWithoutRef<typeof RNView>,
    Partial<CustomCardFooterProps> {}

const StyledCardFooter = styled.View<CustomCardFooterProps>(
  ({ theme, styles }) => {
    return {
      padding: theme.spacing(6),
      paddingTop: 0,
      ...(typeof styles === 'function' ? styles(theme) : styles),
    }
  }
)

export const CardFooter = forwardRef<
  React.ElementRef<typeof RNView>,
  CardFooterProps
>(({ children, ...restProps }, ref) => {
  const theme = useTheme()
  return (
    <StyledCardFooter ref={ref} {...restProps}>
      {children}
    </StyledCardFooter>
  )
})
CardFooter.displayName = 'CardFooter'
