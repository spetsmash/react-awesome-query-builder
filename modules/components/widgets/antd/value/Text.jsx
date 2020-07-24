import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Input, Col } from 'antd';
import MaskedInput from 'react-text-mask';

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
    if (val && (val === '.' || val.endsWith('..'))) return;
    if (val) {
      const parts = val.split('.');
      if (
          parts.length > 4 ||
          parts.some(part => part === '00' || part < 0 || part > 255)
      ) {
        return;
      }
    }
    this.props.setValue(val, false, true);
  };

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
        <Col>
          {mask ?
              (
                  <MaskedInput
                      mask={mask}
                      guide={false}
                      value={_value}
                      showMask
                      render={(ref, props) => {
                        return (
                            <Input
                                name={name}
                                value={_value}
                                ref={(input) => ref(input && input.input)}
                                {...props}
                                onChange={this.handleChange}
                                key="widget-text"
                                size={renderSize}
                                placeholder={placeholder}
                                onBlur={this.validateOnBlur.bind(this.props)}
                            />)}} />
              ) : (
            <Input
                key="widget-text"
                size={renderSize}
                type={"text"}
                value={_value}
                placeholder={placeholder}
                {...customProps}
                onChange={this.handleChange}
                onBlur={this.validateOnBlur.bind(this.props)}
                disabled={readonly}
            />)}
      </Col>)
  }
}
