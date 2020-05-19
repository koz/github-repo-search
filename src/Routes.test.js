import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import Routes from './Routes';
import { render } from '@testing-library/react';
import createStore from './redux/createStore';
import renderWithContext from '../spec/utils/renderWithContext';

describe('<Routes />', () => {
  test('should show different content after navigating to details route', () => {
    const history = createMemoryHistory();
    const { container } = renderWithContext(<Routes />, { history });
    const homeText = container.textContent;
    history.push('/123');
    const detailsText = container.textContent;
    expect(homeText).not.toEqual(detailsText);
  });
});
