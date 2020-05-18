import React from 'react';
import useSearchForm from './useSearchForm';
import { renderWithProvider } from '../../spec/utils/renderWithContext';
import debounce from 'lodash.debounce';
import * as thunks from '../redux/thunks';

const setup = () => {
  let val = {};
  const TestComponent = () => {
    val = useSearchForm();
    return null;
  };
  renderWithProvider(<TestComponent />);
  return val;
};

jest.useFakeTimers();
const mockDebounce = jest.fn();
jest.mock('lodash.debounce', () => (a, b) => {
  mockDebounce();
  /* lodash's debounce doesn't work with jest fake timers, in order to test the debounce behavior this simple debounce mock function is needed */
  let timer = null;
  return function wrappedFunction(...args) {
    console.log('wrapped');
    clearTimeout(timer);
    timer = setTimeout(() => a(...args), b);
  };
});

describe('useSearchForm', () => {
  const thunkMock = jest.spyOn(thunks, 'getRepositories').mockImplementation(() => ({ type: 'test' }));

  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  test('should return a handleChange function', () => {
    const { handleChange } = setup();
    expect(handleChange).toBeDefined();
    expect(typeof handleChange).toBe('function');
  });

  test('should call debounce on every handleChange call', () => {
    const { handleChange } = setup();
    handleChange({ target: { value: 'test' } });
    expect(mockDebounce).toBeCalledTimes(1);
  });

  test('should debounce dispatch get repositories by 300 seconds', () => {
    const { handleChange } = setup();
    handleChange({ target: { value: 1 } });
    handleChange({ target: { value: 2 } });
    handleChange({ target: { value: 3 } });
    jest.advanceTimersByTime(300);

    expect(thunkMock).toBeCalledTimes(1);
  });

  test("should not dispatch if there's no value", () => {
    const { handleChange } = setup();
    handleChange({ target: { value: null } });
    jest.advanceTimersByTime(300);

    expect(thunkMock).not.toBeCalled();
  });
});
