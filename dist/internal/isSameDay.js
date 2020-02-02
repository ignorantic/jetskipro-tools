"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ramda = require("ramda");

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Check if a date in order is same that was get one
 *
 * @param {string} date
 * @param {Object} order
 * @returns {boolean}
 */
var isSameDay = function isSameDay(date, order) {
  return !date || (0, _ramda.prop)('discounts', order) && (0, _moment["default"])(date).isSame(order.dateTour, 'day');
};

var _default = isSameDay;
exports["default"] = _default;