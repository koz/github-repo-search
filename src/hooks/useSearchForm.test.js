import * as router from 'react-router-dom';
import * as redux from 'react-redux';
import useSearchForm from './useSearchForm';
import * as thunks from '../redux/thunks';
import render from '../../spec/utils/renderHook';
import * as selectors from '../redux/selectors';
import { createMemoryHistory } from 'history/cjs/history';

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
jest.fn().mockImplementation(() => {});
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockPush,
  }),
  useLocation: jest.fn().mockReturnValue({}),
}));

describe('useSearchForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    jest.spyOn(thunks, 'getRepositories').mockReturnValue({ type: 'test' });
  });

  test('should return a handleChange function', () => {
    router.useLocation.mockReturnValueOnce({ search: 'q=keyword+test' });
    const { handleChange } = render({ hook: useSearchForm });
    expect(typeof handleChange).toBe('function');
  });

  test('should return a value', () => {
    router.useLocation.mockReturnValueOnce({ search: 'q=keyword+test' });
    const { query } = render({ hook: useSearchForm });
    expect(query).toBe('keyword test');
  });

  test('should return pagination links', () => {
    const mockData = {
      next: 'path/to/next',
      prev: 'path/to/prev',
    };
    jest.spyOn(selectors, 'usePaginationLinks').mockReturnValue(mockData);
    const { pagination } = render({ hook: useSearchForm });
    expect(pagination).toStrictEqual(mockData);
  });

  test('should return a page', () => {
    router.useLocation.mockReturnValueOnce({ search: 'page=2' });
    const { page } = render({ hook: useSearchForm });
    expect(page).toBe('2');
  });

  test('should return a handleChange function', () => {
    const { handleChange } = render({ hook: useSearchForm });
    expect(typeof handleChange).toBe('function');
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

    expect(mockPush).toBeCalledWith({ pathname: '/', search: null });
  });

  test('should dispatch get repositories if querystring changes', () => {
    const mockDispatch = jest.fn();
    const thunkMock = jest.spyOn(thunks, 'getRepositories').mockReturnValue({ type: 'test' });
    jest.spyOn(selectors, 'useSearchQuery').mockReturnValue('keyword');
    jest.spyOn(selectors, 'useRepositories').mockReturnValue(new Map());
    jest.spyOn(redux, 'useDispatch').mockReturnValue(mockDispatch);
    router.useLocation.mockReturnValueOnce({ search: 'q=keyword+test&page=2' });
    render({ hook: useSearchForm });

    expect(thunkMock).toBeCalledWith('keyword test', '2');
    expect(thunkMock).toBeCalledTimes(1);
    expect(mockDispatch).toBeCalledWith({ type: 'test' });
    expect(mockDispatch).toBeCalledTimes(1);
  });

  test('should not dispatch get repositories if querystring is the same as saved', async () => {
    const mockDispatch = jest.fn();
    const history = createMemoryHistory();
    const thunkMock = jest.spyOn(thunks, 'getRepositories').mockReturnValue({ type: 'test' });
    jest.spyOn(redux, 'useDispatch').mockReturnValue(mockDispatch);
    jest.spyOn(selectors, 'useSearchQuery').mockReturnValue('keyword');
    jest.spyOn(selectors, 'useRepositories').mockReturnValue(new Map());
    router.useLocation.mockReturnValueOnce({ search: 'q=keyword' });
    render({ hook: useSearchForm, history });
    expect(thunkMock).not.toBeCalled();
    expect(mockDispatch).not.toBeCalled();
  });

  test("should dispatch get repositories if there's no data", async () => {
    const mockDispatch = jest.fn();
    const history = createMemoryHistory();
    const thunkMock = jest.spyOn(thunks, 'getRepositories').mockReturnValue({ type: 'test' });
    jest.spyOn(redux, 'useDispatch').mockReturnValue(mockDispatch);
    router.useLocation.mockReturnValueOnce({ search: 'q=keyword' });
    render({ hook: useSearchForm, history });

    expect(thunkMock).toBeCalledWith('keyword', '1');
    expect(thunkMock).toBeCalledTimes(1);
    expect(mockDispatch).toBeCalledWith({ type: 'test' });
    expect(mockDispatch).toBeCalledTimes(1);
  });

  test('should scroll top if query changes', () => {
    global.scrollTo = jest.fn();
    router.useLocation.mockReturnValueOnce({ search: 'q=keyword+test&page=2' });
    render({ hook: useSearchForm });

    expect(global.scrollTo).toBeCalledWith({ top: 0, behavior: 'smooth' });
  });

  test("should not return repositories if there's no query", () => {
    jest.spyOn(selectors, 'useRepositories').mockReturnValue(new Map());
    const { repositories } = render({ hook: useSearchForm });

    expect(repositories).toEqual(null);
  });
});
