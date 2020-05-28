import { pushSearch } from './utils';

describe('useSearchQueryString/utils', () => {
  describe('pushSearch', () => {
    test('should call history push with search query', () => {
      const mockPush = jest.fn();
      pushSearch({ push: mockPush })('test');
      expect(mockPush).toBeCalledWith({ pathname: '/', search: 'q=test' });
    });

    test('should call history push with search query formatted', () => {
      const mockPush = jest.fn();
      pushSearch({ push: mockPush })('test query');
      expect(mockPush).toBeCalledWith({ pathname: '/', search: 'q=test+query' });
    });

    test('should call history push without search query', () => {
      const mockPush = jest.fn();
      pushSearch({ push: mockPush })('');
      expect(mockPush).toBeCalledWith({ pathname: '/', search: null });
    });
  });
});
