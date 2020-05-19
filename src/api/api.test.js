import { getRepos } from './index';
import querystring from 'querystring';

describe('api/getRepos', () => {
  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({ ok: true, json: jest.fn() }));
    jest.spyOn(window, 'encodeURIComponent').mockImplementation(querystring.encode);
  });

  beforeAll(() => {
    global.fetch.mockClear();
  });

  afterAll(() => {
    delete global.fetch;
  });

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

    await getRepos().catch(errorMockFn);
    expect(errorMockFn).toHaveBeenCalledWith({
      message: data.statusText,
      code: data.status,
    });
  });
});
