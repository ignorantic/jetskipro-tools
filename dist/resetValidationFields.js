"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ramda = require("ramda");

var _toCamel = _interopRequireDefault(require("./toCamel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Function used to transform a form errors
 *
 * @param errors The fetched data
 * @returns {{}}
 */
function resetValidationFields(_ref) {
  var errors = _ref.errors;
  var data = {};
  (0, _ramda.forEachObjIndexed)(function (value, key) {
    var index = (0, _toCamel["default"])(key);
    data[index] = (0, _ramda.head)(value);
  }, errors);
  return data;
}

var _default = resetValidationFields;
exports["default"] = _default;