import styled, { ReactNativeStyle } from '@emotion/native'
import { Theme } from '@emotion/react'
import { forwardRef } from 'react'
import { TouchableOpacity } from 'react-native'

type TButtonVariants =
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link'

type TButtonSizes = 'default' | 'sm' | 'lg' | 'icon'

interface ButtonCustomProps {
  variant: TButtonVariants
  size: TButtonSizes
  styles?: ReactNativeStyle | ((theme: Theme) => ReactNativeStyle)
}

const StyledButton = styled.TouchableOpacity<ButtonCustomProps>(
  ({ theme, variant, size, styles, disabled }) => {
    const variants: Record<TButtonVariants, Record<string, unknown>> = {
      default: {
        backgroundColor: theme.color.background.primary,
        height: theme.spacing(10),
        paddingHorizontal: theme.spacing(4),
        paddingVertical: theme.spacing(2),
        borderRadius: theme.spacing(1),
      },
      destructive: {
        backgroundColor: theme.color.background.destructive,
      },
      outline: {
        borderWidth: theme.spacing(0.25),
        borderColor: theme.color.border.input,
        backgroundColor: theme.color.background.base,
      },
      ghost: {
        backgroundColor: theme.color.foreground.primary,
      },
      link: {
        backgroundColor: theme.color.foreground.primary,
      },
      secondary: {
        backgroundColor: theme.color.background.secondary,
      },
    }
    const sizes: Record<TButtonSizes, Record<string, unknown>> = {
      default: {
        height: theme.spacing(10),
        paddingHorizontal: theme.spacing(4),
        paddingVertical: theme.spacing(2),
        borderRadius: theme.spacing(1),
      },
      sm: {
        height: theme.spacing(9),
        borderRadius: theme.spacing(1.5),
        paddingHorizontal: theme.spacing(3),
      },
      lg: {
        height: theme.spacing(11),
        borderRadius: theme.spacing(3),
        paddingHorizontal: theme.spacing(8),
      },
      icon: {
        width: theme.spacing(10),
        height: theme.spacing(10),
      },
    }

    return {
      justifyContent: 'center',
      ...variants[variant],
      ...sizes[size],
      opacity: disabled ? 0.7 : 1,
      ...(typeof styles === 'function' ? styles(theme) : styles),
    }
  }
)

const StyledText = styled.Text<{ variant: TButtonVariants }>(
  ({ theme, variant }) => {
    const variants: Record<
      ButtonCustomProps['variant'],
      Record<string, unknown>
    > = {
      default: {
        color: theme.color.foreground.primary,
      },
      destructive: {
        color: theme.color.foreground.destructive,
      },
      outline: {
        color: theme.color.foreground.base,
      },
      ghost: {
        color: theme.color.foreground.base,
      },
      link: {
        color: theme.color.foreground.base,
        textDecorationLine: 'underline',
      },
      secondary: {
        color: theme.color.foreground.secondary,
      },
    }
    return {
      ...variants[variant],
      lineHeight: theme.spacing(theme.typography.lineHeight.sm),
      fontSize: theme.spacing(theme.typography.fontSize.sm),
      fontWeight: '500',
    }
  }
)

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof TouchableOpacity>,
    Partial<ButtonCustomProps> {
  label?: string
}

export const Button = forwardRef<
  React.ElementRef<typeof TouchableOpacity>,
  ButtonProps
>(
  (
    {
      variant = 'default',
      size = 'default',
      label,
      styles,
      children,
      ...restProps
    },
    ref
  ) => {
    return (
      <StyledButton
        activeOpacity={0.2}
        size={size}
        variant={variant}
        ref={ref}
        styles={styles}
        {...restProps}
      >
        {label && <StyledText variant={variant}>{label}</StyledText>}
        {children}
      </StyledButton>
    )
  }
)
Button.displayName = 'Button'
