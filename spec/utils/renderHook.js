import React from 'react';
import renderWithContext from './renderWithContext';

export default ({ hook, initialState, history }, ...args) => {
  let val = {};
  const TestComponent = () => {
    val = hook(...args);
    return null;
  };
  renderWithContext(<TestComponent />, initialState ? { state: initialState, history } : { history });
  return val;
};
