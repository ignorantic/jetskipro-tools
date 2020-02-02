"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _applyDiscount = _interopRequireDefault(require("./applyDiscount"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Get value of applied promotional code discount and discount cost
 *
 * @param {Object} params
 * @param {number} params.promotionCost
 * @param {number} params.appliedPromoCodeDiscount
 * @return {number}
 */
var getPromoCodeCost = function getPromoCodeCost(params) {
  var promotionCost = params.promotionCost,
      appliedPromoCodeDiscount = params.appliedPromoCodeDiscount;

  if (appliedPromoCodeDiscount === 0) {
    return promotionCost;
  }

  return (0, _applyDiscount["default"])(promotionCost, appliedPromoCodeDiscount);
};

var _default = getPromoCodeCost;
exports["default"] = _default;