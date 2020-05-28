import * as redux from 'react-redux';
import { createMemoryHistory } from 'history';
import useSearchResults from './useSearchResults';
import * as thunks from '../redux/thunks';
import render from '../../spec/utils/renderHook';
import * as selectors from '../redux/selectors';

describe('useSearchResults', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    jest.spyOn(thunks, 'getRepositories').mockReturnValue({ type: 'test' });
  });

  test('should return pagination links', () => {
    const mockData = {
      next: 'path/to/next',
      prev: 'path/to/prev',
    };
    jest.spyOn(selectors, 'usePaginationLinks').mockReturnValue(mockData);
    const { pagination } = render({ hook: useSearchResults }, {});
    expect(pagination).toStrictEqual(mockData);
  });

  test('should dispatch get repositories if querystring changes', () => {
    const mockDispatch = jest.fn();
    const thunkMock = jest.spyOn(thunks, 'getRepositories').mockReturnValue({ type: 'test' });
    jest.spyOn(selectors, 'useSearchQuery').mockReturnValue('keyword');
    jest.spyOn(selectors, 'useRepositories').mockReturnValue(new Map());
    jest.spyOn(redux, 'useDispatch').mockReturnValue(mockDispatch);
    render({ hook: useSearchResults }, { page: 2, query: 'keyword test' });

    expect(thunkMock).toBeCalledWith('keyword test', 2);
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
    render({ hook: useSearchResults, history }, { query: 'keyword' });
    expect(thunkMock).not.toBeCalled();
    expect(mockDispatch).not.toBeCalled();
  });

  test("should dispatch get repositories if there's no data", async () => {
    const mockDispatch = jest.fn();
    const history = createMemoryHistory();
    const thunkMock = jest.spyOn(thunks, 'getRepositories').mockReturnValue({ type: 'test' });
    jest.spyOn(redux, 'useDispatch').mockReturnValue(mockDispatch);
    render({ hook: useSearchResults, history }, { query: 'keyword', page: 1 });

    expect(thunkMock).toBeCalledWith('keyword', 1);
    expect(thunkMock).toBeCalledTimes(1);
    expect(mockDispatch).toBeCalledWith({ type: 'test' });
    expect(mockDispatch).toBeCalledTimes(1);
  });

  test('should scroll top if query changes', () => {
    global.scrollTo = jest.fn();
    render({ hook: useSearchResults }, { query: 'keyword' });

    expect(global.scrollTo).toBeCalledWith({ top: 0, behavior: 'smooth' });
  });

  test("should not return repositories if there's no query", () => {
    jest.spyOn(selectors, 'useRepositories').mockReturnValue(new Map());
    const { repositories } = render({ hook: useSearchResults }, {});

    expect(repositories).toEqual(null);
  });
});
