import styled, { ReactNativeStyle } from '@emotion/native'
import { Theme, useTheme } from '@emotion/react'
import { Typography } from '../Typography'
import { View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { forwardRef } from 'react'

type TAlertVariants = 'default' | 'destructive'

interface AlertCustomProps {
  variant: TAlertVariants

  styles?: ReactNativeStyle | ((theme: Theme) => ReactNativeStyle)
}

const StyledAlert = styled.View<AlertCustomProps>(({ theme, styles }) => {
  const variants = {
    backgroundColor: theme.backgroundColor.secondary.DEFAULT,
    paddingHorizontal: theme.spacing(4),
    paddingVertical: theme.spacing(2),
    borderRadius: theme.spacing(1),
    borderColor: theme.borderColor.gray[600],
    borderWidth: 1,
    gap: theme.spacing(1),
  }
  return {
    ...variants,
    ...(typeof styles === 'function' ? styles(theme) : styles),
  }
})

export interface AlertProps
  extends React.ComponentPropsWithoutRef<typeof View>,
    Partial<AlertCustomProps> {
  alertDescription?: string
  alertTitle?: string
}

// export function Alert({ alertDescription, alertTitle }: AlertProps) {
export const Alert = forwardRef<React.ComponentRef<typeof View>, AlertProps>(
  ({ alertTitle, alertDescription, styles }, ref) => {
    const theme = useTheme()
    return (
      <StyledAlert styles={styles} variant="default">
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <Ionicons
            color={theme.textColor.gray[200]}
            size={theme.spacing(theme.fontSize.xl)}
            name="information-circle-outline"
          />

          {alertTitle && (
            <Typography family="heading" weight="normal" size="lg">
              {alertTitle}
            </Typography>
          )}
        </View>
        {alertDescription && (
          <Typography family="body" weight="normal" size="sm">
            {alertDescription}
          </Typography>
        )}
      </StyledAlert>
    )
  }
)
