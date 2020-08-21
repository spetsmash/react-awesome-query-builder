import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;
import moment from 'moment';
import boolean from "less/lib/less/functions/boolean";


export default class DateWidget extends PureComponent {
    static propTypes = {
        setValue: PropTypes.func.isRequired,
        value: PropTypes.any, //in valueFormat
        field: PropTypes.string.isRequired,
        config: PropTypes.object.isRequired,
        placeholder: PropTypes.string,
        customProps: PropTypes.object,
        readonly: PropTypes.bool,
        // from fieldSettings:
        dateFormat: PropTypes.string,
        valueFormat: PropTypes.string,
    };

    wasChanged = false;

    constructor(props) {
        super(props);
        const {valueFormat, value, setValue, field} = props;
        let mValue = value ? moment(value, valueFormat) : null;
        if (mValue && !mValue.isValid()) {
            setValue(null);
        }
        let arr = field.split('.');

    }

    static defaultProps = {
        dateFormat: 'YYYY-MM-DD',
        valueFormat: 'YYYY-MM-DD',
    };

    handleChange = (_value) => {

        const {setValue, valueFormat} = this.props;
        if (Array.isArray(_value)) {
            setValue([_value[0].format(valueFormat), _value[1].format(valueFormat)], false);
        } else {
            const value = _value && _value.isValid() ? _value.format(valueFormat) : undefined;
            if (value || _value === null)
                setValue(value, false, true);  // touched
        }

    };

    disabledDate = (current) => {
        // Can not select days before today and today
        const {restrictions} = this.props;
        if (restrictions === 'financial') {
            return current && (current > moment().endOf('day') || current < moment().subtract(3,'months'));
        }
        return current && current > moment().endOf('day');
    };

    render() {
        const {placeholder, placeholders, customProps, value, valueFormat, dateFormat, config, readonly, operator} = this.props;
        const {renderSize} = config.settings;
        let dateValue;
        if (value && Array.isArray(value)) {
            dateValue = value.map(el => moment(el, valueFormat))
        } else if (value) {
            dateValue =  moment(value, valueFormat);
        } else {
            dateValue = null;
        }

        return (
            <>
                {operator === "date_range" || operator === "not_date_range" ? (
                    <RangePicker
                        disabled={readonly}
                        key="widget-date"
                        size={renderSize}
                        format={dateFormat}
                        value={dateValue}
                        onChange={this.handleChange}
                        disabledDate={this.disabledDate}
                        {...customProps}
                        placeholder={placeholders}
                    />
                ) : (
                    <DatePicker
                        disabled={readonly}
                        key="widget-date"
                        size={renderSize}
                        defaultValue={dateValue}
                        format={dateFormat}
                        value={dateValue}
                        onChange={this.handleChange}
                        disabledDate={this.disabledDate}
                        {...customProps}
                    />)}
            </>
        );
    }
}
