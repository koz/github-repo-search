import * as redux from 'react-redux';
import useRepositoryData from './useRepositoryData';
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
          repositories: new Map([['owner/repo', { test: 1 }]]),
          owners: new Map([['owner', { test: 2 }]]),
          readmeFiles: new Map([['owner/repo', 'content']]),
        },
      },
      'owner',
      'repo'
    );
    expect(data).toStrictEqual({ repository: { test: 1 }, owner: { test: 2 }, readme: 'content' });
  });

  test("should dispatch getRepository if there's no data", () => {
    const mockDispatch = jest.fn();
    jest.spyOn(redux, 'useDispatch').mockReturnValue(mockDispatch);
    jest.spyOn(thunks, 'getOwner').mockReturnValue();
    jest.spyOn(thunks, 'getReadme').mockReturnValue();
    const mockGetRepository = jest.spyOn(thunks, 'getRepository').mockReturnValue({ type: 'repo' });
    const owner = 'ownerTest';
    const repo = 'repoTest';
    renderHook({ hook: useRepositoryData }, owner, repo);
    expect(mockGetRepository).toBeCalledWith(owner, repo);
    expect(mockDispatch).toBeCalledWith({ type: 'repo' });
  });

  test("should dispatch getOwner if there's no data", () => {
    const mockDispatch = jest.fn();
    jest.spyOn(redux, 'useDispatch').mockReturnValue(mockDispatch);
    jest.spyOn(thunks, 'getRepository').mockReturnValue();
    jest.spyOn(thunks, 'getReadme').mockReturnValue();
    const mockGetOwner = jest.spyOn(thunks, 'getOwner').mockReturnValue({ type: 'owner' });
    const owner = 'ownerTest';
    const repo = 'repoTest';
    renderHook({ hook: useRepositoryData }, owner, repo);
    expect(mockGetOwner).toBeCalledWith(owner);
    expect(mockDispatch).toBeCalledWith({ type: 'owner' });
  });

  test("should dispatch getReadme if there's no data", () => {
    const mockDispatch = jest.fn();
    jest.spyOn(redux, 'useDispatch').mockReturnValue(mockDispatch);
    jest.spyOn(thunks, 'getRepository').mockReturnValue();
    jest.spyOn(thunks, 'getOwner').mockReturnValue();
    const mockGetReadme = jest.spyOn(thunks, 'getReadme').mockReturnValue({ type: 'readme' });
    const owner = 'ownerTest';
    const repo = 'repoTest';
    renderHook({ hook: useRepositoryData }, owner, repo);
    expect(mockGetReadme).toBeCalledWith(owner, repo);
    expect(mockDispatch).toBeCalledWith({ type: 'readme' });
  });
});
