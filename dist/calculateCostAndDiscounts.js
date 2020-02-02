"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _getPromotionDiscount = _interopRequireDefault(require("./internal/getPromotionDiscount"));

var _getPromotionCost3 = _interopRequireDefault(require("./internal/getPromotionCost"));

var _getPromoCodeCost = _interopRequireDefault(require("./internal/getPromoCodeCost"));

var _getTotalCost3 = _interopRequireDefault(require("./internal/getTotalCost"));

var _getPrepaymentCost3 = _interopRequireDefault(require("./internal/getPrepaymentCost"));

var _getInitialCost = _interopRequireDefault(require("./internal/getInitialCost"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Get values of all discounts and discount costs with each of them
 *
 * @param {Object} params
 * @param {Object} params.order
 * @param {Object} params.calculations
 * @param {string} params.dateTour
 * @param {number} params.scootersCount
 * @param {string} params.bookingType
 * @return {Array}
 */
var calculateCostAndDiscounts = function calculateCostAndDiscounts(params) {
  var order = params.order,
      scootersCount = params.scootersCount,
      bookingType = params.bookingType,
      calculations = params.calculations,
      promoCodeDiscount = params.promoCodeDiscount,
      dateTour = params.dateTour,
      additionalServices = params.additionalServices,
      selectedAdditionalServices = params.selectedAdditionalServices;
  var initialCost = (0, _getInitialCost["default"])({
    order: order,
    scootersCount: scootersCount,
    calculations: calculations
  });
  var initialPromotionDiscount = (0, _getPromotionDiscount["default"])({
    order: order,
    calculations: calculations,
    promoCodeDiscount: promoCodeDiscount,
    dateTour: dateTour
  });

  var _getPromotionCost = (0, _getPromotionCost3["default"])({
    initialCost: initialCost,
    initialPromotionDiscount: initialPromotionDiscount,
    promoCodeDiscount: promoCodeDiscount,
    order: order
  }),
      _getPromotionCost2 = _slicedToArray(_getPromotionCost, 3),
      appliedPromotionDiscount = _getPromotionCost2[0],
      promotionCost = _getPromotionCost2[1],
      appliedPromoCodeDiscount = _getPromotionCost2[2];

  var promoCodeCost = (0, _getPromoCodeCost["default"])({
    promotionCost: promotionCost,
    appliedPromoCodeDiscount: appliedPromoCodeDiscount
  });

  var _getPrepaymentCost = (0, _getPrepaymentCost3["default"])({
    promoCodeCost: promoCodeCost,
    bookingType: bookingType,
    calculations: calculations,
    dateTour: dateTour,
    order: order
  }),
      _getPrepaymentCost2 = _slicedToArray(_getPrepaymentCost, 2),
      appliedPrepaymentDiscount = _getPrepaymentCost2[0],
      prepaymentCost = _getPrepaymentCost2[1];

  var _getTotalCost = (0, _getTotalCost3["default"])({
    order: order,
    additionalServices: additionalServices,
    selectedAdditionalServices: selectedAdditionalServices,
    prepaymentCost: prepaymentCost
  }),
      _getTotalCost2 = _slicedToArray(_getTotalCost, 2),
      additionalServicesCost = _getTotalCost2[0],
      totalCost = _getTotalCost2[1];

  return [initialCost, appliedPromotionDiscount, promotionCost, appliedPromoCodeDiscount, promoCodeCost, appliedPrepaymentDiscount, prepaymentCost, additionalServicesCost, totalCost];
};

var _default = calculateCostAndDiscounts;
exports["default"] = _default;