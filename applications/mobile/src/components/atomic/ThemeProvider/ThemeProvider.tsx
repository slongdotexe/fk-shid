import { ThemeProvider as EmotionThemeProvider } from '@emotion/react'
import { Platform } from 'react-native'

import { darkTheme, theme } from './new-theme'

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const activeTheme = darkTheme

  return (
    <EmotionThemeProvider
      theme={{
        ...activeTheme,
        platform: Platform.OS,
      }}
    >
      {children}
    </EmotionThemeProvider>
  )
}

export type TTheme = typeof theme

declare module '@emotion/react' {
  export interface Theme extends TTheme {
    platform: (typeof Platform)['OS']
  }
}
