import React from 'react';
import { render } from '@testing-library/react';
import createStore from '../../src/redux/createStore';
import { createMemoryHistory } from 'history/cjs/history.min';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import reducer from '../../src/redux/reducers';

export default (content, { history, state } = {}) =>
  render(
    <Provider store={createStore(state)}>
      <Router history={history || createMemoryHistory()}>{content}</Router>
    </Provider>
  );

export const renderWithProvider = (content, { state } = {}) =>
  render(<Provider store={createStore(state)}>{content}</Provider>);

export const renderWithRouter = (content, { history } = {}) =>
  render(<Router history={history || createMemoryHistory()}>{content}</Router>);
