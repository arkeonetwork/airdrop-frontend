import { extendTheme } from '@chakra-ui/react';
import { Input } from './components/Input';
import { Link } from './components/Link';

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: '#080B12',
        minWidth: '100vw',
      },
    },
  },
  colors: {
    teal: '#3BE0FF',
    grey: {
      100: 'rgba(255, 255, 255, 0.1)',
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
