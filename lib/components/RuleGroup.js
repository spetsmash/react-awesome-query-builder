"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _GroupContainer = _interopRequireDefault(require("./containers/GroupContainer"));

var _Draggable = _interopRequireDefault(require("./containers/Draggable"));

var _Group2 = require("./Group");

var _RuleGroupActions = require("./RuleGroupActions");

var _Rule = require("./Rule");

var _stuff = require("../utils/stuff");

var _icons = require("@ant-design/icons");

var _dec, _class, _class2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var RuleGroup = (_dec = (0, _Draggable["default"])("group rule_group"), (0, _GroupContainer["default"])(_class = _dec(_class = (_temp = _class2 = /*#__PURE__*/function (_Group) {
  _inherits(RuleGroup, _Group);

  var _super = _createSuper(RuleGroup);

  function RuleGroup(props) {
    var _this;

    _classCallCheck(this, RuleGroup);

    _this = _super.call(this, props);

    _this.childrenClassName = function () {
      return 'rule_group--children';
    };

    _this.renderHeaderWrapper = function () {
      return null;
    };

    _this.renderFooterWrapper = function () {
      return null;
    };

    _this.renderConjs = function () {
      return null;
    };

    _this.canAddGroup = function () {
      return false;
    };

    _this.canAddRule = function () {
      return true;
    };

    _this.canDeleteGroup = function () {
      return false;
    };

    _this.arrRequiredFields = [];
    (0, _stuff.useOnPropsChanged)(_assertThisInitialized(_this));

    _this.onPropsChanged(props);

    return _this;
  }

  _createClass(RuleGroup, [{
    key: "onPropsChanged",
    value: function onPropsChanged(nextProps) {}
  }, {
    key: "reordableNodesCnt",
    value: function reordableNodesCnt() {
      var children1 = this.props.children1;
      return children1.size;
    }
  }, {
    key: "renderChildrenWrapper",
    value: function renderChildrenWrapper() {
      var divStyleRow = {
        display: 'flex',
        flexFlow: 'row'
      };
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "rule--body--wrapper"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "rule-group-rows"
      }, this.renderDrag(), this.renderField(), this.renderActions(), _get(_getPrototypeOf(RuleGroup.prototype), "renderChildrenWrapper", this).call(this)), this.ifRuleGroup() && this.arrRequiredFields.length > 0 && !this.ifErrorGroup() ? /*#__PURE__*/_react["default"].createElement("div", null, this.errorMessageRequiredField(this.arrRequiredFields)) : null);
    }
  }, {
    key: "errorMessageRequiredField",
    value: function errorMessageRequiredField(fields) {
      var config = this.props.config;

      var newFields = _toConsumableArray(fields); // let label = config.fields[selectedField.split('.')[0]].subfields[selectedField.split('.')[1]].subfields.value.label;


      var indexVal = newFields.indexOf('value');
      var indexCur = newFields.indexOf('currency');

      if (indexVal !== -1) {
        newFields.splice(indexVal, 1, config.settings.amountLabel);
      }

      if (indexCur !== -1) {
        newFields.splice(indexCur, 1, config.settings.currencyLabel);
      }

      newFields = newFields.map(function (el) {
        return el.charAt(0).toUpperCase() + el.slice(1);
      });
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "rule--group-error"
      }, /*#__PURE__*/_react["default"].createElement("p", null, /*#__PURE__*/_react["default"].createElement(_icons.ExclamationCircleFilled, {
        className: "icon-red"
      }), " ", config.settings.addRequiredFieldMessage, /*#__PURE__*/_react["default"].createElement("span", null, " ", newFields.join(', '))));
    }
  }, {
    key: "ifRuleGroup",
    value: function ifRuleGroup() {
      var _this$props = this.props,
          selectedField = _this$props.selectedField,
          children1 = _this$props.children1,
          config = _this$props.config;

      if (selectedField && selectedField.split('.').length === 2 && config.fields[selectedField.split('.')[0]].subfields[selectedField.split('.')[1]].type === '!group') {
        if (children1) {
          this.checkRequiredNestedFields(children1);
        }

        return true;
      }
    }
  }, {
    key: "ifErrorGroup",
    value: function ifErrorGroup() {
      var item = this.props.item;
      var validity = item.get('properties').get('validity');

      if (validity === undefined) {
        validity = true;
      }

      return validity;
    }
  }, {
    key: "checkRequiredNestedFields",
    value: function checkRequiredNestedFields(children) {
      var arrChildrenSelected = [];
      var requiredRules = ['currency', 'value'];
      children.forEach(function (item) {
        var temp = {
          keyField: null
        };
        temp.keyField = item.get('properties').get('field');
        arrChildrenSelected.push(temp);
      });

      for (var i = 0; i < arrChildrenSelected.length; i++) {
        if (arrChildrenSelected[i].keyField && arrChildrenSelected[i].keyField !== null && arrChildrenSelected[i].keyField.split('.').length > 1) {
          var temp = arrChildrenSelected[i].keyField.split('.')[2];
          var index = requiredRules.indexOf(temp);

          if (index !== -1) {
            requiredRules.splice(index, 1);
          }
        }
      }

      if (requiredRules.length <= 0) {
        this.props.removeError();
      }

      this.arrRequiredFields = requiredRules;
    }
  }, {
    key: "renderField",
    value: function renderField() {
      var immutableFieldsMode = this.props.config.settings.immutableFieldsMode;
      return /*#__PURE__*/_react["default"].createElement(_Rule.FieldWrapper, {
        key: "field",
        classname: "group--field",
        config: this.props.config,
        selectedField: this.props.selectedField,
        setField: this.props.setField,
        parentField: this.props.parentField,
        readonly: immutableFieldsMode
      });
    }
  }, {
    key: "renderActions",
    value: function renderActions() {
      var _this$props2 = this.props,
          config = _this$props2.config,
          addRule = _this$props2.addRule;
      return /*#__PURE__*/_react["default"].createElement(_RuleGroupActions.RuleGroupActions, {
        config: config,
        addRule: addRule,
        canAddRule: this.canAddRule(),
        canDeleteGroup: this.canDeleteGroup(),
        removeSelf: this.removeSelf
      });
    }
  }, {
    key: "extraPropsForItem",
    value: function extraPropsForItem(_item) {
      return {
        parentField: this.props.selectedField
      };
    }
  }]);

  return RuleGroup;
}(_Group2.Group), _class2.propTypes = _objectSpread(_objectSpread({}, _Group2.Group.propTypes), {}, {
  selectedField: _propTypes["default"].string,
  parentField: _propTypes["default"].string,
  setField: _propTypes["default"].func,
  removeError: _propTypes["default"].func,
  item: _propTypes["default"].any
}), _temp)) || _class) || _class);
var _default = RuleGroup;
exports["default"] = _default;