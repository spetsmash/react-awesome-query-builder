"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _range = _interopRequireDefault(require("lodash/range"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Proximity = /*#__PURE__*/function (_PureComponent) {
  _inherits(Proximity, _PureComponent);

  var _super = _createSuper(Proximity);

  function Proximity() {
    var _this;

    _classCallCheck(this, Proximity);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _this.handleChange = function (value) {
      _this.props.setOption('proximity', parseInt(value));
    };

    return _this;
  }

  _createClass(Proximity, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          defaults = _this$props.defaults,
          options = _this$props.options,
          config = _this$props.config,
          optionLabel = _this$props.optionLabel,
          optionPlaceholder = _this$props.optionPlaceholder,
          customProps = _this$props.customProps,
          minProximity = _this$props.minProximity,
          maxProximity = _this$props.maxProximity,
          optionTextBefore = _this$props.optionTextBefore,
          readonly = _this$props.readonly;
      var settings = config.settings,
          widgets = config.widgets;
      var defaultProximity = defaults ? defaults.proximity : undefined;
      var showLabels = settings.showLabels;
      var selectedProximity = options.get('proximity', defaultProximity);
      var listValues = (0, _range["default"])(minProximity, maxProximity + 1).map(function (item) {
        return {
          title: item,
          value: item
        };
      });
      var Select = widgets.select.factory;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "operator--PROXIMITY"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "operator--options"
      }, showLabels && /*#__PURE__*/_react["default"].createElement("label", null, optionLabel), !showLabels && optionTextBefore && /*#__PURE__*/_react["default"].createElement("div", {
        className: "operator--options--sep"
      }, /*#__PURE__*/_react["default"].createElement("span", null, optionTextBefore)), /*#__PURE__*/_react["default"].createElement(Select, _extends({
        config: config,
        value: selectedProximity,
        listValues: listValues,
        setValue: this.handleChange,
        readonly: readonly,
        placeholder: optionPlaceholder
      }, customProps))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "operator--widgets"
      }, this.props.children));
    }
  }]);

  return Proximity;
}(_react.PureComponent);

exports["default"] = Proximity;
Proximity.propTypes = {
  config: _propTypes["default"].object.isRequired,
  setOption: _propTypes["default"].func.isRequired,
  options: _propTypes["default"].any.isRequired,
  //instanceOf(Immutable.Map)
  minProximity: _propTypes["default"].number,
  maxProximity: _propTypes["default"].number,
  optionPlaceholder: _propTypes["default"].string,
  optionTextBefore: _propTypes["default"].string,
  optionLabel: _propTypes["default"].string,
  customProps: _propTypes["default"].object,
  readonly: _propTypes["default"].bool //children

};
Proximity.defaultProps = {
  customProps: {},
  minProximity: 2,
  maxProximity: 10,
  optionPlaceholder: "Select words between",
  optionLabel: "Words between",
  optionTextBefore: null
};