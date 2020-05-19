import { parseData } from './utils';

describe('RepoSummary/utils', () => {
  test('parseData', () => {
    expect(parseData('2020-05-19T13:17:38.067Z')).toBe('May 19, 2020');
    expect(parseData('2019-01-01T13:17:38.067Z')).toBe('January 1, 2019');
    expect(parseData('2000-12-31T13:17:38.067Z')).toBe('December 31, 2000');
  });
});
