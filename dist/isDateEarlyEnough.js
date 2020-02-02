"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.isDateEarlyEnough = void 0;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Login if date is early enough
 *
 * @param dateTour
 * @param calculations
 * @return {boolean}
 */
var isDateEarlyEnough = function isDateEarlyEnough(dateTour, calculations) {
  var earlyDiscountDayCount = calculations.earlyDiscountDayCount;
  var lastDiscountDay = (0, _moment["default"])().add(earlyDiscountDayCount, 'day');
  return (0, _moment["default"])(dateTour).isAfter(lastDiscountDay, 'day');
};

exports.isDateEarlyEnough = isDateEarlyEnough;
var _default = isDateEarlyEnough;
exports["default"] = _default;