import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { chakraCustomTheme } from './theme';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));

let persistor = persistStore(store);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ChakraProvider theme={chakraCustomTheme}>
        <ColorModeScript
          initialColorMode={chakraCustomTheme.config.initialColorMode}
        />
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </ChakraProvider>
    </BrowserRouter>
  </Provider>
);
