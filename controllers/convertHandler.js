function ConvertHandler() {

  this.getNum = function(input) {
    const parts = input.split(/[a-zA-Z]/); // Dividir el input en partes numéricas y literales
    const numericPart = parts[0];

    if (!numericPart) {
      return 1; // Si no se proporciona un número, se asume 1
    }

    if (numericPart.includes('/')) {
      const fractionParts = numericPart.split('/');
      if (fractionParts.length === 2) {
        const numerator = parseFloat(fractionParts[0]);
        const denominator = parseFloat(fractionParts[1]);
        if (denominator !== 0) {
          return numerator / denominator;
        } else {
          return null; // Evitamos la división por cero
        }
      } else {
        return null; // Evitamos números en formato "3/2/3"
      }
    }

    return parseFloat(numericPart);
  };

  this.getUnit = function(input) {
    const unitRegex = /[a-zA-Z]+$/;
    const match = input.match(unitRegex);
    if (!match) {
      return null; // Si no se encuentra una unidad, devolver null
    }

    const unit = match[0].toLowerCase();
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    if (!validUnits.includes(unit)) {
      return null; // Si la unidad no es válida, devolver null
    }

    return unit;
  };

  this.getReturnUnit = function(initUnit) {
    const unit = initUnit.toLowerCase();
    switch (unit) {
      case 'gal':
        return 'l';
      case 'l':
        return 'gal';
      case 'mi':
        return 'km';
      case 'km':
        return 'mi';
      case 'lbs':
        return 'kg';
      case 'kg':
        return 'lbs';
      default:
        return null;
    }
  };

  this.spellOutUnit = function(unit) {
    const unitNames = {
      'gal': 'gallons',
      'l': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };

    return unitNames[unit] || null;
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    const unit = initUnit.toLowerCase();
    switch (unit) {
      case 'gal':
        return initNum * galToL;
      case 'l':
        return initNum / galToL;
      case 'mi':
        return initNum * miToKm;
      case 'km':
        return initNum / miToKm;
      case 'lbs':
        return initNum * lbsToKg;
      case 'kg':
        return initNum / lbsToKg;
      default:
        return null;
    }
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum.toFixed(5)} ${this.spellOutUnit(returnUnit)}`;
  };

}

module.exports = ConvertHandler;
