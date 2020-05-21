import * as api from '../../api';
import { getRepositories, getRepository, getOwner } from './index';
import {
  FETCH_REPOSITORIES_SUCCESS,
  FETCH_REPOSITORIES_ERROR,
  FETCH_REPOSITORIES_START,
  FETCH_REPOSITORY_START,
  FETCH_REPOSITORY_SUCCESS,
  FETCH_REPOSITORY_ERROR,
  FETCH_OWNER_START,
  FETCH_OWNER_SUCCESS,
  FETCH_OWNER_ERROR,
} from '../actions/actions';

describe('thunks', () => {
  const dispatcherMock = jest.fn();

  beforeEach(() => {
    dispatcherMock.mockClear();
  });

  describe('getRepositories', () => {
    test('should return a function', () => {
      expect(typeof getRepositories()).toBe('function');
    });

    test('should dispatch FETCH_REPOSITORIES_START', async () => {
      jest.spyOn(api, 'getRepos').mockResolvedValue();

      await getRepositories()(dispatcherMock);
      expect(dispatcherMock).toBeCalledWith({ type: FETCH_REPOSITORIES_START });
    });

    test('should call getRepos with keyword param', async () => {
      const keyword = 'test';
      const getReposMock = jest.spyOn(api, 'getRepos').mockResolvedValue();

      await getRepositories(keyword)(dispatcherMock);
      expect(getReposMock).toBeCalledWith(keyword);
    });

    test('should dispatch FETCH_REPOSITORIES_SUCCESS on getRepos resolve', async () => {
      const mockData = {
        total_count: 1,
        items: [
          {
            full_name: 'full/name',
            created_at: '0',
            description: 'description',
            forks_count: 0,
            id: 0,
            open_issues_count: 0,
            language: 'javascript',
            name: 'name',
            stargazers_count: 0,
            updated_at: '0',
            subscribers_count: 0,
          },
        ],
      };
      const parsedItem = { fullName: 'full/name' };

      jest.spyOn(api, 'getRepos').mockResolvedValue(mockData);

      await getRepositories()(dispatcherMock);
      expect(dispatcherMock).toHaveBeenLastCalledWith({
        type: FETCH_REPOSITORIES_SUCCESS,
        payload: {
          totalCount: 1,
          items: new Map([
            [
              'full/name',
              {
                fullName: 'full/name',
                createdAt: '0',
                description: 'description',
                forks: 0,
                id: 0,
                issues: 0,
                language: 'javascript',
                name: 'name',
                stars: 0,
                updatedAt: '0',
                license: null,
                watchers: 0,
              },
            ],
          ]),
        },
      });
    });

    test('should dispatch FETCH_REPOSITORIES_ERROR on getRepos reject', async () => {
      const data = { code: '123', message: 'test' };
      jest.spyOn(api, 'getRepos').mockRejectedValue(data);

      await getRepositories()(dispatcherMock);
      expect(dispatcherMock).toHaveBeenLastCalledWith({ type: FETCH_REPOSITORIES_ERROR, payload: data });
    });
  });

  describe('getRepository', () => {
    test('should return a function', () => {
      expect(typeof getRepository()).toBe('function');
    });

    test('should dispatch FETCH_REPOSITORY_START', async () => {
      jest.spyOn(api, 'getRepo').mockResolvedValue();

      await getRepository()(dispatcherMock);
      expect(dispatcherMock).toBeCalledWith({ type: FETCH_REPOSITORY_START });
    });

    test('should call getRepo with owner and repo param', async () => {
      const owner = 'testOwner';
      const repo = 'testRepo';
      const getRepoMock = jest.spyOn(api, 'getRepo').mockResolvedValue();

      await getRepository(owner, repo)(dispatcherMock);
      expect(getRepoMock).toBeCalledWith(owner, repo);
    });

    test('should dispatch FETCH_REPOSITORY_SUCCESS on getRepo resolve', async () => {
      const mockData = {
        full_name: 'full/name',
        created_at: '0',
        description: 'description',
        forks_count: 0,
        id: 0,
        open_issues_count: 0,
        language: 'javascript',
        name: 'name',
        stargazers_count: 0,
        updated_at: '0',
        subscribers_count: 0,
      };

      jest.spyOn(api, 'getRepo').mockResolvedValue(mockData);

      await getRepository()(dispatcherMock);
      expect(dispatcherMock).toHaveBeenLastCalledWith({
        type: FETCH_REPOSITORY_SUCCESS,
        payload: {
          fullName: 'full/name',
          createdAt: '0',
          description: 'description',
          forks: 0,
          id: 0,
          issues: 0,
          language: 'javascript',
          name: 'name',
          stars: 0,
          updatedAt: '0',
          license: null,
          watchers: 0,
        },
      });
    });

    test('should dispatch FETCH_REPOSITORY_ERROR on getRepo reject', async () => {
      const data = { code: '123', message: 'test' };
      jest.spyOn(api, 'getRepo').mockRejectedValue(data);

      await getRepository()(dispatcherMock);
      expect(dispatcherMock).toBeCalledWith({ type: FETCH_REPOSITORY_ERROR, payload: data });
    });
  });

  describe('getOwner', () => {
    test('should return a function', () => {
      expect(typeof getOwner()).toBe('function');
    });

    test('should dispatch FETCH_OWNER_START', async () => {
      jest.spyOn(api, 'getOwner').mockResolvedValue();
      jest.spyOn(api, 'getOwnerOrgs').mockResolvedValue();

      await getOwner('owner')(dispatcherMock);
      expect(dispatcherMock).toBeCalledWith({ type: FETCH_OWNER_START, payload: 'owner' });
    });

    test('should call getOwner and getOwnerOrgs from api with owner param', async () => {
      const owner = 'test';
      const getOwnerMock = jest.spyOn(api, 'getOwner').mockResolvedValue();
      const getOwnerOrgsMock = jest.spyOn(api, 'getOwnerOrgs').mockResolvedValue();

      await getOwner(owner)(dispatcherMock);
      expect(getOwnerMock).toBeCalledWith(owner);
      expect(getOwnerOrgsMock).toBeCalledWith(owner);
    });

    test('should dispatch FETCH_OWNER_SUCCESS on getOwner resolve', async () => {
      const mockData = {
        avatar_url: 'avatar',
        bio: 'bio',
        blog: 'blog',
        company: 'company',
        location: 'location',
        name: 'name',
        login: 'login',
      };

      const mockOrgsData = [
        {
          avatar_url: 'avatar',
          login: 'login',
        },
      ];

      jest.spyOn(api, 'getOwner').mockResolvedValue(mockData);
      jest.spyOn(api, 'getOwnerOrgs').mockResolvedValue(mockOrgsData);

      await getOwner()(dispatcherMock);
      expect(dispatcherMock).toHaveBeenLastCalledWith({
        type: FETCH_OWNER_SUCCESS,
        payload: {
          avatar: 'avatar',
          bio: 'bio',
          blog: 'blog',
          company: 'company',
          location: 'location',
          name: 'name',
          login: 'login',
          orgs: [
            {
              avatar: 'avatar',
              name: 'login',
            },
          ],
        },
      });
    });

    test('should resolve even if getOwnerRepos reject', async () => {
      const mockData = {
        avatar_url: 'avatar',
        bio: 'bio',
        blog: 'blog',
        company: 'company',
        location: 'location',
        name: 'name',
        login: 'login',
      };
      jest.spyOn(api, 'getOwner').mockResolvedValue(mockData);
      jest.spyOn(api, 'getOwnerOrgs').mockRejectedValue({ message: 'Error' });

      await getOwner('owner')(dispatcherMock);
      expect(dispatcherMock).toHaveBeenLastCalledWith({
        type: FETCH_OWNER_SUCCESS,
        payload: {
          avatar: 'avatar',
          bio: 'bio',
          blog: 'blog',
          company: 'company',
          location: 'location',
          name: 'name',
          login: 'login',
          orgs: [],
        },
      });
    });

    test('should dispatch FETCH_OWNER_ERROR on getOwner reject', async () => {
      const mockData = { message: 'Error' };

      jest.spyOn(api, 'getOwner').mockRejectedValue(mockData);

      await getOwner('owner')(dispatcherMock);
      expect(dispatcherMock).toHaveBeenLastCalledWith({
        type: FETCH_OWNER_ERROR,
        payload: { owner: 'owner', error: mockData },
      });
    });
  });
});
