import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import createStore from './redux/createStore';

import { GlobalStyle } from './styles/global';
import Routes from './Routes';

const store = createStore();

const App = () => (
  <>
    <GlobalStyle />
    <Provider store={store}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>
  </>
);

export default App;
