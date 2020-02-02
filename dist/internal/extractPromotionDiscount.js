"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ramda = require("ramda");

/**
 * Extract promotion discount from order
 *
 * @param {Object} order
 * @param {Object} params.discounts
 * @return {number}
 */
var extractPromotionDiscount = (0, _ramda.compose)((0, _ramda.propOr)(0, 'value'), (0, _ramda.find)((0, _ramda.propEq)('type', 'promotion')), (0, _ramda.propOr)([], 'discounts'));
var _default = extractPromotionDiscount;
exports["default"] = _default;