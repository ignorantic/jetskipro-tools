"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ramda = require("ramda");

/**
 * Get cost of additional services
 *
 * @param {Array} services
 * @return {number}
 */
var calcAdditionalServicesCost = function calcAdditionalServicesCost(services) {
  return (0, _ramda.reduce)(function (accumulator, service) {
    return (0, _ramda.add)(accumulator, (0, _ramda.propOr)(0, 'price', service));
  }, 0, services);
};

var _default = calcAdditionalServicesCost;
exports["default"] = _default;