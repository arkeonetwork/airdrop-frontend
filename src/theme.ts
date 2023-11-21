import { extendTheme } from '@chakra-ui/react';
import { Input } from './components/styles/Input';
import { Link } from './components/styles/Link';
import { Button } from './components/styles/Button';

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
    teal: { 50: '#3BE0FF', 300: 'rgba(59, 224, 255, 0.11)' },
    grey: {
      50: 'rgba(255, 255, 255, 0.36)',
      100: 'rgba(255, 255, 255, 0.1)',
      150: 'rgba(255, 255, 255, 0.08)',
      200: 'rgba(255, 255, 255, 0.04)',
      300: 'rgba(32, 32, 32, 0.28)',
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
});
