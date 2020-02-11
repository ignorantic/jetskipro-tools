"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ramda = require("ramda");

var _sendifyCollection = _interopRequireDefault(require("./internal/sendifyCollection"));

var _sendifyObject = _interopRequireDefault(require("./internal/sendifyObject"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/** Function used to transform a send data */
var sendify = (0, _ramda.cond)([[(0, _ramda.is)(Array), _sendifyCollection["default"]], [(0, _ramda.is)(Object), _sendifyObject["default"]], [_ramda.T, _ramda.identity]]);
var _default = sendify;
exports["default"] = _default;