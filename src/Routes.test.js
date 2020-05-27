import React from 'react';
import { createMemoryHistory } from 'history';
import Routes from './Routes';
import renderWithContext from '../spec/utils/renderWithContext';

describe('<Routes />', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({ ok: true, json: jest.fn(), text: jest.fn() }));
    global.fetch.mockClear();
  });

  afterAll(() => {
    delete global.fetch;
  });

  test('render Home route', () => {
    const history = createMemoryHistory();
    const { getByTestId } = renderWithContext(<Routes />, { history });
    expect(getByTestId('home-route')).toBeInTheDocument();
  });

  test('render Details route', () => {
    const history = createMemoryHistory();
    history.push('/owner/repo');
    const { getByTestId } = renderWithContext(<Routes />, { history });
    expect(getByTestId('details-route')).toBeInTheDocument();
  });
});
