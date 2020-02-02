"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ramda = require("ramda");

/**
 * Get actual scooter count
 *
 * @param {Object} order
 * @param {number} count
 * @return {number}
 */
var getActualScooterCount = function getActualScooterCount(order, count) {
  return count || (0, _ramda.propOr)(0, 'scootersCount', order);
};

var _default = getActualScooterCount;
exports["default"] = _default;