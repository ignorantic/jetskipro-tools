"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ramda = require("ramda");

var _pluckIdsAndFilterVoid = _interopRequireDefault(require("./pluckIdsAndFilterVoid"));

var _unionById = _interopRequireDefault(require("./unionById"));

var _containsIds = _interopRequireDefault(require("./containsIds"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Get united services with prices to calculate cost
 *
 * @param {Object} params
 * @param {Object} params.order
 * @param {Array}  params.additionalServices
 * @param {Array}  params.selectedAdditionalServices
 * @returns {Array}
 */
var getAppliedAdditionalServices = function getAppliedAdditionalServices(params) {
  var order = params.order,
      additionalServices = params.additionalServices,
      selectedAdditionalServices = params.selectedAdditionalServices;
  var servicesFromOrder = (0, _ramda.prop)('additionalServices', order);
  var unitedServices = (0, _unionById["default"])(servicesFromOrder, additionalServices);
  var ids = (0, _pluckIdsAndFilterVoid["default"])(selectedAdditionalServices || order.additionalServices || []);
  var isServiceSelected = (0, _containsIds["default"])(ids);
  return (0, _ramda.filter)(isServiceSelected, unitedServices);
};

var _default = getAppliedAdditionalServices;
exports["default"] = _default;