import React from 'react';
import { createMemoryHistory } from 'history';
import Routes from './Routes';
import renderWithContext from '../spec/utils/renderWithContext';

describe('<Routes />', () => {
  test('should show different content after navigating to details route', () => {
    const history = createMemoryHistory();
    const { container } = renderWithContext(<Routes />, { history });
    const homeChild = { ...container.childNodes };
    history.push('/123/123');
    const detailsChild = { ...container.childNodes };
    expect(homeChild).not.toStrictEqual(detailsChild);
  });
});
