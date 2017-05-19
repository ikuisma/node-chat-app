const expect = require('expect');

var {isRealString} = require('./validation');

describe('isRealString', () => {

  it('should return false for pure whitespace', () => {
    expect(isRealString('     ')).toBe(false);
  });

  it('should return false for number', () => {
    expect(isRealString(123)).toBe(false);
  });

  it('should return true for string', () => {
    expect(isRealString("    a")).toBe(true);
  });

});
