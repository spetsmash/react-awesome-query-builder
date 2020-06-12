"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _modal = _interopRequireDefault(require("antd/lib/modal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var confirm = _modal["default"].confirm;

var _default = function _default() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    onOk: onOk,
    okText: okText,
    cancelText: cancelText,
    title: title
  };
  confirm(options);
};

exports["default"] = _default;