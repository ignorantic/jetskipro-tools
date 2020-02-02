"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ramda = require("ramda");

var _fetchifyCollection = _interopRequireDefault(require("./internal/fetchifyCollection"));

var _fetchifyObject = _interopRequireDefault(require("./internal/fetchifyObject"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/** Function used to transform a fetched data */
var fetchify = (0, _ramda.cond)([[(0, _ramda.is)(Array), _fetchifyCollection["default"]], [(0, _ramda.is)(Object), _fetchifyObject["default"]], [_ramda.T, _ramda.identity]]);
var _default = fetchify;
exports["default"] = _default;