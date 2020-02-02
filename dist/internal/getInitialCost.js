"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ramda = require("ramda");

var _getActualScooterPrice = _interopRequireDefault(require("./getActualScooterPrice"));

var _getActualScooterCount = _interopRequireDefault(require("./getActualScooterCount"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Get initial cost, before applying discounts
 *
 * @param {Object} params
 * @param {Object} params.order
 * @param {number} params.scootersCount
 * @param {Object} params.calculations
 * @return {number}
 */
var getInitialCost = function getInitialCost(params) {
  var order = params.order,
      scootersCount = params.scootersCount,
      calculations = params.calculations;
  var actualScooterPrice = (0, _getActualScooterPrice["default"])(order, calculations, scootersCount);
  var actualScootersCount = (0, _getActualScooterCount["default"])(order, scootersCount);
  return (0, _ramda.multiply)(actualScooterPrice, actualScootersCount);
};

var _default = getInitialCost;
exports["default"] = _default;