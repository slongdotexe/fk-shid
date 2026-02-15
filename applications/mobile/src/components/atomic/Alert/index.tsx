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
    backgroundColor: theme.color.background.card,
    paddingHorizontal: theme.spacing(4),
    paddingVertical: theme.spacing(2),
    borderRadius: theme.spacing(1),
    borderColor: theme.color.border.default,
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

export const Alert = forwardRef<React.ComponentRef<typeof View>, AlertProps>(
  ({ alertTitle, alertDescription, styles }, ref) => {
    const theme = useTheme()
    return (
      <StyledAlert styles={styles} variant="default">
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <Ionicons
            color={theme.color.typography.base}
            size={theme.spacing(theme.typography.fontSize.xl)}
            name="information-circle-outline"
          />
          {alertTitle && (
            <Typography family="body" weight="semibold" size="lg">
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
