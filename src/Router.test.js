import React from 'react';
import Router from './Router';

import { shallow } from 'enzyme';

describe('<Router />', () => {
  it('should render', () => {
    const component = shallow(<Router />);
    expect(component.exists()).toBe(true);
  });

  it('should render home route', () => {
    const component = shallow(<Router />);
    expect(component.exists('Route[path="/"]')).toBe(true);
  });

  it('should render details route', () => {
    const component = shallow(<Router />);
    expect(component.exists('Route[path="/:repo"]')).toBe(true);
  });
});
