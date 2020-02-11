"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ramda = require("ramda");

var _sendify = _interopRequireDefault(require("../sendify"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/** Function used to transform a collection to be sendify */
var sendifyCollection = (0, _ramda.ifElse)(_ramda.isEmpty, (0, _ramda.always)(undefined), (0, _ramda.map)(function (data) {
  return (0, _sendify["default"])(data);
}));
var _default = sendifyCollection;
exports["default"] = _default;