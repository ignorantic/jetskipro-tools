"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ramda = require("ramda");

var toSnake = function toSnake(str) {
  return str.replace(/([A-Z])/g, function (x) {
    return (0, _ramda.concat)('_', x.toLowerCase());
  });
};

var _default = toSnake;
exports["default"] = _default;