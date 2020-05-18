import React from 'react';
import { Provider } from 'react-redux';
import createStore from './redux/createStore';
const store = createStore();
import { BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from './styles/global';
import Routes from './Routes';
import Header from './components/Header';

const App = () => (
  <>
    <GlobalStyle />
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes />
      </BrowserRouter>
    </Provider>
  </>
);

export default App;
