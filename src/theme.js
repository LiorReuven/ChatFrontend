import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
};

const components = {
  Link: {
    baseStyle: {
      textDecoration: 'none',
      _hover: {
        textDecoration: 'none',
      },
    },
  },
};

export const chakraCustomTheme = extendTheme({ config, components });
