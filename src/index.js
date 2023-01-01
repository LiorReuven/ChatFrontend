import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider, ColorModeScript} from '@chakra-ui/react'
import { chakraCustomTheme } from './theme';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <ChakraProvider theme={chakraCustomTheme}>
  <React.StrictMode>
  <ColorModeScript initialColorMode={chakraCustomTheme.config.initialColorMode} />
    <App />
  </React.StrictMode>
  </ChakraProvider>
  </BrowserRouter>
);

