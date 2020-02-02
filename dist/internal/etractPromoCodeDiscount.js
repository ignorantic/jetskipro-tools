"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ramda = require("ramda");

/**
 * Extract promo code discount from order
 *
 * @param {Object} order
 * @param {Object} order.discounts
 * @return {number}
 */
var extractPromoCodeDiscount = (0, _ramda.compose)((0, _ramda.propOr)(0, 'value'), (0, _ramda.find)((0, _ramda.anyPass)([(0, _ramda.propEq)('type', 'promo_code_one'), (0, _ramda.propEq)('type', 'promo_code_many')])), (0, _ramda.propOr)([], 'discounts'));
var _default = extractPromoCodeDiscount;
exports["default"] = _default;