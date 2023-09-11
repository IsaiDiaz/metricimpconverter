const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
  test('should correctly read a whole number input', function() {
    const input = '5gal';
    assert.equal(convertHandler.getNum(input), 5);
  });

  test('should correctly read a decimal number input', function() {
    const input = '5.4mi';
    assert.equal(convertHandler.getNum(input), 5.4);
  });

  test('should correctly read a fractional input', function() {
    const input = '1/2lbs';
    assert.equal(convertHandler.getNum(input), 0.5);
  });

  test('should correctly read a fractional input with a decimal', function() {
    const input = '1.5/2km';
    assert.equal(convertHandler.getNum(input), 0.75);
  });

  test('should correctly return an error on a double-fraction', function() {
    const input = '3/2/3gal';
    assert.isNull(convertHandler.getNum(input));
  });

  test('should correctly default to a numerical input of 1 when no numerical input is provided', function() {
    const input = 'kg';
    assert.equal(convertHandler.getNum(input), 1);
  });

  test('should correctly read each valid input unit', function() {
    const inputUnits = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    inputUnits.forEach(function(unit) {
      const input = `5${unit}`;
      assert.equal(convertHandler.getUnit(input), unit);
    });
  });

  test('should correctly return an error for an invalid input unit', function() {
    const input = '5invalidunit';
    assert.isNull(convertHandler.getUnit(input));
  });

  test('should return the correct return unit for each valid input unit', function() {
    const units = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    units.forEach(function(unit) {
      assert.isString(convertHandler.getReturnUnit(unit));
    });
  });

  test('should correctly return the spelled-out string unit for each valid input unit', function() {
    const units = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    units.forEach(function(unit) {
      assert.isString(convertHandler.spellOutUnit(unit));
    });
  });

  test('should correctly convert gal to L', function() {
    const input = '1gal';
    assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.001);
  });

  test('should correctly convert L to gal', function() {
    const input = '1l';
    assert.approximately(convertHandler.convert(1, 'L'), 0.26417, 0.001);
  });

  test('should correctly convert mi to km', function() {
    const input = '1mi';
    assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.001);
  });

  test('should correctly convert km to mi', function() {
    const input = '1km';
    assert.approximately(convertHandler.convert(1, 'km'), 0.62137, 0.001);
  });

  test('should correctly convert lbs to kg', function() {
    const input = '1lbs';
    assert.approximately(convertHandler.convert(1, 'lbs'), 0.45359, 0.001);
  });

  test('should correctly convert kg to lbs', function() {
    const input = '1kg';
    assert.approximately(convertHandler.convert(1, 'kg'), 2.20462, 0.001);
  });
});