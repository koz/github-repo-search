import React from 'react';
import useSearchForm from './useSearchForm';
import debounce from 'lodash.debounce';
import * as thunks from '../redux/thunks';
import render from '../../spec/utils/renderHook';
import * as router from 'react-router-dom';
import * as redux from 'react-redux';

jest.useFakeTimers();
const mockDebounce = jest.fn();
jest.mock('lodash.debounce', () => (a, b) => {
  mockDebounce();
  /* lodash's debounce doesn't work with jest fake timers, in order to test the debounce behavior this simple debounce mock function is needed */
  let timer = null;
  return function wrappedFunction(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => a(...args), b);
  };
});

const mockPush = jest.fn();
const mockUseLocation = jest.fn().mockImplementation(() => {});
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockPush,
  }),
  useLocation: jest.fn().mockReturnValue({}),
}));

describe('useSearchForm', () => {
  const thunkMock = jest.spyOn(thunks, 'getRepositories').mockImplementation(() => ({ type: 'test' }));

  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  test('should return a handleChange function and a value', () => {
    router.useLocation.mockReturnValueOnce({ search: 'q=keyword+test' });
    const { handleChange, value } = render({ hook: useSearchForm });
    expect(typeof handleChange).toBe('function');
    expect(value).toBe('keyword test');
  });

  test('should call debounce on every handleChange call', () => {
    const { handleChange } = render({ hook: useSearchForm });
    handleChange({ target: { value: 'test' } });
    expect(mockDebounce).toBeCalledTimes(1);
  });

  test('should call history push with query', () => {
    const { handleChange } = render({ hook: useSearchForm });
    handleChange({ target: { value: 'keyword test' } });
    jest.advanceTimersByTime(300);
    expect(mockPush).toBeCalledWith({
      pathname: '/',
      search: 'q=keyword+test',
    });
  });

  test('should debounce push to history by 300 seconds', () => {
    const { handleChange } = render({ hook: useSearchForm });
    handleChange({ target: { value: 'key' } });
    handleChange({ target: { value: 'keyword' } });
    handleChange({ target: { value: 'keyword test' } });
    jest.advanceTimersByTime(300);

    expect(mockPush).toBeCalledWith({
      pathname: '/',
      search: 'q=keyword+test',
    });
  });

  test("should not push if there's no value", () => {
    const { handleChange } = render({ hook: useSearchForm });
    handleChange({ target: { value: null } });
    jest.advanceTimersByTime(300);

    expect(mockPush).not.toBeCalled();
  });

  test('should dispatch get repositories if query changes', () => {
    const mockDispatch = jest.fn();
    jest.spyOn(redux, 'useDispatch').mockReturnValue(mockDispatch);
    router.useLocation.mockReturnValueOnce({ search: 'q=keyword+test' });
    const { handleChange } = render({ hook: useSearchForm });

    expect(thunkMock).toBeCalledWith('keyword test');
    expect(mockDispatch).toBeCalledWith({ type: 'test' });
  });
});
