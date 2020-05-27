import { requestHandler, fileRequestHandler, getQueryString, RequestError } from './utils';

describe('api/utils', () => {
  describe('requestHandler', () => {
    test('should call json method on request with ok true', () => {
      const jsonMockMethod = jest.fn();

      requestHandler({ ok: true, json: jsonMockMethod });
      expect(jsonMockMethod).toHaveBeenCalledTimes(1);
    });

    test('should return data and headers', async () => {
      const data = { test: 'data' };
      const headers = [{ testHeader: 'test' }];

      expect(await requestHandler({ ok: true, json: jest.fn().mockResolvedValue(data), headers })).toStrictEqual({
        data,
        headers,
      });
    });

    test('should throw error on response with ok false', async () => {
      const data = {
        ok: false,
        json: jest.fn(),
        status: '400',
        statusText: 'Error',
      };

      try {
        await requestHandler(data);
      } catch (e) {
        expect(e.code).toEqual(data.status);
        expect(e.message).toEqual(data.statusText);
      }
    });

    test('should throw error with custom message on response with ok false', async () => {
      const data = {
        ok: false,
        json: jest.fn().mockReturnValue({ message: 'Custom error message' }),
        status: '400',
        statusText: 'Error',
      };

      try {
        await requestHandler(data);
      } catch (e) {
        expect(e.code).toEqual(data.status);
        expect(e.message).toEqual('Custom error message');
      }
    });
  });

  describe('fileRequestHandler', () => {
    test('should call text method on request with ok true', () => {
      const textMockMethod = jest.fn();

      fileRequestHandler({ ok: true, text: textMockMethod });
      expect(textMockMethod).toHaveBeenCalledTimes(1);
    });

    test('should throw error on response with ok false', async () => {
      const data = {
        ok: false,
        status: '400',
        statusText: 'Error',
      };

      try {
        await fileRequestHandler(data);
      } catch (e) {
        expect(e).toStrictEqual(new RequestError(data.statusText, data.status));
      }
    });
  });

  describe('getQueryString', () => {
    test('should return query as string', () => {
      expect(
        getQueryString({
          q: 'test',
          page: '2',
        })
      ).toEqual('q=test&page=2');

      expect(
        getQueryString({
          p: 'test2',
        })
      ).toEqual('p=test2');
    });

    test("should return empty string if there's no query", () => {
      expect(getQueryString()).toEqual('');
      expect(getQueryString({})).toEqual('');
    });
  });
});
