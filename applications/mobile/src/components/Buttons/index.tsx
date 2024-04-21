import styled from '@emotion/native'
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
}

const StyledButton = styled.TouchableOpacity<ButtonCustomProps>(
  ({ theme, variant, size }) => {
    const variants: Record<TButtonVariants, Record<string, unknown>> = {
      default: {
        backgroundColor: theme.backgroundColor.primary.DEFAULT,
        height: theme.spacing(10),
        paddingHorizontal: theme.spacing(4),
        paddingVertical: theme.spacing(2),
        borderRadius: theme.spacing(1),
      },
      destructive: {
        backgroundColor: theme.backgroundColor.destructive.DEFAULT,
      },
      outline: {
        borderWidth: theme.spacing(0.25),
        borderColor: theme.borderColor.input,
        backgroundColor: theme.backgroundColor.background,
      },
      ghost: {
        backgroundColor: theme.backgroundColor.primary.foreground,
      },
      link: {
        backgroundColor: theme.backgroundColor.primary.foreground,
      },
      secondary: {
        backgroundColor: theme.backgroundColor.secondary.DEFAULT,
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
        color: theme.backgroundColor.primary.foreground,
      },
      destructive: {
        color: theme.backgroundColor.destructive.foreground,
      },
      outline: {
        color: theme.textColor.foreground,
      },
      ghost: {
        color: theme.textColor.foreground,
      },
      link: {
        color: theme.textColor.foreground,
        textDecorationLine: 'underline',
      },
      secondary: {
        color: theme.textColor.secondary.foreground,
      },
    }
    return {
      ...variants[variant],
      lineHeight: theme.spacing(theme.lineHeight.sm),
      fontSize: theme.spacing(theme.fontSize.sm),
      fontWeight: '500',
    }
  }
)

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof TouchableOpacity>,
    Partial<ButtonCustomProps> {
  label: string
}

export const Button = forwardRef<
  React.ElementRef<typeof TouchableOpacity>,
  ButtonProps
>(({ variant = 'default', size = 'default', label, ...restProps }, ref) => {
  return (
    <StyledButton
      activeOpacity={0.2}
      size={size}
      variant={variant}
      ref={ref}
      {...restProps}
    >
      <StyledText variant={variant}>{label}</StyledText>
    </StyledButton>
  )
})
Button.displayName = 'Button'
