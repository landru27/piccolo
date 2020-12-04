import * as comparison from '../pkg/utility/comparison.js';

describe('variable definition', () => {
  test('is defined', () => {
    var non;
    expect(comparison.isDefined(non)).toBe(false);
  });
});
