"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ramda = require("ramda");

/**
 * Get actual scooter price
 *
 * @param {Object} order
 * @param {Object} calculations
 * @param {number} count
 * @return {number}
 */
var getActualScooterPrice = function getActualScooterPrice(order, calculations, count) {
  return (0, _ramda.and)(order, count > (0, _ramda.prop)('scootersCount', order)) ? (0, _ramda.prop)('scooterPrice', calculations) : (0, _ramda.propOr)((0, _ramda.prop)('scooterPrice', calculations), 'scooterPrice', order);
};

var _default = getActualScooterPrice;
exports["default"] = _default;