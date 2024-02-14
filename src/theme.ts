import { extendTheme } from '@chakra-ui/react'
import { Input } from './styles/Input'
import { Link } from './styles/Link'
import { Button } from './styles/Button'

export const theme = extendTheme({
  styles: {
    global: {
      '.control-dots': {
        top: '-8px',
        margin: '0 !important',
        height: '50px',
      },
      body: {
        backgroundColor: '#080B12',
        minWidth: '100vw',
      },
    },
  },
  colors: {
    teal: { 50: '#3BE0FF', 100: '#2CA9D7', 200: '#1F9FD7', 300: 'rgba(59, 224, 255, 0.11)' },
    grey: {
      50: 'rgba(255, 255, 255, 0.36)',
      100: 'rgba(255, 255, 255, 0.1)',
      150: 'rgba(255, 255, 255, 0.08)',
      200: 'rgba(255, 255, 255, 0.04)',
      300: 'rgba(32, 32, 32, 0.28)',
    },
    red: {
      50: '#ffe3e3',
      100: '#ffbfbf',
      200: '#ff9999',
      300: '#ff7373',
      400: '#ff5252',
      500: '#ff0000',
      600: '#e60000',
      700: '#cc0000',
      800: '#b30000',
      900: '#990000',
    },
    purple: 'linear-gradient(180deg, #CAC1FF 0%, #988FCE 100%)',
  },
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  components: {
    // Styles for the base style
    baseStyle: {
      lineHeight: '1.2',
      letterSpacing: '-0.03em',
      fontWeight: 'black',
    },
    Button,
    Input,
    Link,
    // Styles for the size variations
    sizes: {},
    // Styles for the visual style variations
    variants: {},
    // The default `size` or `variant` values
    defaultProps: {
      size: 'inherit',
    },
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
})
