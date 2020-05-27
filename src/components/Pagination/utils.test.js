import { getPaginatedUrl } from './utils';

describe('Pagination/utils', () => {
  test('should change page number', () => {
    expect(getPaginatedUrl({ search: '?page=1' }, 2)).toEqual({ search: '?page=2' });
  });

  test('should add page query', () => {
    expect(getPaginatedUrl({ search: '?test=1' }, 1)).toEqual({ search: '?test=1&page=1' });
    expect(getPaginatedUrl({ search: '' }, 1)).toEqual({ search: '?page=1' });
  });

  test('should preserve location properties', () => {
    expect(getPaginatedUrl({ prop: 'test', search: '?test=1' }, 1)).toEqual({
      prop: 'test',
      search: '?test=1&page=1',
    });
  });
});
