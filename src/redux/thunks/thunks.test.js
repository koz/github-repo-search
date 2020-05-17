import * as api from '../../api';
import { getRepositories } from './index';
import * as actionCreators from '../actions/actionCreators';

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
    },
  ],
};

describe('thunks', () => {
  describe('getRepositories', () => {
    const getReposMock = jest.spyOn(api, 'getRepos').mockImplementation(() => Promise.resolve(mockData));
    const dispatcherMock = jest.fn();

    afterEach(() => {
      getReposMock.mockClear();
      dispatcherMock.mockClear();
    });

    test('should return a function', () => {
      expect(typeof getRepositories()).toBe('function');
    });

    test('should dispatch fetchRepositoriesStart', async () => {
      const fetchStartMock = jest.spyOn(actionCreators, 'fetchRepositoriesStart');

      await getRepositories()(dispatcherMock);
      expect(fetchStartMock).toBeCalledTimes(1);
    });

    test('should call getRepos with keyword param', async () => {
      const keyword = 'test';

      await getRepositories(keyword)(dispatcherMock);
      expect(getReposMock).toBeCalledWith(keyword);
    });

    test('should dispatch fetchRepositoriesSuccess on getRepos resolve', async () => {
      const keyword = 'test';

      const fetchSuccessMock = jest.spyOn(actionCreators, 'fetchRepositoriesSuccess');

      await getRepositories(keyword)(dispatcherMock);
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
          },
        ],
      });
    });

    test('should dispatch fetchRepositoriesError on getRepos reject', async () => {
      const data = { code: '123', message: 'test' };
      const fetchErrorMock = jest.spyOn(actionCreators, 'fetchRepositoriesError');
      getReposMock.mockRejectedValue(data);

      await getRepositories()(dispatcherMock);
      expect(fetchErrorMock).toBeCalledWith(data);
    });

    test('should should dispatch fetchRepositoriesError in a generic error', async () => {
      getReposMock.mockRejectedValue('error');
      const fetchErrorMock = jest.spyOn(actionCreators, 'fetchRepositoriesError');

      await getRepositories()(dispatcherMock);
      expect(fetchErrorMock).toBeCalledWith({ message: 'An error occurred.' });
    });
  });
});
