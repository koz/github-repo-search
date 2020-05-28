import * as router from 'react-router-dom';
import renderHook from '../../../spec/utils/renderHook';
import useSearchQueryString from '.';

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
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockPush,
  }),
  useLocation: jest.fn().mockReturnValue({}),
}));

describe('useSearchQueryString', () => {
  test('should return a handle change callback', () => {
    const value = renderHook({ hook: useSearchQueryString });
    expect(value.handleChange).toBeDefined();
  });

  test('should return a query value from location search', () => {
    router.useLocation.mockReturnValueOnce({ search: 'q=test' });
    const value = renderHook({ hook: useSearchQueryString });
    expect(value.query).toEqual('test');
  });

  test('should return a page from location search', () => {
    router.useLocation.mockReturnValueOnce({ search: 'page=2' });
    const value = renderHook({ hook: useSearchQueryString });
    expect(value.page).toEqual(2);
  });

  test('should return a page from location search', () => {
    router.useLocation.mockReturnValueOnce({ search: 'page=2' });
    const value = renderHook({ hook: useSearchQueryString });
    expect(value.page).toEqual(2);
  });

  test('should call history push with query', () => {
    const { handleChange } = renderHook({ hook: useSearchQueryString });
    handleChange({ target: { value: 'keyword test' } });
    jest.advanceTimersByTime(300);
    expect(mockPush).toBeCalledWith({
      pathname: '/',
      search: 'q=keyword+test',
    });
  });

  test('should debounce push to history by 300 seconds', () => {
    const { handleChange } = renderHook({ hook: useSearchQueryString });
    handleChange({ target: { value: 'key' } });
    handleChange({ target: { value: 'keyword' } });
    handleChange({ target: { value: 'keyword test' } });
    jest.advanceTimersByTime(300);

    expect(mockPush).toBeCalledWith({
      pathname: '/',
      search: 'q=keyword+test',
    });
  });
});
