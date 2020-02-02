"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ramda = require("ramda");

var _sendify = _interopRequireDefault(require("../sendify"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Function used to transform a collection to be sendify
 *
 * @param {Array} data
 * @return {Array}
 */
var sendifyCollection = function sendifyCollection(data) {
  return (0, _ramda.map)(_sendify["default"], data);
};

var _default = sendifyCollection;
exports["default"] = _default;