"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ramda = require("ramda");

var _isSameDay = _interopRequireDefault(require("./isSameDay"));

var _extractPromotionDiscount = _interopRequireDefault(require("./extractPromotionDiscount"));

var _isPromotionActive = _interopRequireDefault(require("./isPromotionActive"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Get initial cost, before applying discounts
 *
 * @param {Object} params
 * @param {Object} params.order
 * @param {Object} params.calculations
 * @param {string} params.dateTour
 * @return {number}
 */
var getPromotionDiscount = function getPromotionDiscount(params) {
  var order = params.order,
      calculations = params.calculations,
      dateTour = params.dateTour;
  var discountPromotion = calculations.discountPromotion;

  if ((0, _isSameDay["default"])(dateTour, order)) {
    return (0, _extractPromotionDiscount["default"])(order);
  }

  var isPromotion = (0, _isPromotionActive["default"])(discountPromotion, dateTour);
  return isPromotion ? (0, _ramda.prop)('value', discountPromotion) : 0;
};

var _default = getPromotionDiscount;
exports["default"] = _default;