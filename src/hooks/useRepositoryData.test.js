import useRepositoryData from './useRepositoryData';
import * as selectors from '../redux/selectors';
import * as redux from 'react-redux';
import * as thunks from '../redux/thunks';

import renderHook from '../../spec/utils/renderHook';

describe('useRepositoryData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return data if it's present", () => {
    const mockUseRepository = jest.spyOn(selectors, 'useRepository').mockReturnValueOnce({
      test: 1,
    });
    const owner = 'ownerTest';
    const repo = 'repoTest';
    const data = renderHook(useRepositoryData, owner, repo);
    expect(mockUseRepository).toBeCalledWith(owner, repo);
    expect(data).toStrictEqual({ test: 1 });
  });

  test("should dispatch getRepository if there's no data", () => {
    const mockDispatch = jest.fn();
    jest.spyOn(redux, 'useDispatch').mockReturnValue(mockDispatch);
    const mockGetRepository = jest.spyOn(thunks, 'getRepository').mockReturnValue({ type: 'test' });
    const owner = 'ownerTest';
    const repo = 'repoTest';
    const data = renderHook(useRepositoryData, owner, repo);
    expect(mockGetRepository).toBeCalledWith(owner, repo);
    expect(mockDispatch).toBeCalledWith({ type: 'test' });
  });
});
