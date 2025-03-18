import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import MainLayout from '../layouts/MainLayout';
import '../styles/globals.css';

// Custom theme for the real estate application
const theme = extendTheme({
  colors: {
    brand: {
      50: '#F2F2F2',
      100: '#D9D9D9',
      200: '#BFBFBF',
      300: '#A6A6A6',
      400: '#8C8C8C',
      500: '#000000', // Primary black
      600: '#000000',
      700: '#000000',
      800: '#000000',
      900: '#000000',
    },
    neutral: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
  },
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'medium',
        borderRadius: 'md',
      },
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'gray.800',
          },
        },
      },
    },
    Card: {
      baseStyle: {
        p: '6',
        bg: 'white',
        borderRadius: 'lg',
        boxShadow: 'sm',
      },
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ChakraProvider>
  );
}

export default MyApp; 