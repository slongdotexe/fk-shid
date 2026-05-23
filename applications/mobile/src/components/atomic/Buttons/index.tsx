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
        backgroundColor: disabled
          ? theme.color.background.disabled
          : theme.color.action.primaryBg,
      },
      destructive: {
        backgroundColor: disabled
          ? theme.color.background.disabled
          : theme.color.status.error.solid,
      },
      outline: {
        borderWidth: theme.spacing(0.25),
        borderColor: disabled
          ? theme.color.border.muted
          : theme.color.border.input,
        backgroundColor: theme.color.surface.app,
      },
      secondary: {
        backgroundColor: disabled
          ? theme.color.background.disabled
          : theme.color.action.secondaryBg,
      },
      ghost: {
        backgroundColor: 'transparent',
      },
      link: {
        backgroundColor: 'transparent',
      },
    }
    const sizes: Record<TButtonSizes, Record<string, unknown>> = {
      default: {
        height: theme.spacing(10),
        paddingHorizontal: theme.spacing(4),
        paddingVertical: theme.spacing(2),
        borderRadius: theme.spacing(1.5),
      },
      sm: {
        height: theme.spacing(9),
        borderRadius: theme.spacing(1.5),
        paddingHorizontal: theme.spacing(3),
      },
      lg: {
        height: theme.spacing(11),
        borderRadius: theme.spacing(1.5),
        paddingHorizontal: theme.spacing(8),
      },
      icon: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        borderRadius: theme.spacing(1.5),
      },
    }

    return {
      justifyContent: 'center',
      alignItems: 'center',
      ...variants[variant],
      ...sizes[size],
      ...(typeof styles === 'function' ? styles(theme) : styles),
    }
  }
)

const StyledText = styled.Text<{
  variant: TButtonVariants
  disabled?: boolean
}>(({ theme, variant, disabled }) => {
  const variants: Record<
    ButtonCustomProps['variant'],
    Record<string, unknown>
  > = {
    default: {
      color: disabled
        ? theme.color.text.disabled
        : theme.color.text.onPrimary,
    },
    destructive: {
      color: disabled
        ? theme.color.text.disabled
        : theme.color.text.onPrimary,
    },
    outline: {
      color: disabled
        ? theme.color.text.disabled
        : theme.color.text.high,
    },
    ghost: {
      color: disabled
        ? theme.color.text.disabled
        : theme.color.text.high,
    },
    link: {
      color: disabled
        ? theme.color.text.disabled
        : theme.color.text.link,
      textDecorationLine: 'underline',
    },
    secondary: {
      color: disabled
        ? theme.color.text.disabled
        : theme.color.action.secondaryFg,
    },
  }
  return {
    ...variants[variant],
    lineHeight: theme.spacing(theme.typography.lineHeight.sm),
    fontSize: theme.spacing(theme.typography.fontSize.sm),
    fontWeight: theme.typography.fontWeight.medium,
  }
})

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
        activeOpacity={0.7}
        size={size}
        variant={variant}
        ref={ref}
        styles={styles}
        {...restProps}
      >
        {label && (
          <StyledText variant={variant} disabled={restProps.disabled}>
            {label}
          </StyledText>
        )}
        {children}
      </StyledButton>
    )
  }
)
Button.displayName = 'Button'
