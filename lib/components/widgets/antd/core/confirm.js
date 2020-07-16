"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _modal = _interopRequireDefault(require("antd/lib/modal"));

var _button = _interopRequireDefault(require("antd/lib/button"));

var _react = _interopRequireDefault(require("react"));

var ReactDOM = _interopRequireWildcard(require("react-dom"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : options,
      onOk = _ref.onOk,
      okText = _ref.okText,
      cancelText = _ref.cancelText,
      text = _ref.text,
      title = _ref.title;

  var visible = true;

  var onConfirm = function onConfirm() {
    onOk();
    close();
    visible = false;
  };

  var div = document.createElement('div');
  document.body.appendChild(div);

  function close() {
    var unmountResult = ReactDOM.unmountComponentAtNode(div);

    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  }

  function render(onOk, okText, cancelText, title, text) {
    /**
     * https://github.com/ant-design/ant-design/issues/23623
     * Sync render blocks React event. Let's make this async.
     */
    setTimeout(function () {
      ReactDOM.render( /*#__PURE__*/_react["default"].createElement(_modal["default"], {
        title: title,
        centered: true,
        visible: true,
        onCancel: close,
        footer: [/*#__PURE__*/_react["default"].createElement(_button["default"], {
          key: "0",
          onClick: close
        }, cancelText), /*#__PURE__*/_react["default"].createElement(_button["default"], {
          key: "1",
          type: "primary",
          danger: true,
          onClick: onConfirm
        }, okText)]
      }, text), div);
    });
  }

  render(onOk, okText, cancelText, title, text);
};

exports["default"] = _default;