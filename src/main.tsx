import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ChakraProvider } from '@chakra-ui/provider';
import { theme } from './theme';
import "react-responsive-carousel/lib/styles/carousel.min.css";

let root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </>
);
