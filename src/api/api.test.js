import { getRepos, getRepo, getOwner } from './index';
import querystring from 'querystring';
import * as utils from './utils';

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
      expect(global.fetch).toHaveBeenCalledWith(`https://api.github.com/repos/${owner}/${repo}`);
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
      expect(global.fetch).toHaveBeenCalledWith(`https://api.github.com/users/${owner}`);
    });

    test('should call requestHandler with the result of request', async () => {
      const data = { ok: true, json: jest.fn() };
      const mock = jest.spyOn(utils, 'requestHandler');
      global.fetch.mockResolvedValue(data);

      await getOwner();
      expect(mock).toHaveBeenCalledWith(data);
    });
  });
});
