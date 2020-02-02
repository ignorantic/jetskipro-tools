"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
 * Apply discount to got cost
 *
 * @param {number} cost
 * @param {number} discount
 * @returns {number}
 */
var applyDiscount = function applyDiscount(cost, discount) {
  return Math.round(cost * (1 - discount / 100));
};

var _default = applyDiscount;
exports["default"] = _default;