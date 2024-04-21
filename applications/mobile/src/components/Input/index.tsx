import styled from '@emotion/native'
import { useTheme } from '@emotion/react'
import { forwardRef } from 'react'
import { TextInput as RNTextInput } from 'react-native'

interface CustomTextInputProps {
  size: 'default' | 'sm'
}

const StyledTextInput = styled(RNTextInput)<CustomTextInputProps>(({
  theme,
  size,
}) => {
  const sizeMap = {
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
    borderColor: theme.borderColor.input,
    backgroundColor: theme.backgroundColor.background,

    fontWeight: '500',
    color: theme.textColor.primary.DEFAULT,
    ...sizeMap[size],
  }
})

const StyledLabel = styled.Text(({ theme }) => {
  return {
    fontSize: theme.spacing(theme.fontSize.sm),
    lineHeight: theme.spacing(theme.lineHeight.sm),
    fontWeight: '500',
    color: theme.textColor.foreground,
  }
})

const StyledInputContainer = styled.View(({ theme }) => {
  return {
    width: '100%',
    gap: theme.spacing(1.5),
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
>(({ label, size = 'default', ...restProps }, ref) => {
  const theme = useTheme()
  return (
    <StyledInputContainer>
      {label ? <StyledLabel>{label}</StyledLabel> : null}
      <StyledTextInput
        placeholder="placeholder..."
        placeholderTextColor={theme.textColor.muted.DEFAULT}
        size={size}
        ref={ref}
        {...restProps}
      />
    </StyledInputContainer>
  )
})

TextInput.displayName = 'TextInput'
