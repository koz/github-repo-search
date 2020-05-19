import { getRepos, getRepo } from './index';
import querystring from 'querystring';

describe('api', () => {
  beforeAll(() => {
    jest.spyOn(window, 'encodeURIComponent').mockImplementation(querystring.encode);
  });

  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({ ok: true, json: jest.fn() }));
    global.fetch.mockClear();
  });

  afterAll(() => {
    delete global.fetch;
  });

  describe('getRepos', () => {
    test('should call fetch', async () => {
      await getRepos();
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    test('should call fetch with the keyword', async () => {
      const keyword = '123 abc';

      await getRepos(keyword);
      expect(global.fetch).toHaveBeenCalledWith(
        `https://api.github.com/search/repositories?q=${querystring.encode(keyword)}`
      );
    });

    test('should call json method on reponse with ok true', async () => {
      const jsonMockMethod = jest.fn();
      global.fetch.mockResolvedValue({ ok: true, json: jsonMockMethod });

      await getRepos();
      expect(jsonMockMethod).toHaveBeenCalledTimes(1);
    });

    test('should throw error on response with ok false', async () => {
      const data = {
        ok: false,
        status: '400',
        statusText: 'Error',
      };
      const errorMockFn = jest.fn();
      global.fetch.mockResolvedValue(data);

      try {
        await getRepos().catch(errorMockFn);
      } catch {
        expect(errorMockFn).toHaveBeenCalledWith({
          message: data.statusText,
          code: data.status,
        });
      }
    });
  });

  describe('getRepo', () => {
    test('should call fetch', async () => {
      await getRepo();
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    test('should call fetch with the owner and repo params', async () => {
      const owner = 'ownerRepo';
      const repo = 'testRepo';

      await getRepo(owner, repo);
      expect(global.fetch).toHaveBeenCalledWith(`https://api.github.com/repos/${owner}/${repo}`);
    });

    test('should call json method on reponse with ok true', async () => {
      const jsonMockMethod = jest.fn();
      global.fetch.mockResolvedValue({ ok: true, json: jsonMockMethod });

      await getRepo();
      expect(jsonMockMethod).toHaveBeenCalledTimes(1);
    });

    test('should throw error on response with ok false', async () => {
      const data = {
        ok: false,
        status: '400',
        statusText: 'Error',
      };
      const errorMockFn = jest.fn();
      global.fetch.mockResolvedValue(data);

      try {
        await getRepo().catch(errorMockFn);
      } catch {
        expect(errorMockFn).toHaveBeenCalledWith({
          message: data.statusText,
          code: data.status,
        });
      }
    });
  });
});
