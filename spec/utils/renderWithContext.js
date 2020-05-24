import React from 'react';
import { render } from '@testing-library/react';
import createStore from '../../src/redux/createStore';
import { createMemoryHistory } from 'history/cjs/history.min';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import reducer from '../../src/redux/reducers';

export default (content, { history, state, rerender } = {}) => {
  const store = createStore(state);
  const renderFn = rerender || render;
  return {
    ...renderFn(
      <Provider store={createStore(state)}>
        <Router history={history || createMemoryHistory()}>{content}</Router>
      </Provider>
    ),
    store,
  };
};

export const renderWithProvider = (content, { state } = {}) => {
  const store = createStore(state);
  return {
    ...render(<Provider store={createStore(state)}>{content}</Provider>),
    store,
  };
};

export const renderWithRouter = (content, { history } = {}) =>
  render(<Router history={history || createMemoryHistory()}>{content}</Router>);
