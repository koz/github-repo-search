import { getRepos } from './index';
import querystring from 'querystring';

describe('api/getRepos', () => {
  beforeAll(() => {
    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
    jest.spyOn(window, 'encodeURIComponent').mockImplementation(querystring.encode);
  });

  beforeAll(() => {
    global.fetch.mockClear();
  });

  afterAll(() => {
    delete global.fetch;
  });

  test('should call fetch', () => {
    getRepos();

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test('should call fetch with the keyword', () => {
    const keyword = '123 abc';
    getRepos(keyword);

    expect(global.fetch).toHaveBeenCalledWith(
      `https://api.github.com/search/repositories?q=${querystring.encode(keyword)}`
    );
  });
});
