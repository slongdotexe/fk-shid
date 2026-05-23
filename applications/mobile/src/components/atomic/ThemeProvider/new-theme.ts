import {
  gray,
  blue,
  red,
  green,
  teal,
  slate,
  slateDark,
  iris,
  irisDark,
  cyan,
  cyanDark,
  ruby,
  rubyDark,
  jade,
  jadeDark,
  amber,
  amberDark,
  grayDark,
  blueDark,
  redDark,
  greenDark,
  tealDark,
} from '@radix-ui/colors'

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
  surface: {
    app: string
    subtle: string
    elevated: string
    hover: string
    active: string
  }
  action: {
    primaryBg: string
    primaryBgHover: string
    primaryFg: string
    secondaryBg: string
    secondaryBgHover: string
    secondaryFg: string
  }
  text: {
    high: string
    medium: string
    low: string
    accent: string
    link: string
    onPrimary: string
    disabled: string
  }
  status: {
    success: {
      background: string
      solid: string
      text: string
      border: string
    }
    error: {
      background: string
      solid: string
      text: string
      border: string
    }
    warning: {
      background: string
      solid: string
      text: string
      border: string
    }
    info: {
      background: string
      solid: string
      text: string
      border: string
    }
  }
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
    strong: string
    focus: string
  }
  input: {
    background: string
    border: string
    borderFocus: string
    borderInvalid: string
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
  teal: Record<string, string>
  neutral: Record<string, string>
  brand: Record<string, string>
  accent: Record<string, string>
  warningScale: Record<string, string>
  errorScale: Record<string, string>
  successScale: Record<string, string>
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
  surface: {
    app: slate.slate1,
    subtle: slate.slate2,
    elevated: slate.slate3,
    hover: slate.slate4,
    active: slate.slate5,
  },
  action: {
    primaryBg: iris.iris9,
    primaryBgHover: iris.iris10,
    primaryFg: slate.slate1,
    secondaryBg: slate.slate3,
    secondaryBgHover: slate.slate4,
    secondaryFg: slate.slate12,
  },
  text: {
    high: slate.slate12,
    medium: slate.slate11,
    low: slate.slate10,
    accent: iris.iris11,
    link: cyan.cyan11,
    onPrimary: slate.slate1,
    disabled: slate.slate8,
  },
  status: {
    success: {
      background: jade.jade3,
      solid: jade.jade9,
      text: jade.jade11,
      border: jade.jade7,
    },
    error: {
      background: ruby.ruby3,
      solid: ruby.ruby9,
      text: ruby.ruby11,
      border: ruby.ruby7,
    },
    warning: {
      background: amber.amber3,
      solid: amber.amber9,
      text: amber.amber11,
      border: amber.amber7,
    },
    info: {
      background: blue.blue3,
      solid: blue.blue9,
      text: blue.blue11,
      border: blue.blue7,
    },
  },
  background: {
    // Compatibility aliases mapped to the new semantic groups.
    base: slate.slate1,
    card: slate.slate2,
    primary: iris.iris9,
    secondary: slate.slate3,
    destructive: ruby.ruby9,
    muted: slate.slate2,
    accent: cyan.cyan4,
    pressed: iris.iris10,
    disabled: slate.slate3,
  },
  foreground: {
    base: slate.slate12,
    primary: slate.slate1,
    secondary: slate.slate11,
    destructive: slate.slate1,
    muted: slate.slate10,
    accent: iris.iris11,
    disabled: slate.slate8,
  },
  border: {
    primary: slate.slate7,
    input: slate.slate7,
    muted: slate.slate6,
    default: slate.slate7,
    strong: slate.slate8,
    focus: iris.iris8,
  },
  input: {
    background: slate.slate2,
    border: slate.slate7,
    borderFocus: iris.iris8,
    borderInvalid: ruby.ruby8,
    placeholder: slate.slate10,
  },
  success: {
    background: green.green9,
    foreground: gray.gray1,
    border: green.green7,
  },
  typography: {
    base: slate.slate12,
    secondary: slate.slate11,
    muted: slate.slate10,
    accent: iris.iris11,
    link: cyan.cyan11,
  },
  gray, // Full gray scale (gray1-gray12)
  blue, // Full blue scale
  red, // Full red scale
  green, // Full green scale
  teal, // Full teal scale
  neutral: slate,
  brand: iris,
  accent: cyan,
  warningScale: amber,
  errorScale: ruby,
  successScale: jade,
})

export const darkTheme = createTheme({
  surface: {
    app: slateDark.slate1,
    subtle: slateDark.slate3,
    elevated: slateDark.slate4,
    hover: slateDark.slate5,
    active: slateDark.slate6,
  },
  action: {
    primaryBg: irisDark.iris9,
    primaryBgHover: irisDark.iris10,
    primaryFg: slateDark.slate1,
    secondaryBg: slateDark.slate3,
    secondaryBgHover: slateDark.slate4,
    secondaryFg: slateDark.slate12,
  },
  text: {
    high: slateDark.slate12,
    medium: slateDark.slate11,
    low: slateDark.slate10,
    accent: irisDark.iris11,
    link: cyanDark.cyan11,
    onPrimary: slateDark.slate1,
    disabled: slateDark.slate9,
  },
  status: {
    success: {
      background: jadeDark.jade3,
      solid: jadeDark.jade9,
      text: jadeDark.jade11,
      border: jadeDark.jade7,
    },
    error: {
      background: rubyDark.ruby3,
      solid: rubyDark.ruby9,
      text: rubyDark.ruby11,
      border: rubyDark.ruby7,
    },
    warning: {
      background: amberDark.amber3,
      solid: amberDark.amber9,
      text: amberDark.amber11,
      border: amberDark.amber7,
    },
    info: {
      background: blueDark.blue3,
      solid: blueDark.blue9,
      text: blueDark.blue11,
      border: blueDark.blue7,
    },
  },
  background: {
    base: slateDark.slate1,
    card: slateDark.slate3,
    primary: irisDark.iris9,
    secondary: slateDark.slate3,
    destructive: rubyDark.ruby9,
    muted: slateDark.slate2,
    accent: cyanDark.cyan4,
    pressed: irisDark.iris10,
    disabled: slateDark.slate4,
  },
  foreground: {
    base: slateDark.slate12,
    primary: slateDark.slate1,
    secondary: slateDark.slate11,
    destructive: slateDark.slate1,
    muted: slateDark.slate10,
    accent: irisDark.iris11,
    disabled: slateDark.slate9,
  },
  border: {
    primary: slateDark.slate8,
    input: slateDark.slate7,
    muted: slateDark.slate6,
    default: slateDark.slate8,
    strong: slateDark.slate8,
    focus: irisDark.iris8,
  },
  input: {
    background: slateDark.slate2,
    border: slateDark.slate7,
    borderFocus: irisDark.iris8,
    borderInvalid: rubyDark.ruby8,
    placeholder: slateDark.slate10,
  },
  success: {
    background: greenDark.green9,
    foreground: grayDark.gray1,
    border: greenDark.green7,
  },
  typography: {
    base: slateDark.slate12,
    secondary: slateDark.slate11,
    muted: slateDark.slate10,
    accent: irisDark.iris11,
    link: cyanDark.cyan11,
  },
  gray: grayDark,
  blue: blueDark,
  red: redDark,
  green: greenDark,
  teal: tealDark,
  neutral: slateDark,
  brand: irisDark,
  accent: cyanDark,
  warningScale: amberDark,
  errorScale: rubyDark,
  successScale: jadeDark,
})

export type Theme = ReturnType<typeof createTheme>

// Export color config type for custom theme creation
export type { ColorConfig }
