import { getRepos, getRepo, getOwner, getOwnerOrgs, getRepoContents, getFileTextContent, fetchWithAuth } from './index';
import * as utils from './utils';

describe('api', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({ ok: true, json: jest.fn(), text: jest.fn() }));
    global.fetch.mockClear();
  });

  afterAll(() => {
    delete global.fetch;
  });

  describe('getRepos', () => {
    process.env = {
      GITHUB_OAUTH_TOKEN: 'test',
    };

    test('should call fetch', async () => {
      await getRepos();
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    test('should call fetch with the keyword', async () => {
      const keyword = '123 abc';

      await getRepos(keyword);
      expect(global.fetch).toHaveBeenCalledWith(`https://api.github.com/search/repositories?q=123%20abc`, {
        headers: { authorization: 'token test' },
      });
    });

    test('should call fetch with page', async () => {
      await getRepos('', '2');
      expect(global.fetch).toHaveBeenCalledWith(`https://api.github.com/search/repositories?page=2`, {
        headers: { authorization: 'token test' },
      });
    });

    test('should call requestHandler with the result of request', async () => {
      const data = { ok: true, json: jest.fn() };
      const mock = jest.spyOn(utils, 'requestHandler');
      global.fetch.mockResolvedValue(data);

      await getRepos();
      expect(mock).toHaveBeenCalledWith(data);
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
      expect(global.fetch).toHaveBeenCalledWith(`https://api.github.com/repos/${owner}/${repo}`, {
        headers: { authorization: 'token test' },
      });
    });

    test('should call requestHandler with the result of request', async () => {
      const data = { ok: true, json: jest.fn() };
      const mock = jest.spyOn(utils, 'requestHandler');
      global.fetch.mockResolvedValue(data);

      await getRepo();
      expect(mock).toHaveBeenCalledWith(data);
    });
  });

  describe('getOwner', () => {
    test('should call fetch', async () => {
      await getOwner();
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    test('should call fetch with the owner params', async () => {
      const owner = 'ownerRepo';

      await getOwner(owner);
      expect(global.fetch).toHaveBeenCalledWith(`https://api.github.com/users/${owner}`, {
        headers: { authorization: 'token test' },
      });
    });

    test('should call requestHandler with the result of request', async () => {
      const data = { ok: true, json: jest.fn() };
      const mock = jest.spyOn(utils, 'requestHandler');
      global.fetch.mockResolvedValue(data);

      await getOwner();
      expect(mock).toHaveBeenCalledWith(data);
    });
  });

  describe('getOwnerOrgs', () => {
    test('should call fetch', async () => {
      await getOwnerOrgs();
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    test('should call fetch with the owner params', async () => {
      const owner = 'ownerRepo';

      await getOwnerOrgs(owner);
      expect(global.fetch).toHaveBeenCalledWith(`https://api.github.com/users/${owner}/orgs`, {
        headers: { authorization: 'token test' },
      });
    });

    test('should call requestHandler with the result of request', async () => {
      const data = { ok: true, json: jest.fn() };
      const mock = jest.spyOn(utils, 'requestHandler');
      global.fetch.mockResolvedValue(data);

      await getOwnerOrgs();
      expect(mock).toHaveBeenCalledWith(data);
    });
  });

  describe('getRepoContents', () => {
    test('should call fetch', async () => {
      await getRepoContents();
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    test('should call fetch with the owner and repo params', async () => {
      const owner = 'ownerRepo';
      const repo = 'repoTest';

      await getRepoContents(owner, repo);
      expect(global.fetch).toHaveBeenCalledWith(`https://api.github.com/repos/${owner}/${repo}/contents`, {
        headers: { authorization: 'token test' },
      });
    });

    test('should call requestHandler with the result of request', async () => {
      const data = { ok: true, json: jest.fn() };
      const mock = jest.spyOn(utils, 'requestHandler');
      global.fetch.mockResolvedValue(data);

      await getRepoContents();
      expect(mock).toHaveBeenCalledWith(data);
    });
  });

  describe('getFileTextContent', () => {
    test('should call fetch', async () => {
      await getFileTextContent();
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    test('should call fetch with the url param', async () => {
      const url = 'url/path/to/file';

      await getFileTextContent(url);
      expect(global.fetch).toHaveBeenCalledWith(url);
    });

    test('should call requestHandler with the result of request', async () => {
      const data = { ok: true, text: jest.fn() };
      const mock = jest.spyOn(utils, 'fileRequestHandler');
      global.fetch.mockResolvedValue(data);

      await getFileTextContent();
      expect(mock).toHaveBeenCalledWith(data);
    });
  });

  describe('fetchWithAuth', () => {
    test('should call fetch with url and auth header', () => {
      process.env = {
        GITHUB_OAUTH_TOKEN: '123 test',
      };
      fetchWithAuth('url/test');
      expect(global.fetch).toBeCalledWith('url/test', { headers: { authorization: 'token 123 test' } });
    });

    test("should call fetch without auth header if there's no token", () => {
      process.env = {};
      fetchWithAuth('url/test');
      expect(global.fetch).toBeCalledWith('url/test', null);
    });
  });
});
