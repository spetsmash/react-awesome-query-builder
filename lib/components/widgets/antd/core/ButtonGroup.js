"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _button = _interopRequireDefault(require("antd/lib/button"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ButtonGroup = _button["default"].Group;

var _default = function _default(_ref) {
  var children = _ref.children,
      settings = _ref.config.settings;
  var renderSize = settings.renderSize;
  return /*#__PURE__*/_react["default"].createElement(ButtonGroup, {
    size: renderSize
  }, children);
};

exports["default"] = _default;