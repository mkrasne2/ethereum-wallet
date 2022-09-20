import {  ChakraProvider, ColorModeScript, theme } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <HashRouter >
  <ChakraProvider theme={theme}>
  <StrictMode>
    <ColorModeScript />
    { <App /> }
  </StrictMode>
  </ChakraProvider>
  </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
