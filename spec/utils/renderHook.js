import React from 'react';
import { renderWithProvider } from './renderWithContext';

export default (hook, ...args) => {
  let val = {};
  const TestComponent = () => {
    val = hook(...args);
    return null;
  };
  renderWithProvider(<TestComponent />);
  return val;
};
