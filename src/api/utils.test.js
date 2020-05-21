import { requestHandler, fileRequestHandler } from './utils';

describe('api/utils', () => {
  describe('requestHandler', () => {
    test('should call json method on request with ok true', () => {
      const jsonMockMethod = jest.fn();

      requestHandler({ ok: true, json: jsonMockMethod });
      expect(jsonMockMethod).toHaveBeenCalledTimes(1);
    });

    test('should throw error on response with ok false', () => {
      const data = {
        ok: false,
        status: '400',
        statusText: 'Error',
      };
      const errorMockFn = jest.fn();

      try {
        requestHandler(data);
      } catch (e) {
        expect(e).toMatchObject({
          message: data.statusText,
          code: data.status,
        });
      }
    });
  });

  describe('fileRequestHandler', () => {
    test('should call text method on request with ok true', () => {
      const textMockMethod = jest.fn();

      fileRequestHandler({ ok: true, text: textMockMethod });
      expect(textMockMethod).toHaveBeenCalledTimes(1);
    });

    test('should throw error on response with ok false', () => {
      const data = {
        ok: false,
        status: '400',
        statusText: 'Error',
      };
      const errorMockFn = jest.fn();

      try {
        fileRequestHandler(data);
      } catch (e) {
        expect(e).toMatchObject({
          message: data.statusText,
          code: data.status,
        });
      }
    });
  });
});
