import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import Routes from './Routes';
import { render } from '@testing-library/react';
import createStore from './redux/createStore';

describe('<Routes />', () => {
  test('should show different content after navigating to details route', () => {
    const history = createMemoryHistory();
    const { container } = render(
      <Provider store={createStore()}>
        <Router history={history}>
          <Routes />
        </Router>
      </Provider>
    );
    const homeText = container.textContent;
    history.push('/123');
    const detailsText = container.textContent;
    expect(homeText).not.toEqual(detailsText);
  });
});
