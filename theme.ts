import tailwindConfig from '@/../tailwind.config'
import resolveConfig from 'tailwindcss/resolveConfig'

const { theme: tailwindTheme } = resolveConfig(tailwindConfig)
const { colors: tailwindColors } = tailwindTheme

export const theme = {
  colors: {
    ...tailwindColors,
    background: '#171717',
    foreground: 'hsl(253, 31%, 98%)',
    muted: 'hsl(253, 7%, 13%)',
    'muted-foreground': 'hsl(253, 13%, 63%)',
    popover: 'hsl(253, 43%, 3%)',
    'popover-foreground': 'hsl(253, 31%, 98%)',
    card: 'hsl(253, 43%, 4%)',
    'card-foreground': 'hsl(253, 31%, 99%)',
    border: 'hsl(215, 27.9%, 16.9%)',
    input: 'hsl(215, 27.9%, 16.9%)',
    primary: 'hsl(253 38% 53%)',
    'primary-foreground': 'hsl(253, 91%, 98%)',
    secondary: 'hsl(253, 7%, 9%)',
    'secondary-foreground': 'hsl(253, 7%, 69%)',
    accent: 'hsl(253, 13%, 14%)',
    'accent-foreground': 'hsl(253, 13%, 74%)',
    destructive: 'hsl(339.2, 90.36%, 51.18%)',
    'destructive-foreground': 'hsl(0, 0%, 100%)',
    ring: 'hsl(253, 91%, 58%)',
  },
}
