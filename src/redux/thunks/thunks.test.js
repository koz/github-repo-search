import * as api from '../../api';
import { getRepositories, getRepository } from './index';
import * as actionCreators from '../actions/actionCreators';
import * as utils from '../utils/';

describe('thunks', () => {
  const dispatcherMock = jest.fn();

  afterEach(() => {
    dispatcherMock.mockClear();
  });

  describe('getRepositories', () => {
    test('should return a function', () => {
      expect(typeof getRepositories()).toBe('function');
    });

    test('should dispatch fetchRepositoriesStart', async () => {
      const fetchStartMock = jest.spyOn(actionCreators, 'fetchRepositoriesStart');
      jest.spyOn(api, 'getRepos').mockResolvedValue();

      await getRepositories()(dispatcherMock);
      expect(fetchStartMock).toBeCalledTimes(1);
    });

    test('should call getRepos with keyword param', async () => {
      const keyword = 'test';
      const getReposMock = jest.spyOn(api, 'getRepos').mockResolvedValue();

      await getRepositories(keyword)(dispatcherMock);
      expect(getReposMock).toBeCalledWith(keyword);
    });

    test('should dispatch fetchRepositoriesSuccess on getRepos resolve', async () => {
      const mockData = { total_count: 1, items: [{ full_name: 'full/name' }] };
      const parsedItem = { fullName: 'full/name' };
      const parsedData = { totalCount: 1, items: new Map([[parsedItem.fullName, parsedItem]]) };

      const mockDataMapper = jest.spyOn(utils, 'repoDataMapper').mockReturnValue(parsedItem);
      jest.spyOn(api, 'getRepos').mockResolvedValue(mockData);
      const fetchSuccessMock = jest.spyOn(actionCreators, 'fetchRepositoriesSuccess');

      await getRepositories()(dispatcherMock);
      expect(mockDataMapper).toBeCalledWith(mockData.items[0]);
      expect(fetchSuccessMock).toBeCalledWith(parsedData);
    });

    test('should dispatch fetchRepositoriesError on getRepos reject', async () => {
      const data = { code: '123', message: 'test' };
      jest.spyOn(api, 'getRepos').mockRejectedValue(data);
      const fetchErrorMock = jest.spyOn(actionCreators, 'fetchRepositoriesError');

      await getRepositories()(dispatcherMock);
      expect(fetchErrorMock).toBeCalledWith(data);
    });
  });

  describe('getRepository', () => {
    test('should return a function', () => {
      expect(typeof getRepository()).toBe('function');
    });

    test('should dispatch fetchRepositoryStart', async () => {
      const fetchStartMock = jest.spyOn(actionCreators, 'fetchRepositoryStart');
      jest.spyOn(api, 'getRepo').mockResolvedValue();

      await getRepository()(dispatcherMock);
      expect(fetchStartMock).toBeCalledTimes(1);
    });

    test('should call getRepo with owner and repo param', async () => {
      const owner = 'testOwner';
      const repo = 'testRepo';
      const getRepoMock = jest.spyOn(api, 'getRepo').mockResolvedValue();

      await getRepository(owner, repo)(dispatcherMock);
      expect(getRepoMock).toBeCalledWith(owner, repo);
    });

    test('should dispatch fetchRepositorySuccess on getRepo resolve', async () => {
      const mockData = { full_name: 'full/name' };
      const parsedItem = { fullName: 'full/name' };

      const mockDataMapper = jest.spyOn(utils, 'repoDataMapper').mockReturnValue(parsedItem);
      jest.spyOn(api, 'getRepo').mockResolvedValue(mockData);
      const fetchSuccessMock = jest.spyOn(actionCreators, 'fetchRepositorySuccess');

      await getRepository()(dispatcherMock);
      expect(mockDataMapper).toBeCalledWith(mockData);
      expect(fetchSuccessMock).toBeCalledWith(parsedItem);
    });

    test('should dispatch fetchRepositoryError on getRepo reject', async () => {
      const data = { code: '123', message: 'test' };
      jest.spyOn(api, 'getRepo').mockRejectedValue(data);
      const fetchErrorMock = jest.spyOn(actionCreators, 'fetchRepositoryError');

      await getRepository()(dispatcherMock);
      expect(fetchErrorMock).toBeCalledWith(data);
    });
  });
});
