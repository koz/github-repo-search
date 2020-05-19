import * as api from '../../api';
import { getRepositories, getRepository } from './index';
import * as actionCreators from '../actions/actionCreators';

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
      const mockData = {
        total_count: 1,
        items: [
          {
            id: 1,
            name: 'Test',
            description: 'Description',
            created_at: '2020-05-17',
            updated_at: '2020-05-17',
            stargazers_count: 2,
            watchers_count: 3,
            language: 'Javascript',
            forks_count: 4,
            open_issues_count: 5,
            license: {
              name: 'MIT License',
              url: 'https://api.github.com/licenses/mit',
            },
            full_name: 'full/name',
          },
        ],
      };
      jest.spyOn(api, 'getRepos').mockResolvedValue(mockData);

      const fetchSuccessMock = jest.spyOn(actionCreators, 'fetchRepositoriesSuccess');

      await getRepositories()(dispatcherMock);
      expect(fetchSuccessMock).toBeCalledWith({
        totalCount: mockData.total_count,
        items: new Map([
          [
            'full/name',
            {
              id: 1,
              name: 'Test',
              description: 'Description',
              createdAt: '2020-05-17',
              updatedAt: '2020-05-17',
              stars: 2,
              watchers: 3,
              language: 'Javascript',
              forks: 4,
              issues: 5,
              license: {
                name: 'MIT License',
                url: 'https://api.github.com/licenses/mit',
              },
              fullName: 'full/name',
            },
          ],
        ]),
      });
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
      const mockData = {
        id: 1,
        name: 'Test',
        description: 'Description',
        created_at: '2020-05-17',
        updated_at: '2020-05-17',
        stargazers_count: 2,
        watchers_count: 3,
        language: 'Javascript',
        forks_count: 4,
        open_issues_count: 5,
        license: {
          name: 'MIT License',
          url: 'https://api.github.com/licenses/mit',
        },
        full_name: 'full/name',
      };
      jest.spyOn(api, 'getRepo').mockResolvedValue(mockData);

      const fetchSuccessMock = jest.spyOn(actionCreators, 'fetchRepositorySuccess');

      await getRepository()(dispatcherMock);
      expect(fetchSuccessMock).toBeCalledWith({
        id: 1,
        name: 'Test',
        description: 'Description',
        createdAt: '2020-05-17',
        updatedAt: '2020-05-17',
        stars: 2,
        watchers: 3,
        language: 'Javascript',
        forks: 4,
        issues: 5,
        license: {
          name: 'MIT License',
          url: 'https://api.github.com/licenses/mit',
        },
        fullName: 'full/name',
      });
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
