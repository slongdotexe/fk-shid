const fs = require('fs')
const { stringify } = require('querystring')

const { fontFamily } = require('tailwindcss/defaultTheme')
const resolveConfig = require('tailwindcss/resolveConfig')

const twTheme = require('./tailwind.config')

// const theme = {
// darkMode: ['class'],
// content: ['app/**/*.{ts,tsx}', 'components/**/*.{ts,tsx}'],
//   theme: {
//     container: {
//       center: true,
//       padding: '2rem',
//       screens: {
//         '2xl': '1400px',
//       },
//     },
//     extend: {
//       colors: {
//         border: 'hsl(var(--border))',
//         input: 'hsl(var(--input))',
//         ring: 'hsl(var(--ring))',
//         background: 'hsl(var(--background))',
//         foreground: 'hsl(var(--foreground))',
//         primary: {
//           DEFAULT: 'hsl(var(--primary))',
//           foreground: 'hsl(var(--primary-foreground))',
//         },
//         secondary: {
//           DEFAULT: 'hsl(var(--secondary))',
//           foreground: 'hsl(var(--secondary-foreground))',
//         },
//         destructive: {
//           DEFAULT: 'hsl(var(--destructive))',
//           foreground: 'hsl(var(--destructive-foreground))',
//         },
//         muted: {
//           DEFAULT: 'hsl(var(--muted))',
//           foreground: 'hsl(var(--muted-foreground))',
//         },
//         accent: {
//           DEFAULT: 'hsl(var(--accent))',
//           foreground: 'hsl(var(--accent-foreground))',
//         },
//         popover: {
//           DEFAULT: 'hsl(var(--popover))',
//           foreground: 'hsl(var(--popover-foreground))',
//         },
//         card: {
//           DEFAULT: 'hsl(var(--card))',
//           foreground: 'hsl(var(--card-foreground))',
//         },
//       },
//       borderRadius: {
//         lg: `var(--radius)`,
//         md: `calc(var(--radius) - 2px)`,
//         sm: 'calc(var(--radius) - 4px)',
//       },
//       fontFamily: {
//         sans: ['var(--font-sans)', ...fontFamily.sans],
//       },
//       keyframes: {
//         'accordion-down': {
//           from: { height: '0' },
//           to: { height: 'var(--radix-accordion-content-height)' },
//         },
//         'accordion-up': {
//           from: { height: 'var(--radix-accordion-content-height)' },
//           to: { height: '0' },
//         },
//       },
//       animation: {
//         'accordion-down': 'accordion-down 0.2s ease-out',
//         'accordion-up': 'accordion-up 0.2s ease-out',
//       },
//     },
//   },
// }

const themeCss = `
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;

  --card: 222.2 84% 4.9%;
  --card-foreground: 210 40% 98%;

  --popover: 222.2 84% 4.9%;
  --popover-foreground: 210 40% 98%;

  --primary: 210 40% 98%;
  --primary-foreground: 222.2 47.4% 11.2%;

  --secondary: 217.2 32.6% 17.5%;
  --secondary-foreground: 210 40% 98%;

  --muted: 217.2 32.6% 17.5%;
  --muted-foreground: 215 20.2% 65.1%;

  --accent: 217.2 32.6% 17.5%;
  --accent-foreground: 210 40% 98%;

  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 210 40% 98%;

  --border: 217.2 32.6% 17.5%;
  --input: 217.2 32.6% 17.5%;
  --ring: 212.7 26.8% 83.9%;
  --radius: 0.5rem;
}`

const themeVars = themeCss
  .trim()
  .split('\n')
  .reduce((acc, cssLine) => {
    if (cssLine.length < 2) {
      return acc
    }
    const [key, val] = cssLine.trim().split(': ')

    return {
      ...acc,
      [key]: val.trim().replace(';', ''),
    }
  }, {})

const replaceThemeVars = (themeString) => {
  let result = themeString
  Object.entries(themeVars).forEach(([key, val]) => {
    const regex = new RegExp(`var\\(${key}\\)`, 'gm')
    result = result.replace(regex, val)
  })
  return result
}

const replacedVars = JSON.parse(
  replaceThemeVars(JSON.stringify(twTheme.theme.extend))
)

twTheme.theme.extend = replacedVars

const resolvedTheme = resolveConfig({
  darkMode: ['class'],
  content: ['app/**/*.{ts,tsx}', 'components/**/*.{ts,tsx}'],
  theme: twTheme.theme,
})

// console.log(replaceThemeVars(JSON.stringify(twTheme.theme.extend)))
delete resolvedTheme.theme.backgroundImage
delete resolvedTheme.theme.keyframes

fs.writeFileSync('./theme.json', JSON.stringify(resolvedTheme))
