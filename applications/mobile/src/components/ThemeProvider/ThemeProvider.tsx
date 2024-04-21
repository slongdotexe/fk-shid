import { ThemeProvider as EmotionThemeProvider } from '@emotion/react'
import { Platform } from 'react-native'

import { theme } from './theme'

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <EmotionThemeProvider
      theme={{
        ...theme,
        spacing: (units: number) => units * 4,
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
    spacing: (units: number) => number
    platform: (typeof Platform)['OS']
  }
}
