"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ramda = require("ramda");

/**
 * Make function that check if a prop `id` is in an array
 *
 * @param {Array} ids
 * @return {function}
 */
var containsIds = function containsIds(ids) {
  return (0, _ramda.compose)((0, _ramda.includes)(_ramda.__, ids), (0, _ramda.prop)('id'));
};

var _default = containsIds;
exports["default"] = _default;