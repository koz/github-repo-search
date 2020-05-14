import React from 'react';
import { Provider } from 'react-redux';
import createStore from './redux/createStore';
const store = createStore();

import { GlobalStyle } from './styles/global';
import Router from './Router';

const App = () => (
  <>
    <GlobalStyle />
    <Provider store={store}>
      <Router />
    </Provider>
  </>
);

export default App;
