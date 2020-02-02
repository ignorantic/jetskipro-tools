"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var toCamel = function toCamel(str) {
  return str.replace(/[-_]([a-z])/g, function (m) {
    return m[1].toUpperCase();
  });
};

var _default = toCamel;
exports["default"] = _default;