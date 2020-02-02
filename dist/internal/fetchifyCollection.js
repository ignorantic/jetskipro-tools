"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ramda = require("ramda");

var _fetchify = _interopRequireDefault(require("../fetchify"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Function used to transform a fetched collection
 *
 * @param {Array} data
 * @return {Array}
 */
var fetchifyCollection = function fetchifyCollection(data) {
  return (0, _ramda.map)(_fetchify["default"], data);
};

var _default = fetchifyCollection;
exports["default"] = _default;