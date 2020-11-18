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

    constructor(props) {
        super(props);
        const {valueFormat, value, setValue, defaultPickerValue} = props;
        let mValue = value ? moment(value, valueFormat) : null;
        if (mValue && !mValue.isValid()) {
            setValue(null);
        }
        this.state = {
            defaultPickerValue: defaultPickerValue
        };
    }

    static defaultProps = {
        dateFormat: 'YYYY-MM-DD',
        valueFormat: 'YYYY-MM-DD',
    };

    handleChange = (_value) => {
        const {setValue, valueFormat, value} = this.props;
        if (Array.isArray(_value)) {
            setValue([_value[0].format(valueFormat), _value[1].format(valueFormat)], false);
        }
        else if (!Array.isArray(_value) && (Array.isArray(value))) {
            setValue([undefined, undefined], false);
        }
        else {
            const value = _value && _value.isValid() ? _value.format(valueFormat) : undefined;
            if (value || _value === null)
                setValue(value, false, true);  // touched
        }
    };

    // onOpenChange = (open) => {
    //     const {setValue, value} = this.props;
    //     console.log(open)
    //     if (value === undefined) {
    //         const date = moment(moment()
    //             .subtract(18, 'year')
    //             .format('YYYY-MM-DD'));
    //         let defaultPickerValue = date;
    //         setValue(date, false, true);
    //         // this.setState({defaultPickerValue: defaultPickerValue});
    //
    //     }
    // };


    render() {
        const {placeholder, placeholders, customProps, value, valueFormat, dateFormat, config, readonly, operator, restrictions, defaultPickerValue} = this.props;
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
                        onChange={this.handleChange}
                        disabledDate={restrictions}
                        value={dateValue}
                        defaultPickerValue={[this.state.defaultPickerValue, this.state.defaultPickerValue]}
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
                        disabledDate={restrictions}
                        defaultPickerValue={this.state.defaultPickerValue}
                        {...customProps}
                    />)}
            </>
        );
    }
}
