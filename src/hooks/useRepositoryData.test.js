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
    const data = renderHook(
      {
        hook: useRepositoryData,
        initialState: {
          repositories: {
            items: new Map([['owner/repo', { test: 1 }]]),
          },
          owners: new Map([['owner', { test: 2 }]]),
        },
      },
      'owner',
      'repo'
    );
    expect(data).toStrictEqual({ repository: { test: 1 }, owner: { test: 2 } });
  });

  test("should dispatch getRepository and getOwner if there's no data", () => {
    const mockDispatch = jest.fn();
    jest.spyOn(redux, 'useDispatch').mockReturnValue(mockDispatch);
    const mockGetRepository = jest.spyOn(thunks, 'getRepository').mockReturnValue({ type: 'test' });
    const mockGetOwner = jest.spyOn(thunks, 'getOwner').mockReturnValue({ type: 'test2' });
    const owner = 'ownerTest';
    const repo = 'repoTest';
    const data = renderHook({ hook: useRepositoryData }, owner, repo);
    expect(mockGetRepository).toBeCalledWith(owner, repo);
    expect(mockGetOwner).toBeCalledWith(owner);
    expect(mockDispatch).toBeCalledWith({ type: 'test' });
    expect(mockDispatch).toHaveBeenNthCalledWith(2, { type: 'test2' });
  });
});
