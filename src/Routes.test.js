import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Routes from './Routes';
import { render } from '@testing-library/react';

describe('<Routes />', () => {
  test('should show different content after navigating to details route', () => {
    const history = createMemoryHistory();
    const { container } = render(
      <Router history={history}>
        <Routes />
      </Router>
    );
    const homeText = container.textContent;
    history.push('/123');
    const detailsText = container.textContent;
    expect(homeText).not.toEqual(detailsText);
  });
});
