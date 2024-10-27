import styled from '@emotion/native'
import { useTheme } from '@emotion/react'
import { forwardRef } from 'react'
import { TextInput as RNTextInput } from 'react-native'

import { Typography, TypographyCustomProps } from '../Typography'

interface CustomTextInputProps {
  size: 'default' | 'sm' | 'lg'
  errorMessage?: string | null
  slots?: {
    label?: {
      typographyProps?: Pick<
        TypographyCustomProps,
        'size' | 'family' | 'weight'
      >
    }
  }
}

const StyledTextInput = styled(RNTextInput)<CustomTextInputProps>(({
  theme,
  size,
}) => {
  const sizeMap = {
    lg: {
      fontSize: theme.spacing(theme.fontSize.lg),
      height: theme.spacing(11),
      paddingHorizontal: theme.spacing(3.5),
      paddingVertical: theme.spacing(2.25),
    },
    default: {
      fontSize: theme.spacing(theme.fontSize.sm),
      height: theme.spacing(10),
      paddingHorizontal: theme.spacing(3),
      paddingVertical: theme.spacing(2),
    },
    sm: {
      height: theme.spacing(9),
      fontSize: theme.spacing(theme.fontSize.xs),
      paddingHorizontal: theme.spacing(2.5),
      paddingVertical: theme.spacing(1.75),
    },
  }
  return {
    width: '100%',
    borderRadius: theme.spacing(1),
    borderWidth: theme.spacing(0.25),
    borderColor: theme.borderColor.gray[600],
    backgroundColor: theme.backgroundColor.background,
    fontWeight: '500',
    color: theme.borderColor.gray[600],
    ...sizeMap[size],
  }
})

// const StyledLabel = styled.Text(({ theme }) => {
//   return {
//     fontSize: theme.spacing(theme.fontSize.sm),
//     lineHeight: theme.spacing(theme.lineHeight.sm),
//     fontWeight: '500',
//     color: theme.textColor.foreground,
//   }
// })

const StyledInputContainer = styled.View(({ theme }) => {
  return {
    width: '100%',
    gap: theme.spacing(1.5),
    paddingVertical: theme.spacing(4),
  }
})

export interface InputProps
  extends React.ComponentPropsWithoutRef<typeof RNTextInput>,
    Partial<CustomTextInputProps> {
  label?: string
}

export const TextInput = forwardRef<
  React.ElementRef<typeof RNTextInput>,
  InputProps
>(({ label, size = 'default', errorMessage, slots, ...restProps }, ref) => {
  const theme = useTheme()
  return (
    <StyledInputContainer>
      {label ? (
        <Typography {...slots?.label?.typographyProps}>{label}</Typography>
      ) : null}
      <StyledTextInput
        placeholder="placeholder..."
        placeholderTextColor={theme.borderColor.gray[400]}
        size={size}
        ref={ref}
        {...restProps}
      />
      {!!errorMessage && (
        <Typography
          size="xs"
          styles={(_theme) => ({
            color: _theme.textColor.destructive.DEFAULT,
            position: 'absolute',
            bottom: 0,
          })}
        >
          {errorMessage}
        </Typography>
      )}
    </StyledInputContainer>
  )
})

TextInput.displayName = 'TextInput'
