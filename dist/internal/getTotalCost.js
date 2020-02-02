"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ramda = require("ramda");

var _getAppliedAdditionalServices = _interopRequireDefault(require("./getAppliedAdditionalServices"));

var _calcAdditionalServicesCost = _interopRequireDefault(require("./calcAdditionalServicesCost"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Get value of prepayment discount and discount cost
 *
 * @param {Object} params
 * @param {Object} params.order
 * @param {number} params.prepaymentCost
 * @param {number} params.additionalServices
 * @param {string} params.selectedAdditionalServices
 * @return {[number, number]}
 */
var getTotalCost = function getTotalCost(params) {
  var prepaymentCost = params.prepaymentCost;
  var getAdditionalServicesCost = (0, _ramda.compose)(_calcAdditionalServicesCost["default"], _getAppliedAdditionalServices["default"]);
  var additionalServicesCost = getAdditionalServicesCost(params);
  var totalCost = (0, _ramda.add)(prepaymentCost, additionalServicesCost);
  return [additionalServicesCost, totalCost];
};

var _default = getTotalCost;
exports["default"] = _default;