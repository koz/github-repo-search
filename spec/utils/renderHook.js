import React from 'react';
import { renderWithProvider } from './renderWithContext';

export default ({ hook, initialState }, ...args) => {
  let val = {};
  const TestComponent = () => {
    val = hook(...args);
    return null;
  };
  renderWithProvider(<TestComponent />, initialState ? { state: initialState } : {});
  return val;
};
