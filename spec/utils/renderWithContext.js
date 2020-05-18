import React from 'react';
import { render } from '@testing-library/react';
import createStore from '../../src/redux/createStore';
import { createMemoryHistory } from 'history/cjs/history.min';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

export default (content, { history } = {}) =>
  render(
    <Provider store={createStore()}>
      <Router history={history || createMemoryHistory()}>{content}</Router>
    </Provider>
  );

export const renderWithProvider = (content) => render(<Provider store={createStore()}>{content}</Provider>);

export const renderWithRouter = (content, { history } = {}) =>
  render(<Router history={history || createMemoryHistory()}>{content}</Router>);
