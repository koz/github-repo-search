import * as api from '../../api';
import { getRepositories } from './index';
import * as actionCreators from '../actions/actionCreators';

describe('thunks', () => {
  describe('getRepositories', () => {
    const dispatcherMock = jest.fn();

    afterEach(() => {
      dispatcherMock.mockClear();
    });

    test('should return a function', () => {
      expect(typeof getRepositories()).toBe('function');
    });

    test('should dispatch fetchRepositoriesStart', async () => {
      const fetchStartMock = jest.spyOn(actionCreators, 'fetchRepositoriesStart');
      const getReposMock = jest.spyOn(api, 'getRepos').mockResolvedValue();

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
            description: 'Descrription',
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
      const getReposMock = jest.spyOn(api, 'getRepos').mockResolvedValue(mockData);

      const fetchSuccessMock = jest.spyOn(actionCreators, 'fetchRepositoriesSuccess');

      await getRepositories()(dispatcherMock);
      expect(fetchSuccessMock).toBeCalledWith({
        totalCount: mockData.total_count,
        items: [
          {
            id: 1,
            name: 'Test',
            description: 'Descrription',
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
      });
    });

    test('should dispatch fetchRepositoriesSuccess with the right data on getRepos resolve without license data', async () => {
      const mockData = {
        total_count: 1,
        items: [
          {
            id: 1,
            name: 'Test',
            description: 'Descrription',
            created_at: '2020-05-17',
            updated_at: '2020-05-17',
            stargazers_count: 2,
            watchers_count: 3,
            language: 'Javascript',
            forks_count: 4,
            open_issues_count: 5,
            full_name: 'full/name',
          },
        ],
      };
      const getReposMock = jest.spyOn(api, 'getRepos').mockResolvedValue(mockData);

      const fetchSuccessMock = jest.spyOn(actionCreators, 'fetchRepositoriesSuccess');

      await getRepositories()(dispatcherMock);
      expect(fetchSuccessMock).toBeCalledWith({
        totalCount: mockData.total_count,
        items: [
          {
            id: 1,
            name: 'Test',
            description: 'Descrription',
            createdAt: '2020-05-17',
            updatedAt: '2020-05-17',
            stars: 2,
            watchers: 3,
            language: 'Javascript',
            forks: 4,
            issues: 5,
            license: null,
            fullName: 'full/name',
          },
        ],
      });
    });

    test('should dispatch fetchRepositoriesError on getRepos reject', async () => {
      const data = { code: '123', message: 'test' };
      const getReposMock = jest.spyOn(api, 'getRepos').mockRejectedValue(data);
      const fetchErrorMock = jest.spyOn(actionCreators, 'fetchRepositoriesError');

      await getRepositories()(dispatcherMock);
      expect(fetchErrorMock).toBeCalledWith(data);
    });

    test('should should dispatch fetchRepositoriesError in a generic error', async () => {
      const getReposMock = jest.spyOn(api, 'getRepos').mockRejectedValue('error');
      const fetchErrorMock = jest.spyOn(actionCreators, 'fetchRepositoriesError');

      await getRepositories()(dispatcherMock);
      expect(fetchErrorMock).toBeCalledWith({ message: 'An error occurred.' });
    });
  });
});
