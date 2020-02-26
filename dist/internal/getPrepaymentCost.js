"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _applyDiscount = _interopRequireDefault(require("./applyDiscount"));

var _isDateEarlyEnough = require("../isDateEarlyEnough");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Get value of prepayment discount and discount cost
 *
 * @param {Object} params
 * @param {number} params.promoCodeCost
 * @param {string} params.bookingType
 * @param {Object} params.calculations
 * @param {string} params.dateTour
 * @param {Object} params.order
 * @return {[number, number]}
 */
var getPrepaymentCost = function getPrepaymentCost(params) {
  var promoCodeCost = params.promoCodeCost,
      bookingType = params.bookingType,
      calculations = params.calculations,
      dateTour = params.dateTour,
      order = params.order;
  var discountPrepayment = calculations.discountPrepayment;
  var isDateEarly = (0, _isDateEarlyEnough.isDateEarlyEnough)(dateTour, calculations);
  var appliedPrepaymentDiscount = discountPrepayment && isDateEarly && bookingType === 'full' ? discountPrepayment : 0;
  var prepaymentCost = (0, _applyDiscount["default"])(promoCodeCost, appliedPrepaymentDiscount);
  return [appliedPrepaymentDiscount, prepaymentCost];
};

var _default = getPrepaymentCost;
exports["default"] = _default;