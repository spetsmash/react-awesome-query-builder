import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Input, Col } from 'antd';
import ReactInputMask from 'react-input-mask';

export default class TextWidget extends PureComponent {
  static propTypes = {
    setValue: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    config: PropTypes.object.isRequired,
    value: PropTypes.string,
    field: PropTypes.string.isRequired,
    readonly: PropTypes.bool,
    customProps: PropTypes.object,
  };

  handleChange = (ev) => {
    const v = ev.target.value;
    const val = v === '' ? undefined : v; // don't allow empty value
    this.props.setValue(val, false);
  }

  validateOnBlur() {
    if (!this.value) {
      this.setValue(this.value, true);
    } else {
      this.setValue(this.value.trim(), true);
    }
  }
  render() {
    const {config, placeholder, customProps, value, readonly, mask, operator} = this.props;
    const {renderSize} = config.settings;
    const _value = value != undefined ? value : null;

    return (
        <>
          {operator === "exists" || operator === "not_exists" ?
              null :
              (<Col>
        <ReactInputMask
            mask={mask}
            onChange={this.handleChange} value={_value} onBlur={this.validateOnBlur.bind(this.props)} disabled={readonly}>
          <Input
          key="widget-text"
          size={renderSize}
          type={"text"}
              value={_value}
          placeholder={placeholder}
          {...customProps}
        />
        </ReactInputMask>
      </Col>)}
      </>
    );

  }
}
