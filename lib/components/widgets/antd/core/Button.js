"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _button = _interopRequireDefault(require("antd/lib/button"));

var _react = _interopRequireDefault(require("react"));

var _icons = require("@ant-design/icons");

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(_ref) {
  var type = _ref.type,
      onClick = _ref.onClick,
      label = _ref.label,
      settings = _ref.config.settings,
      disabled = _ref.disabled;
  var typeToIcon = {
    "addRule": /*#__PURE__*/_react["default"].createElement(_icons.PlusOutlined, null),
    "addGroup": /*#__PURE__*/_react["default"].createElement(_icons.PlusCircleOutlined, null),
    "delRule": /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
      icon: _freeSolidSvgIcons.faTrashAlt,
      size: "1x"
    }),
    "delGroup": /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
      icon: _freeSolidSvgIcons.faTrashAlt,
      size: "1x"
    }),
    "addRuleGroup": /*#__PURE__*/_react["default"].createElement(_icons.PlusOutlined, null),
    "delRuleGroup": /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
      icon: _freeSolidSvgIcons.faTrashAlt,
      size: "1x"
    })
  };
  var typeToClass = {
    "addRule": "action action--ADD-RULE",
    "addGroup": "action action--ADD-GROUP",
    "delRule": "action action--DELETE",
    //?
    "delGroup": "action action--DELETE",
    "addRuleGroup": /*#__PURE__*/_react["default"].createElement(_icons.PlusOutlined, null),
    "delRuleGroup": /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
      icon: _freeSolidSvgIcons.faTrashAlt,
      size: "1x"
    })
  };
  var typeToType = {
    "delRule": "danger",
    "delGroup": "danger",
    "delRuleGroup": "danger"
  };
  var renderSize = settings.renderSize;
  var btnLabel = type == "addRuleGroup" ? "" : label;
  return /*#__PURE__*/_react["default"].createElement(_button["default"], {
    key: type,
    type: typeToType[type] || "default",
    icon: typeToIcon[type],
    className: typeToClass[type],
    onClick: onClick,
    size: renderSize,
    disabled: disabled
  }, btnLabel);
};

exports["default"] = _default;