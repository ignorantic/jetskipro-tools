"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ramda = require("ramda");

/** Make function that union arrays by unique id prop */
var unionById = (0, _ramda.unionWith)((0, _ramda.eqBy)((0, _ramda.prop)('id')));
var _default = unionById;
exports["default"] = _default;