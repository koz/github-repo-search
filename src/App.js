import React from 'react';
import { Provider } from 'react-redux';
import createStore from './redux/createStore';
const store = createStore();

import { GlobalStyle } from './styles/global';

const App = () => (
  <>
    <GlobalStyle />
    <Provider store={store}>
      <div>Github - Explore</div>
    </Provider>
  </>
);

export default App;
