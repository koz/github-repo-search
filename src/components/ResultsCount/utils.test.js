import { formatNumber, millisecondsToSeconds } from './utils';

describe('ResultsCount/utils', () => {
  test('formatNumber', () => {
    expect(formatNumber()).toEqual('NaN');
    expect(formatNumber(10)).toEqual('10');
    expect(formatNumber(100)).toEqual('100');
    expect(formatNumber(1000)).toEqual('1,000');
    expect(formatNumber(10000)).toEqual('10,000');
    expect(formatNumber(100000)).toEqual('100,000');
    expect(formatNumber(1000000)).toEqual('1,000,000');
    expect(formatNumber(1000000.5)).toEqual('1,000,000.5');
  });

  test('millisecondsToSeconds', () => {
    expect(millisecondsToSeconds()).toEqual(NaN);
    expect(millisecondsToSeconds(1000)).toEqual(1);
    expect(millisecondsToSeconds(1000.2)).toEqual(1.0002);
    expect(millisecondsToSeconds(15)).toEqual(0.015);
  });
});
