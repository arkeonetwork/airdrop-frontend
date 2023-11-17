import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: '#080B12',
      },
    },
  },
  colors: {
    teal: {
      DEFAULT: '#3BE0FF',
      50: '#F3FDFF',
      100: '#DEFAFF',
      200: '#B5F3FF',
      300: '#8DEDFF',
      400: '#64E6FF',
      500: '#3BE0FF',
      600: '#03D7FF',
      700: '#00AACA',
      800: '#007B92',
      900: '#004B5A',
      950: '#00343E',
    },
  },
  components: {
    // Styles for the base style
    baseStyle: {
      lineHeight: '1.2',
      letterSpacing: '-0.03em',
      fontWeight: 'black',
    },
    // Styles for the size variations
    sizes: {},
    // Styles for the visual style variations
    variants: {
      purple: {
        backgroundImage: 'linear-gradient(180deg, #CAC1FF 0%, #988FCE 100%)',
        backgroundClip: 'text',
      },
    },
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
