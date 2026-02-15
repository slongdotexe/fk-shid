/**
 * - Backgrounds
  - Blue: 1-2
  - Gray: 1-2
- Interactive Components:
  - Blue: 3-5
  - Gray: 3-5
- Borders and Separators
  - Blue: 6-8
  - Gray: 6-8
 * 
 */

/**
 * NEW THEME STRUCTURE - IMPLEMENTED ✓
 * ====================================
 *
 * Goals:
 * 1. Consistent, predictable naming (no .DEFAULT suffix) ✓
 * 2. Semantic color organization ✓
 * 3. Clear separation of concerns ✓
 * 4. TypeScript-friendly structure ✓
 *
 * STRUCTURE:
 *
 * theme.color.background.{semantic}    - All background colors
 * theme.color.foreground.{semantic}    - All text/foreground colors
 * theme.color.border.{semantic}        - All border colors
 * theme.color.success.{property}       - Success state colors
 * theme.color.{gray|blue|red|green}    - Full Radix UI color scales
 * theme.typography.fontFamily.{family} - Font families
 * theme.typography.fontSize.{size}     - Font sizes (multipliers)
 * theme.typography.lineHeight.{size}   - Line heights (multipliers)
 * theme.typography.fontWeight.{weight} - Font weights
 * theme.spacing(multiplier)            - Spacing utility (base 4px)
 *
 * MIGRATION COMPLETED:
 *
 * backgroundColor.primary.DEFAULT      → color.background.primary ✓
 * backgroundColor.primary.foreground   → color.foreground.primary ✓
 * backgroundColor.destructive.DEFAULT  → color.background.destructive ✓
 * backgroundColor.destructive.foreground → color.foreground.destructive ✓
 * backgroundColor.secondary.DEFAULT    → color.background.secondary ✓
 * backgroundColor.background           → color.background.base ✓
 * backgroundColor.card.DEFAULT         → color.background.card ✓
 * backgroundColor.gray[800]            → color.gray.gray8 ✓
 *
 * textColor.foreground                 → color.foreground.base ✓
 * textColor.primary.DEFAULT            → color.foreground.base ✓
 * textColor.secondary.foreground       → color.foreground.secondary ✓
 * textColor.destructive.DEFAULT        → color.foreground.destructive ✓
 * textColor.gray[200]                  → color.gray.gray11 ✓
 *
 * borderColor.input                    → color.border.input ✓
 * borderColor.primary.DEFAULT          → color.border.primary ✓
 * borderColor.gray[600]                → color.gray.gray7 ✓
 * borderColor.green[700]               → color.success.border ✓
 *
 * fontFamily.sans                      → typography.fontFamily.sans ✓
 * fontSize.sm                          → typography.fontSize.sm ✓
 * lineHeight.sm                        → typography.lineHeight.sm ✓
 * fontWeight.medium                    → typography.fontWeight.medium ✓
 *
 * COMPONENTS REFACTORED:
 * - Button ✓
 * - Card (Card, CardTitle, CardContent, CardFooter) ✓
 * - Typography ✓
 * - Input (TextInput) ✓
 * - Alert ✓
 * - PageContainer (SafeArea, PageContainer) ✓
 * - LinkCard ✓
 * - Toast ✓
 * - ThemeProvider ✓
 */

import {
  gray,
  blue,
  red,
  green,
  grayDark,
  blueDark,
  redDark,
  greenDark,
} from '@radix-ui/colors'

// console.log({ kp: blueDarkP3.blue1 })
const BASE_SPACING = 4
const commonTheme = {
  typography: {
    fontFamily: {
      sans: 'System' as const,
      serif: 'Georgia' as const,
    },
    fontSize: {
      xs: 3, // 12px
      sm: 3.5, // 14px
      base: 4, // 16px
      lg: 4.5, // 18px
      xl: 5, // 20px
      '2xl': 6, // 24px
      '3xl': 7.5, // 30px
      '4xl': 9, // 36px
    },
    lineHeight: {
      xs: 4, // 16px
      sm: 5, // 20px
      base: 6, // 24px
      lg: 7, // 28px
      xl: 7, // 28px
      '2xl': 8, // 32px
      '3xl': 9, // 36px
      '4xl': 10, // 40px
    },
    fontWeight: {
      normal: '400' as const,
      medium: '500' as const,
      semibold: '600' as const,
      bold: '700' as const,
      extrabold: '800' as const,
    },
  },
  spacing: (multiplier: number): number => BASE_SPACING * multiplier,
} as const

type ColorConfig = {
  background: {
    base: string
    card: string
    primary: string
    secondary: string
    destructive: string
    muted: string
    accent: string
    pressed: string
    disabled: string
  }
  foreground: {
    base: string
    primary: string
    secondary: string
    destructive: string
    muted: string
    accent: string
    disabled: string
  }
  border: {
    primary: string
    input: string
    muted: string
    default: string
  }
  input: {
    placeholder: string
  }
  success: {
    background: string
    foreground: string
    border: string
  }
  typography: {
    base: string
    secondary: string
    muted: string
    accent: string
    link: string
  }
  gray: Record<string, string>
  blue: Record<string, string>
  red: Record<string, string>
  green: Record<string, string>
}

function createTheme(colorConfig: ColorConfig) {
  return {
    color: {
      ...colorConfig,
      // Move typography colors into the typography namespace
    },
    typography: {
      ...commonTheme.typography,
      color: colorConfig.typography,
    },
    spacing: commonTheme.spacing,
  } as const
}

export const theme = createTheme({
  background: {
    base: blue.blue1, // Generic background - subtle blue tint (Radix 1-2)
    card: gray.gray2, // Card backgrounds - gray for contrast (Radix 1-2)
    primary: blue.blue9, // Primary action backgrounds (Radix 9)
    secondary: gray.gray3, // Secondary backgrounds - interactive (Radix 3-5)
    destructive: red.red9, // Destructive action backgrounds (Radix 9)
    muted: gray.gray2, // Muted backgrounds (Radix 1-2)
    accent: blue.blue4, // Accent interactive surfaces (Radix 3-5)
    pressed: blue.blue5, // Pressed state for interactive elements (Radix 3-5)
    disabled: gray.gray3, // Disabled background (Radix 3-5)
  },
  foreground: {
    base: gray.gray12, // Default text color (Radix 11-12)
    primary: gray.gray1, // Text on primary backgrounds - high contrast
    secondary: gray.gray11, // Secondary text (Radix 11-12)
    destructive: gray.gray1, // Text on destructive backgrounds
    muted: gray.gray10, // Muted text (Radix 9-10)
    accent: blue.blue11, // Accent text (Radix 11-12)
    disabled: gray.gray8, // Disabled text for contrast (Radix 9-10)
  },
  border: {
    primary: blue.blue7, // Primary borders (Radix 6-8)
    input: blue.blue7, // Input borders (Radix 6-8)
    muted: gray.gray6, // Subtle borders (Radix 6-8)
    default: gray.gray7, // Standard border (Radix 6-8)
  },
  input: {
    placeholder: gray.gray9, // Placeholder text (Radix 9-10)
  },
  success: {
    background: green.green9,
    foreground: gray.gray1,
    border: green.green7,
  },
  typography: {
    base: gray.gray12, // Primary text - high contrast (Radix 11-12)
    secondary: gray.gray11, // Secondary text - readable contrast (Radix 11-12)
    muted: gray.gray10, // Muted text - lower emphasis (Radix 9-10)
    accent: blue.blue11, // Accent text - blue tint for highlights (Radix 11-12)
    link: blue.blue11, // Link text - blue for interactivity (Radix 11-12)
  },
  gray, // Full gray scale (gray1-gray12)
  blue, // Full blue scale
  red, // Full red scale
  green, // Full green scale
})

export const darkTheme = createTheme({
  background: {
    base: '#0A0A0A',
    card: grayDark.gray3,
    primary: blueDark.blue5,
    secondary: grayDark.gray3,
    destructive: redDark.red9,
    muted: grayDark.gray2,
    accent: blueDark.blue4,
    pressed: blueDark.blue5,
    disabled: blueDark.blue2,
  },
  foreground: {
    base: grayDark.gray12,
    primary: grayDark.gray12,
    secondary: grayDark.gray11,
    destructive: grayDark.gray1,
    muted: grayDark.gray10,
    accent: blueDark.blue11,
    disabled: grayDark.gray11,
  },
  border: {
    primary: blueDark.blue7,
    input: blueDark.blue7,
    muted: grayDark.gray6,
    default: grayDark.gray7,
  },
  input: {
    placeholder: grayDark.gray9,
  },
  success: {
    background: greenDark.green9,
    foreground: grayDark.gray1,
    border: greenDark.green7,
  },
  typography: {
    base: grayDark.gray12,
    secondary: grayDark.gray11,
    muted: grayDark.gray10,
    accent: blueDark.blue11,
    link: blueDark.blue11,
  },
  gray: grayDark,
  blue: blueDark,
  red: redDark,
  green: greenDark,
})

export type Theme = ReturnType<typeof createTheme>

// Export color config type for custom theme creation
export type { ColorConfig }
