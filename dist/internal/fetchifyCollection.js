"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ramda = require("ramda");

var _fetchify = _interopRequireDefault(require("../fetchify"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/** Function used to transform a fetched collection */
var fetchifyCollection = (0, _ramda.ifElse)(_ramda.isEmpty, (0, _ramda.always)(undefined), (0, _ramda.map)(function (data) {
  return (0, _fetchify["default"])(data);
}));
var _default = fetchifyCollection;
exports["default"] = _default;