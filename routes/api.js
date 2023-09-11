'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function(app) {

  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    const input = req.query.input;

    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    if (!initNum && !initUnit) {
      return res.json({ error: "invalid number and unit" });
    } else if (!initNum) {
      return res.json({ error: "invalid number" });
    } else if (!initUnit) {
      return res.json({ error: "invalid unit" })
    }


    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const returnNum = parseFloat(convertHandler.convert(initNum, initUnit)).toFixed(5);

    const toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    res.json({
      initNum,
      initUnit,
      returnNum: Number(returnNum),
      returnUnit,
      string: toString
    });
  });

};
