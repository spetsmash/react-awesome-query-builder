"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _col = _interopRequireDefault(require("antd/lib/col"));

var _input = _interopRequireDefault(require("antd/lib/input"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactInputMask = _interopRequireDefault(require("react-input-mask"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var TextWidget = /*#__PURE__*/function (_PureComponent) {
  _inherits(TextWidget, _PureComponent);

  var _super = _createSuper(TextWidget);

  function TextWidget() {
    var _this;

    _classCallCheck(this, TextWidget);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _this.handleChange = function (ev) {
      var v = ev.target.value;
      var val = v === '' ? undefined : v; // don't allow empty value

      _this.props.setValue(val, false);
    };

    return _this;
  }

  _createClass(TextWidget, [{
    key: "validateOnBlur",
    value: function validateOnBlur() {
      if (!this.value) {
        this.setValue(this.value, true);
      } else {
        this.setValue(this.value.trim(), true);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          config = _this$props.config,
          placeholder = _this$props.placeholder,
          customProps = _this$props.customProps,
          value = _this$props.value,
          readonly = _this$props.readonly,
          mask = _this$props.mask,
          operator = _this$props.operator;
      var renderSize = config.settings.renderSize;

      var _value = value != undefined ? value : null;

      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, operator === "exists" || operator === "not_exists" ? null : /*#__PURE__*/_react["default"].createElement(_col["default"], null, /*#__PURE__*/_react["default"].createElement(_reactInputMask["default"], {
        mask: mask,
        onChange: this.handleChange,
        value: _value,
        onBlur: this.validateOnBlur.bind(this.props)
      }, /*#__PURE__*/_react["default"].createElement(_input["default"], _extends({
        disabled: readonly,
        key: "widget-text",
        size: renderSize,
        type: "text",
        value: _value,
        placeholder: placeholder
      }, customProps)))));
    }
  }]);

  return TextWidget;
}(_react.PureComponent);

exports["default"] = TextWidget;
TextWidget.propTypes = {
  setValue: _propTypes["default"].func.isRequired,
  placeholder: _propTypes["default"].string,
  config: _propTypes["default"].object.isRequired,
  value: _propTypes["default"].string,
  field: _propTypes["default"].string.isRequired,
  readonly: _propTypes["default"].bool,
  customProps: _propTypes["default"].object
};