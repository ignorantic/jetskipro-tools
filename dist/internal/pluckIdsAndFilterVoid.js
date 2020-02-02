"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ramda = require("ramda");

/** Make function that pluck prop `id` form array items and filter undefined and null */
var pluckIdsAndFilterVoid = (0, _ramda.compose)((0, _ramda.filter)(_ramda.identity), (0, _ramda.pluck)('id'));
var _default = pluckIdsAndFilterVoid;
exports["default"] = _default;