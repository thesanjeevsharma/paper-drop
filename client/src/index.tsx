import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';

import store from 'src/store';

import 'mapbox-gl/dist/mapbox-gl.css';

import './index.css';
import App from './App';

TimeAgo.addDefaultLocale(en);

const root = ReactDOM.createRoot(
   document.getElementById('root') as HTMLElement
);

root.render(
   <React.StrictMode>
      <Provider store={store}>
         <ChakraProvider>
            <BrowserRouter>
               <App />
            </BrowserRouter>
         </ChakraProvider>
      </Provider>
   </React.StrictMode>
);
