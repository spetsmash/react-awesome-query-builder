"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _configProvider = _interopRequireDefault(require("antd/lib/config-provider"));

var _react = _interopRequireDefault(require("react"));

var _Date = _interopRequireDefault(require("./value/Date"));

var _DateTime = _interopRequireDefault(require("./value/DateTime"));

var _Time = _interopRequireDefault(require("./value/Time"));

var _Select = _interopRequireDefault(require("./value/Select"));

var _Text = _interopRequireDefault(require("./value/Text"));

var _Number = _interopRequireDefault(require("./value/Number"));

var _Slider = _interopRequireDefault(require("./value/Slider"));

var _Range = _interopRequireDefault(require("./value/Range"));

var _Boolean = _interopRequireDefault(require("./value/Boolean"));

var _MultiSelect = _interopRequireDefault(require("./value/MultiSelect"));

var _TreeSelect = _interopRequireDefault(require("./value/TreeSelect"));

var _FieldSelect = _interopRequireDefault(require("./core/FieldSelect"));

var _FieldDropdown = _interopRequireDefault(require("./core/FieldDropdown"));

var _FieldCascader = _interopRequireDefault(require("./core/FieldCascader"));

var _FieldTreeSelect = _interopRequireDefault(require("./core/FieldTreeSelect"));

var _Button = _interopRequireDefault(require("./core/Button"));

var _ButtonGroup = _interopRequireDefault(require("./core/ButtonGroup"));

var _Conjs = _interopRequireDefault(require("./core/Conjs"));

var _ValueSources = _interopRequireDefault(require("./core/ValueSources"));

var _confirm = _interopRequireDefault(require("./core/confirm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// value widgets
// field select widgets
// core components
var Provider = function Provider(_ref) {
  var config = _ref.config,
      children = _ref.children;
  return /*#__PURE__*/_react["default"].createElement(_configProvider["default"], {
    locale: config.settings.locale.antd
  }, children);
};

var _default = {
  DateWidget: _Date["default"],
  DateTimeWidget: _DateTime["default"],
  TimeWidget: _Time["default"],
  SelectWidget: _Select["default"],
  TextWidget: _Text["default"],
  NumberWidget: _Number["default"],
  SliderWidget: _Slider["default"],
  RangeWidget: _Range["default"],
  BooleanWidget: _Boolean["default"],
  MultiSelectWidget: _MultiSelect["default"],
  TreeSelectWidget: _TreeSelect["default"],
  FieldSelect: _FieldSelect["default"],
  FieldDropdown: _FieldDropdown["default"],
  FieldCascader: _FieldCascader["default"],
  FieldTreeSelect: _FieldTreeSelect["default"],
  Button: _Button["default"],
  ButtonGroup: _ButtonGroup["default"],
  Conjs: _Conjs["default"],
  ValueSources: _ValueSources["default"],
  confirm: _confirm["default"],
  Provider: Provider
};
exports["default"] = _default;