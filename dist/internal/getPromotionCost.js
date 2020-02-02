"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _applyDiscount = _interopRequireDefault(require("./applyDiscount"));

var _etractPromoCodeDiscount = _interopRequireDefault(require("./etractPromoCodeDiscount"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Get value of applied promotion discount and discount cost
 *
 * @param {Object} params
 * @param {Object} params.order
 * @param {number} params.initialCost
 * @param {number} params.initialPromotionDiscount
 * @param {number} params.promoCodeDiscount
 * @return {[number, number, number]}
 */
var getPromotionCost = function getPromotionCost(params) {
  var order = params.order,
      initialCost = params.initialCost,
      initialPromotionDiscount = params.initialPromotionDiscount,
      promoCodeDiscount = params.promoCodeDiscount;
  var appliedPromoCodeDiscount = order ? (0, _etractPromoCodeDiscount["default"])(order) : promoCodeDiscount || 0;

  if (initialPromotionDiscount >= appliedPromoCodeDiscount) {
    var promotionCost = (0, _applyDiscount["default"])(initialCost, initialPromotionDiscount);
    return [initialPromotionDiscount, promotionCost, 0];
  }

  return [0, initialCost, appliedPromoCodeDiscount];
};

var _default = getPromotionCost;
exports["default"] = _default;