"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _ramda = require("ramda");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Check if promotion is active
 *
 * @param {Object} discount
 * @param {Object} discount.orderStartAt
 * @param {Object} discount.orderExpiresAt
 * @param {Object} discount.value
 * @param {string} date
 * @return {boolean}
 */
var isPromotionActive = function isPromotionActive(discount, date) {
  return Boolean((0, _moment["default"])(date).isBetween((0, _ramda.prop)('orderStartsAt', discount), (0, _ramda.prop)('orderExpiresAt', discount), 'day', '[]'));
};

var _default = isPromotionActive;
exports["default"] = _default;