import { ThemeProvider as EmotionThemeProvider } from '@emotion/react'
import { Platform } from 'react-native'

import { theme } from './theme'

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Temporary hack. TODO: Fix the theme and replace
  const joinedMonoFontFamily = Object.values(theme.fontFamily.mono).join(', ')
  const joinedSerifFontFamily = Object.values(theme.fontFamily.serif).join(', ')
  const joinedSansSerifFontFamily = Object.values(theme.fontFamily.sans).join(
    ', '
  )
  return (
    <EmotionThemeProvider
      theme={{
        ...theme,
        fontFamily: {
          mono: joinedMonoFontFamily,
          serif: joinedSerifFontFamily,
          sans: joinedSansSerifFontFamily,
        },
        spacing: (units: number) => units * 4,
        platform: Platform.OS,
      }}
    >
      {children}
    </EmotionThemeProvider>
  )
}

export type TTheme = Omit<typeof theme, 'fontFamily'> & {
  fontFamily: {
    mono: string
    serif: string
    sans: string
  }
}

declare module '@emotion/react' {
  export interface Theme extends TTheme {
    spacing: (units: number) => number
    platform: (typeof Platform)['OS']
  }
}
