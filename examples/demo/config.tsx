import React, {Component} from 'react';
import merge from 'lodash/merge';
import {
    BasicConfig,
    // types:
    Operators, Widgets, Fields, Config, Types, Conjunctions, Settings, LocaleSettings, OperatorProximity, Funcs,
} from 'react-awesome-query-builder';
import moment from 'moment';
import AntdConfig from 'react-awesome-query-builder/config/antd';
import AntdWidgets from 'react-awesome-query-builder/components/widgets/antd';
const {
    FieldSelect,
    FieldDropdown,
    FieldCascader,
    FieldTreeSelect,
} = AntdWidgets;

export default (skin) => {
    const InitialConfig = skin == "vanilla" ? BasicConfig : AntdConfig;

    const conjunctions: Conjunctions = {
        ...InitialConfig.conjunctions,
    };

    const proximity: OperatorProximity = {
        ...InitialConfig.operators.proximity,
        valueLabels: [
            { label: 'Word 1', placeholder: 'Enter first word' },
            { label: 'Word 2', placeholder: 'Enter second word' },
        ],
        textSeparators: [
            //'Word 1',
            //'Word 2'
        ],
        options: {
            ...InitialConfig.operators.proximity.options,
            optionLabel: "Near", // label on top of "near" selectbox (for config.settings.showLabels==true)
            optionTextBefore: "Near", // label before "near" selectbox (for config.settings.showLabels==false)
            optionPlaceholder: "Select words between", // placeholder for "near" selectbox
            minProximity: 2,
            maxProximity: 10,
            defaults: {
                proximity: 2
            },
            customProps: {}
        }
    };

    const operators: Operators = {
        ...InitialConfig.operators,
        // examples of  overriding
        between: {
            ...InitialConfig.operators.between,
            valueLabels: [
                'Value from',
                'Value to'
            ],
            textSeparators: [
                'from',
                'to'
            ],
        },
        date_range: {
            ...InitialConfig.operators.between,
            label: 'Between',
            labelForFormat: 'BETWEEN',
            sqlOp: 'BETWEEN',
            cardinality: 2,
            isSpecialRange: true,
            formatOp: (field, op, values, valueSrcs, valueTypes, opDef, operatorOptions, isForDisplay) => {
                let valFrom = values[0];
                let valTo = values[1];
                if (isForDisplay)
                    return `${field} >= ${valFrom} AND ${field} <= ${valTo}`;
                else
                    return `${field} >= ${valFrom} && ${field} <= ${valTo}`;
            },
            reversedOp: 'not_date_range',
            jsonLogic: "between",
        },
        not_date_range: {
            ...InitialConfig.operators.not_between,
            label: 'Not between',
            labelForFormat: 'NOT BETWEEN',
            sqlOp: 'NOT_BETWEEN',
            cardinality: 2,
            isSpecialRange: true,
            formatOp: (field, op, values, valueSrcs, valueTypes, opDef, operatorOptions, isForDisplay) => {
                let valFrom = values[0];
                let valTo = values[1];
                if (isForDisplay)
                    return `${field} >= ${valFrom} AND ${field} <= ${valTo}`;
                else
                    return `${field} >= ${valFrom} && ${field} <= ${valTo}`;
            },
            reversedOp: 'date_range',
            jsonLogic: "not_between",
        },
    };


    const widgets: Widgets = {
        ...InitialConfig.widgets,
        // examples of  overriding
        text: {
            ...InitialConfig.widgets.text,
            validateValue: (val, fieldDef) => {
                return (val.length < 10);
            },
        },
        slider: {
            ...InitialConfig.widgets.slider,
            customProps: {
                width: '300px'
            }
        },
        rangeslider: {
            ...InitialConfig.widgets.rangeslider,
            customProps: {
                width: '300px'
            },
        },
        date: {
            ...InitialConfig.widgets.date,
            dateFormat: 'DD.MM.YYYY',
            valueFormat: 'YYYY-MM-DD',
        },
        time: {
            ...InitialConfig.widgets.time,
            timeFormat: 'HH:mm',
            valueFormat: 'HH:mm:ss',
        },
        datetime: {
            ...InitialConfig.widgets.datetime,
            timeFormat: 'HH:mm',
            dateFormat: 'DD.MM.YYYY',
            valueFormat: 'YYYY-MM-DD HH:mm:ss',
        },
        func: {
            ...InitialConfig.widgets.func,
            customProps: {
                showSearch: true
            }
        },
        treeselect: {
            ...InitialConfig.widgets.treeselect,
            customProps: {
                showSearch: true
            }
        },
    };


    const types: Types = {
        ...InitialConfig.types,
        // examples of  overriding
        boolean: merge(InitialConfig.types.boolean, {
            widgets: {
                boolean: {
                    widgetProps: {
                        hideOperator: true,
                        operatorInlineLabel: "is"
                    },
                    opProps: {
                        equal: {
                            label: "is"
                        },
                        not_equal: {
                            label: "is not"
                        }
                    }
                },
            },
        }),
    };


    const localeSettings: LocaleSettings = {
        locale: {
            short: 'ru',
            full: 'ru-RU',
            //import en_US from 'antd/lib/locale-provider/en_US';
            //import ru_RU from 'antd/lib/locale-provider/ru_RU';
            //antd: ru_RU,
        },
        valueLabel: "Value",
        valuePlaceholder: "Value",
        fieldLabel: "Field",
        operatorLabel: "Operator",
        funcLabel: "Function",
        fieldPlaceholder: "Select field",
        funcPlaceholder: "Select function",
        operatorPlaceholder: "Select operator",
        deleteLabel: null,
        addGroupLabel: "Add group",
        addRuleLabel: "Add rule",
        delGroupLabel: null,
        notLabel: "Not",
        valueSourcesPopupTitle: "Select value source",
        removeRuleConfirmOptions: {
            title: 'Are you sure delete this rule?',
            okText: 'Yes',
            okType: 'danger',
        },
        removeGroupConfirmOptions: {
            title: 'Are you sure delete this group?',
            okText: 'Yes',
            okType: 'danger',
        },
    };

    const settings: Settings = {
        ...InitialConfig.settings,
        ...localeSettings,

        valueSourcesInfo: {
            value: {
                label: "Value"
            },
            field: {
                label: "Field",
                widget: "field",
            },
            func: {
                label: "Function",
                widget: "func",
            }
        },
        // canReorder: true,
        // canRegroup: true,
        // showNot: true,
        // showLabels: true,
        maxNesting: 3,
        canLeaveEmptyGroup: true, //after deletion
        showErrorMessage: true,
        // renderField: (props) => <FieldCascader {...props} />,
        // renderOperator: (props) => <FieldDropdown {...props} />,
        // renderFunc: (props) => <FieldSelect {...props} />,
        maxNumberOfRules: 10 // number of rules can be added to the query builder
    };

    //////////////////////////////////////////////////////////////////////
    const fields: Fields = {
        personal: {
            label: 'Personal',
            tooltip: 'Group of fields',
            type: '!struct',
            subfields: {
                gender: {
                    type: 'select',
                    label: 'Gender',
                    operators: ['select_equals', 'select_not_equals', 'select_any_in'],
                    valueSources: ['value'],
                    listValues: [
                        { value: '1', title: 'Male' },
                        { value: '0', title: 'Female' },
                            { value: '-1', title: 'Not Set' },
                    ],
                },
                socialNetwork: {
                    type: 'select',
                    label: 'Social Network',
                    operators: [
                        'select_equals',
                        'select_not_equals',
                        'select_any_in',
                        'select_not_any_in',
                    ],
                    valueSources: ['value'],
                    listValues: [
                        { value: '1', title: 'Male' },
                        { value: '0', title: 'Female' },
                        { value: '-1', title: 'Not Set' },
                        { value: '2', title: 'Prefer not to say' },
                    ],
                },
                timezone: {
                    type: 'select',
                    label: 'Timezone',
                    operators: [
                        'select_equals',
                        'select_not_equals',
                        'select_any_in',
                        'select_not_any_in',
                    ],
                    valueSources: ['value'],
                    listValues: [
                        { value: '1', title: 'Male' },
                        { value: '0', title: 'Female' },
                        { value: '-1', title: 'Not Set' },
                    ],
                },
                createdAt: {
                    label: 'Created At',
                    type: 'date',
                    valueSources: ['value'],
                    // defaultValue: moment()
                    //   .subtract(18, 'year')
                    //   .format('YYYY-MM-DD'),
                    operators: [
                        'greater',
                        'greater_or_equal',
                        'less',
                        'less_or_equal',
                        'equal',
                        'not_equal',
                    ],
                },
                lastVisitCountry: {
                    label: 'Last Visit Country',
                    type: 'select',
                    operators: [
                        'select_equals',
                        'select_not_equals',
                        'select_any_in',
                        'select_not_any_in',
                    ],
                    valueSources: ['value'],
                    listValues: [
                        { value: '1', title: 'Male' },
                        { value: '0', title: 'Female' },
                        { value: '-1', title: 'Not Set' },
                    ],
                },
                lastVisitCity: {
                    type: 'text',
                    label: 'Last visit city',
                    valueSources: ['value'],
                    operators: ['equal', 'not_equal', 'contains'],
                    mainWidgetProps: {
                        valueLabel: 'City',
                        validateValue: (val, fieldDef, flag) => {
                            if (!val && flag) {
                                return "No value entered"
                            } else if (val) {
                                const regex =  /^[a-zA-Z ]*$/;
                                // const validRegex = regex.test(val);
                                const validLength = val.length >= 2 && val.length <= 10;
                                // const valid = validLength  && validRegex;
                                // let errorMessage;
                                // if (!validLength) {
                                //     errorMessage = "City length should be not les than 2 symbols and not more than 255 symbols"
                                // } else if (!validRegex) {
                                //     errorMessage = "City name can cota"
                                // }


                                // if (!validLength) {
                                //     return "City name length should be not les than 2 symbols and not more than 255 symbols";
                                // }

                                return validLength ? null : "City name length should be not les than 2 symbols and not more than 255 symbols";
                            }

                        },
                    },
                },
                status: {
                    type: 'select',
                    label: 'Status',
                    operators: [
                        'select_equals',
                        'select_not_equals',
                        'select_any_in',
                        'select_not_any_in',
                    ],
                    valueSources: ['value'],
                    listValues: [
                        { value: '1', title: 'Male' },
                        { value: '0', title: 'Female' },
                        { value: '-1', title: 'Not Set' },
                    ],
                },
                isVerified: {
                    type: 'boolean',
                    operators: ['equal', 'not_equal'],
                },
                birthdate: {
                    label: 'Birth Date',
                    type: 'date',
                    valueSources: ['value'],
                    defaultValue: moment()
                        .subtract(18, 'year')
                        .format('YYYY-MM-DD'),
                    operators: [
                        'greater',
                        'greater_or_equal',
                        'less',
                        'less_or_equal',
                        'equal',
                        'not_equal',
                        'date_range',
                    ],
                    fieldSettings: {
                        dateFormat: 'DD-MM-YYYY',
                    }
                },
            },
        },
        address: {
            label: 'Address',
            tooltip: 'Group of fields',
            type: '!struct',
            subfields: {
                country: {
                    label: 'Country',
                    type: 'select',
                    operators: [
                        'select_equals',
                        'select_not_equals',
                        'select_any_in',
                        'select_not_any_in',
                    ],
                    valueSources: ['value'],
                    listValues: [
                        { value: '1', title: 'Male' },
                        { value: '0', title: 'Female' },
                        { value: '-1', title: 'Not Set' },
                    ],
                },
                city: {
                    type: 'text',
                    label: 'City',
                    valueSources: ['value'],
                    operators: ['equal', 'not_equal', 'contains', 'not_contains'],
                },
            },
        },
        technical: {
            label: 'Technical information',
            tooltip: 'Group of fields',
            type: '!struct',
            subfields: {
                nodeId: {
                    type: 'number',
                    label: '\u2605 Hall',
                    valueSources: ['value'],
                    operators: ['equal', 'not_equal', 'in', 'not_in'],
                },
                registeredAt: {
                    label: 'Registration Date',
                    type: 'date',
                    valueSources: ['value'],
                    defaultValue: moment().format('YYYY-MM-DD'),
                    operators: [
                        'greater',
                        'greater_or_equal',
                        'less',
                        'less_or_equal',
                        'equal',
                        'not_equal',
                    ],
                },
                registrationIp: {
                    type: 'text',
                    label: 'Registration IP',
                    valueSources: ['value'],
                    operators: ['equal', 'not_equal', 'contains'],
                    mainWidgetProps: {
                        valueLabel: 'Registration IP',
                        mask: [/[1-2]/, /[0-9]/, /[0-9]/, '.', /[1-2]/, /[0-9]/, /[0-9]/, '.', /[1-2]/, /[0-9]/, /[0-9]/, '.', /[1-2]/, /[0-9]/, /[0-9]/],
                        validateValue: (val, fieldDef, flag) => {
                            if (flag) {
                                const regex =  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/

                                const replaced = val.replace(/[_]+/g, '');
                                const validRegex = regex.test(replaced);

                                return validRegex ? null : "You have entered an invalid IP address";
                            } else {
                                return true;
                            }
                        },
                    },
                },
                lastVisitAt: {
                    label: 'Last visit',
                    type: 'date',
                    valueSources: ['value'],
                    defaultValue: moment().format('YYYY-MM-DD'),
                    operators: [
                        'greater',
                        'greater_or_equal',
                        'less',
                        'less_or_equal',
                        'equal',
                        'not_equal',
                    ],
                },
                lastLoginIp: {
                    type: 'text',
                    label: 'Last visit IP',
                    valueSources: ['value'],
                    operators: ['equal', 'not_equal', 'contains'],
                    mainWidgetProps: {
                        valueLabel: 'Registration IP',
                        mask: [/[1-2]/, /[0-9]/, /[0-9]/, '.', /[1-2]/, /[0-9]/, /[0-9]/, '.', /[1-2]/, /[0-9]/, /[0-9]/, '.', /[1-2]/, /[0-9]/, /[0-9]/],
                        validateValue: (val, fieldDef, flag) => {
                            if (flag) {
                                const regex =  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/

                                const replaced = val.replace(/[_]+/g, '');
                                const validRegex = regex.test(replaced);

                                return validRegex ? null : "You have entered an invalid IP address";
                            } else {
                                return true;
                            }

                        },
                    },
                },
                confirmationEmailStatus: {
                    type: 'select',
                    label: 'Confirmation Email Status',
                    operators: ['select_equals'],
                    valueSources: ['value'],
                    listValues: [
                        { value: '1', title: '\u0410\u043a\u0442\u0438\u0432\u0435\u043d' },
                        {
                            value: '0',
                            title: '\u041d\u0435 \u0430\u043a\u0442\u0438\u0432\u0435\u043d',
                        },
                        {
                            value: '-1',
                            title: '\u0417\u0430\u0431\u0430\u043d\u0435\u043d',
                        },
                    ],
                },
                confirmationPhoneStatus: {
                    type: 'select',
                    label: 'Confirmation Phone Status',
                    operators: ['select_equals', 'select_not_equals'],
                    valueSources: ['value'],
                    listValues: [
                        { value: '1', title: '\u0410\u043a\u0442\u0438\u0432\u0435\u043d' },
                        {
                            value: '0',
                            title: '\u041d\u0435 \u0430\u043a\u0442\u0438\u0432\u0435\u043d',
                        },
                        {
                            value: '-1',
                            title: '\u0417\u0430\u0431\u0430\u043d\u0435\u043d',
                        },
                    ],
                },
                phoneNumberPrefix: {
                    type: 'select',
                    label: 'Phone Number Prefix',
                    operators: [
                        'select_equals',
                        'select_not_equals',
                        'select_any_in',
                        'select_not_any_in',
                    ],
                    valueSources: ['value'],
                    listValues: [
                        { value: '1', title: '\u0410\u043a\u0442\u0438\u0432\u0435\u043d' },
                        {
                            value: '0',
                            title: '\u041d\u0435 \u0430\u043a\u0442\u0438\u0432\u0435\u043d',
                        },
                        {
                            value: '-1',
                            title: '\u0417\u0430\u0431\u0430\u043d\u0435\u043d',
                        },
                    ],
                },
                registrationFormName: {
                    type: 'text',
                    label: 'Registration Form Name',
                    valueSources: ['value'],
                    operators: ['equal', 'not_equal'],
                },
                countryOfRegistration: {
                    label: 'Country Of Registration',
                    type: 'select',
                    operators: [
                        'select_equals',
                        'select_not_equals',
                        'select_any_in',
                        'select_not_any_in',
                    ],
                    valueSources: ['value'],
                    listValues: [
                        { value: '1', title: 'Male' },
                        { value: '0', title: 'Female' },
                        { value: '-1', title: 'Not Set' },
                    ],
                },
            },
        },
        financial: {
            label: 'Financial statistics',
            tooltip: 'Group of fields',
            type: '!struct',
            subfields: {
                depositsAmount: {
                    label: 'Deposits Amount',
                    type: '!group',
                    subfields: {
                        value: {
                            label: 'Amount',
                            type: 'number',
                            valueSources: ['value'],
                            operators: [
                                'greater',
                                'greater_or_equal',
                                'less',
                                'less_or_equal',
                                'equal',
                                'not_equal',
                                'between',
                            ],
                        },
                        currency: {
                            label: 'Currency',
                            type: 'select',
                            valueSources: ['value'],
                            operators: ['select_equals'],
                            listValues: [
                                {value: '1', title: 'Male'},
                                {value: '0', title: 'Female'},
                                {value: '-1', title: 'Not Set'},
                            ],
                        },
                        period: {
                            label: 'Period',
                            type: 'select',
                            valueSources: ['value'],
                            operators: ['select_equals'],
                            listValues: [
                                {value: 'all_time', title: 'All time'},
                                {value: 'last_month', title: 'Last month'},
                                {value: 'current_month', title: 'Current month'},
                                {value: 'since_last_deposit', title: 'Since last deposit'},
                                {
                                    value: 'since_last_withdrawal',
                                    title: 'Since last withdrawal',
                                },
                            ],
                        },
                        paymentSystem: {
                            label: 'Payment System',
                            type: 'select',
                            valueSources: ['value'],
                            operators: ['select_equals'],
                            listValues: [
                                {value: '1', title: 'Male'},
                                {value: '0', title: 'Female'},
                                {value: '-1', title: 'Not Set'},
                            ],
                        },
                        paymentMethod: {
                            label: 'Payment Method',
                            type: 'select',
                            valueSources: ['value'],
                            operators: ['select_equals'],
                            listValues: [
                                {value: '1', title: 'Male'},
                                {value: '0', title: 'Female'},
                                {value: '-1', title: 'Not Set'},
                            ],
                        },
                        range: {
                            label: 'Period Range',
                            type: 'date',
                            valueSources: ['value'],
                            operators: ['between'],
                        },
                    },
                },
                depositsCount: {
                    label: 'Deposit count',
                    type: '!group',
                    subfields: {
                        value: {
                            label: 'Amount',
                            type: 'number',
                            valueSources: ['value'],
                            operators: [
                                'greater',
                                'greater_or_equal',
                                'less',
                                'less_or_equal',
                                'equal',
                                'not_equal',
                            ],
                        },
                        currency: {
                            label: 'Currency',
                            type: 'select',
                            valueSources: ['value'],
                            operators: ['select_equals'],
                            listValues: [
                                {value: '1', title: 'Male'},
                                {value: '0', title: 'Female'},
                                {value: '-1', title: 'Not Set'},
                            ],
                        },
                        paymentSystem: {
                            label: 'Payment System',
                            type: 'select',
                            valueSources: ['value'],
                            operators: ['select_equals'],
                            listValues: [
                                {value: '1', title: 'Male'},
                                {value: '0', title: 'Female'},
                                {value: '-1', title: 'Not Set'},
                            ],
                        },
                        paymentMethod: {
                            label: 'Payment Method',
                            type: 'select',
                            valueSources: ['value'],
                            operators: ['select_equals'],
                            listValues: [
                                {value: '1', title: 'Male'},
                                {value: '0', title: 'Female'},
                                {value: '-1', title: 'Not Set'},
                            ],
                        },
                        range: {
                            label: 'Period Range',
                            type: 'date',
                            valueSources: ['value'],
                            operators: ['between'],
                        },
                    },
                },
                depositsAvg: {
                    label: 'Average deposit',
                    type: '!group',
                    subfields: {
                        value: {
                            label: 'Amount',
                            type: 'number',
                            valueSources: ['value'],
                            operators: [
                                'greater',
                                'greater_or_equal',
                                'less',
                                'less_or_equal',
                                'equal',
                                'not_equal',
                                'between',
                            ],
                        },
                        currency: {
                            label: 'Currency',
                            type: 'select',
                            valueSources: ['value'],
                            operators: ['select_equals'],
                            listValues: [
                                {value: '1', title: 'Male'},
                                {value: '0', title: 'Female'},
                                {value: '-1', title: 'Not Set'},
                            ],
                        },
                        period: {
                            label: 'Period',
                            type: 'select',
                            valueSources: ['value'],
                            operators: ['select_equals'],
                            listValues: [
                                {value: 'all_time', title: 'All time'},
                                {value: 'last_month', title: 'Last month'},
                                {value: 'current_month', title: 'Current month'},
                                {value: 'since_last_deposit', title: 'Since last deposit'},
                                {
                                    value: 'since_last_withdrawal',
                                    title: 'Since last withdrawal',
                                },
                            ],
                        },
                        paymentSystem: {
                            label: 'Payment System',
                            type: 'select',
                            valueSources: ['value'],
                            operators: ['select_equals'],
                            listValues: [
                                {value: '1', title: 'Male'},
                                {value: '0', title: 'Female'},
                                {value: '-1', title: 'Not Set'},
                            ],
                        },
                        paymentMethod: {
                            label: 'Payment Method',
                            type: 'select',
                            valueSources: ['value'],
                            operators: ['select_equals'],
                            listValues: [
                                {value: '1', title: 'Male'},
                                {value: '0', title: 'Female'},
                                {value: '-1', title: 'Not Set'},
                            ],
                        },
                        range: {
                            label: 'Period Range',
                            type: 'date',
                            valueSources: ['value'],
                            operators: ['between'],
                        },
                    },
                },
                firstDepositAmount: {
                    label: 'First deposit amount',
                    type: '!group',
                    subfields: {
                        value: {
                            label: 'Amount',
                            type: 'number',
                            // fieldSettings: {
                            //   min: 0,
                            //   max: 100,
                            //   step:10
                            // },
                            valueSources: ['value'],
                            operators: [
                                'greater',
                                'greater_or_equal',
                                'less',
                                'less_or_equal',
                                'equal',
                                'not_equal',
                                'between',
                            ],
                        },
                        currency: {
                            label: 'Currency',
                            type: 'select',
                            valueSources: ['value'],
                            operators: ['select_equals'],
                            listValues: [
                                {value: '1', title: 'Male'},
                                {value: '0', title: 'Female'},
                                {value: '-1', title: 'Not Set'},
                            ],
                        },
                        period: {
                            label: 'Period',
                            type: 'select',
                            valueSources: ['value'],
                            listValues: [
                                {value: 'all_time', title: 'All time'},
                                {value: 'last_month', title: 'Last month'},
                                {value: 'current_month', title: 'Current month'},
                                {value: 'since_last_deposit', title: 'Since last deposit'},
                                {
                                    value: 'since_last_withdrawal',
                                    title: 'Since last withdrawal',
                                },
                            ],
                        },
                        range: {
                            label: 'Period Range',
                            type: 'date',
                            valueSources: ['value'],
                            operators: ['between'],
                        },
                    },
                },
                firstDepositDate: {
                    label: 'First deposit date',
                    type: '!group',
                    subfields: {
                        value: {
                            label: 'Date',
                            type: 'date',
                            valueSources: ['value'],
                            operators: [
                                'greater',
                                'greater_or_equal',
                                'less',
                                'less_or_equal',
                                'equal',
                                'not_equal',
                                'between',
                            ],
                        },
                        currency: {
                            label: 'Currency',
                            type: 'select',
                            valueSources: ['value'],
                            operators: ['select_equals'],
                            listValues: [
                                {value: '1', title: 'Male'},
                                {value: '0', title: 'Female'},
                                {value: '-1', title: 'Not Set'},
                            ],
                        },
                    },
                },
                lastDepositDate: {
                    label: 'Last deposit date',
                    type: '!group',
                    subfields: {
                        value: {
                            label: 'Date',
                            type: 'date',
                            valueSources: ['value'],
                            operators: [
                                'greater',
                                'greater_or_equal',
                                'less',
                                'less_or_equal',
                                'equal',
                                'not_equal',
                                'between',
                            ],
                        },
                        currency: {
                            label: 'Currency',
                            type: 'select',
                            valueSources: ['value'],
                            operators: ['select_equals'],
                            listValues: [
                                {value: '1', title: 'Male'},
                                {value: '0', title: 'Female'},
                                {value: '-1', title: 'Not Set'},
                            ],
                        },
                    },
                },
                firstDepositPaymentMethod: {
                    label: 'First deposit payment Method',
                    type: '!group',
                    subfields: {
                        value: {
                            label: 'Payment method',
                            type: 'select',
                            valueSources: ['value'],
                            operators: [
                                'select_equals',
                                'select_not_equals',
                                'select_any_in',
                                'select_not_any_in',
                            ],
                            listValues: [
                                {value: '1', title: 'Male'},
                                {value: '0', title: 'Female'},
                                {value: '-1', title: 'Not Set'},
                            ],
                        },
                        currency: {
                            label: 'Currency',
                            type: 'select',
                            operators: ['select_equals'],
                            valueSources: ['value'],
                            listValues: [
                                {value: '1', title: 'Male'},
                                {value: '0', title: 'Female'},
                                {value: '-1', title: 'Not Set'},
                            ],
                        },
                        period: {
                            label: 'Period',
                            type: 'select',
                            valueSources: ['value'],
                            listValues: [
                                {value: 'all_time', title: 'All time'},
                                {value: 'last_month', title: 'Last month'},
                                {value: 'current_month', title: 'Current month'},
                                {value: 'since_last_deposit', title: 'Since last deposit'},
                                {
                                    value: 'since_last_withdrawal',
                                    title: 'Since last withdrawal',
                                },
                            ],
                        },
                        range: {
                            label: 'Period Range',
                            type: 'date',
                            valueSources: ['value'],
                            operators: ['between'],
                        },
                    },
                },
                lastDepositPaymentMethod: {
                    label: 'Last deposit payment Method',
                    type: '!group',
                    subfields: {
                        value: {
                            label: 'Payment method',
                            type: 'select',
                            valueSources: ['value'],
                            listValues: [
                                {value: '1', title: 'Male'},
                                {value: '0', title: 'Female'},
                                {value: '-1', title: 'Not Set'},
                            ],
                            operators: [
                                'select_equals',
                                'select_not_equals',
                                'select_any_in',
                                'select_not_any_in',
                            ],
                        },
                        currency: {
                            label: 'Currency',
                            type: 'select',
                            valueSources: ['value'],
                            operators: ['select_equals'],
                            listValues: [
                                {value: '1', title: 'Male'},
                                {value: '0', title: 'Female'},
                                {value: '-1', title: 'Not Set'},
                            ],
                        },
                        period: {
                            label: 'Period',
                            type: 'select',
                            valueSources: ['value'],
                            listValues: [
                                {value: 'all_time', title: 'All time'},
                                {value: 'last_month', title: 'Last month'},
                                {value: 'current_month', title: 'Current month'},
                                {value: 'since_last_deposit', title: 'Since last deposit'},
                                {
                                    value: 'since_last_withdrawal',
                                    title: 'Since last withdrawal',
                                },
                            ],
                        },
                        range: {
                            label: 'Period Range',
                            type: 'date',
                            valueSources: ['value'],
                            operators: ['between'],
                        },
                    },
                },
                firstDepositPaymentSystem: {
                    label: 'First deposit payment system',
                    type: '!group',
                    subfields: {
                        value: {
                            label: 'Payment System',
                            type: 'select',
                            valueSources: ['value'],
                            listValues: [
                                {value: '1', title: 'Male'},
                                {value: '0', title: 'Female'},
                                {value: '-1', title: 'Not Set'},
                            ],
                            operators: [
                                'select_equals',
                                'select_not_equals',
                                'select_any_in',
                                'select_not_any_in',
                            ],
                        },
                        currency: {
                            label: 'Currency',
                            type: 'select',
                            valueSources: ['value'],
                            operators: ['select_equals'],
                            listValues: [
                                {value: '1', title: 'Male'},
                                {value: '0', title: 'Female'},
                                {value: '-1', title: 'Not Set'},
                            ],
                        },
                        period: {
                            label: 'Period',
                            type: 'select',
                            valueSources: ['value'],
                            listValues: [
                                {value: 'all_time', title: 'All time'},
                                {value: 'last_month', title: 'Last month'},
                                {value: 'current_month', title: 'Current month'},
                                {value: 'since_last_deposit', title: 'Since last deposit'},
                                {
                                    value: 'since_last_withdrawal',
                                    title: 'Since last withdrawal',
                                },
                            ],
                        },
                        range: {
                            label: 'Period Range',
                            type: 'date',
                            valueSources: ['value'],
                            operators: ['between'],
                        },
                    },
                },
                lastDepositPaymentSystem: {
                    label: 'Last deposit payment system',
                    type: '!group',
                    subfields: {
                        value: {
                            label: 'Payment System',
                            type: 'select',
                            valueSources: ['value'],
                            listValues: [
                                {value: '1', title: 'Male'},
                                {value: '0', title: 'Female'},
                                {value: '-1', title: 'Not Set'},
                            ],
                            operators: [
                                'select_equals',
                                'select_not_equals',
                                'select_any_in',
                                'select_not_any_in',
                            ],
                        },
                        currency: {
                            label: 'Currency',
                            type: 'select',
                            valueSources: ['value'],
                            operators: ['select_equals'],
                            listValues: [
                                {value: '1', title: 'Male'},
                                {value: '0', title: 'Female'},
                                {value: '-1', title: 'Not Set'},
                            ],
                        },
                        period: {
                            label: 'Period',
                            type: 'select',
                            valueSources: ['value'],
                            listValues: [
                                {value: 'all_time', title: 'All time'},
                                {value: 'last_month', title: 'Last month'},
                                {value: 'current_month', title: 'Current month'},
                                {value: 'since_last_deposit', title: 'Since last deposit'},
                                {
                                    value: 'since_last_withdrawal',
                                    title: 'Since last withdrawal',
                                },
                            ],
                        },
                        range: {
                            label: 'Period Range',
                            type: 'date',
                            valueSources: ['value'],
                            operators: ['between'],
                        },
                    },
                },
                lastDepositAmount: {
                    label: 'Last deposit amount',
                    type: '!group',
                    subfields: {
                        value: {
                            label: 'Amount',
                            type: 'number',
                            valueSources: ['value'],
                            operators: [
                                'greater',
                                'greater_or_equal',
                                'less',
                                'less_or_equal',
                                'equal',
                                'not_equal',
                                'between',
                            ],
                        },
                        currency: {
                            label: 'Currency',
                            type: 'select',
                            valueSources: ['value'],
                            operators: ['select_equals'],
                            listValues: [
                                {value: '1', title: 'Male'},
                                {value: '0', title: 'Female'},
                                {value: '-1', title: 'Not Set'},
                            ],
                        },
                        period: {
                            label: 'Period',
                            type: 'select',
                            valueSources: ['value'],
                            listValues: [
                                {value: 'all_time', title: 'All time'},
                                {value: 'last_month', title: 'Last month'},
                                {value: 'current_month', title: 'Current month'},
                                {value: 'since_last_deposit', title: 'Since last deposit'},
                                {
                                    value: 'since_last_withdrawal',
                                    title: 'Since last withdrawal',
                                },
                            ],
                        },
                        range: {
                            label: 'Period Range',
                            type: 'date',
                            valueSources: ['value'],
                            operators: ['between'],
                        },
                    },
                },
                withdrawalsAmount: {
                    label: 'Withdrawal sum',
                    type: '!group',
                    subfields: {
                        value: {
                            label: 'Amount',
                            type: 'number',
                            valueSources: ['value'],
                            operators: [
                                'greater',
                                'greater_or_equal',
                                'less',
                                'less_or_equal',
                                'equal',
                                'not_equal',
                                'between',
                            ],
                        },
                        currency: {
                            label: 'Currency',
                            type: 'select',
                            valueSources: ['value'],
                            operators: ['select_equals'],
                            listValues: [
                                {value: '1', title: 'Male'},
                                {value: '0', title: 'Female'},
                                {value: '-1', title: 'Not Set'},
                            ],
                        },
                        period: {
                            label: 'Period',
                            type: 'select',
                            valueSources: ['value'],
                            operators: ['select_equals'],
                            listValues: [
                                {value: 'all_time', title: 'All time'},
                                {value: 'last_month', title: 'Last month'},
                                {value: 'current_month', title: 'Current month'},
                                {value: 'since_last_deposit', title: 'Since last deposit'},
                                {
                                    value: 'since_last_withdrawal',
                                    title: 'Since last withdrawal',
                                },
                            ],
                        },
                        paymentSystem: {
                            label: 'Payment System',
                            type: 'select',
                            valueSources: ['value'],
                            operators: ['select_equals'],
                            listValues: [
                                {value: '1', title: 'Male'},
                                {value: '0', title: 'Female'},
                                {value: '-1', title: 'Not Set'},
                            ],
                        },
                        paymentMethod: {
                            label: 'Payment Method',
                            type: 'select',
                            valueSources: ['value'],
                            operators: ['select_equals'],
                            listValues: [
                                {value: '1', title: 'Male'},
                                {value: '0', title: 'Female'},
                                {value: '-1', title: 'Not Set'},
                            ],
                        },
                        withdrawalStatus: {
                            label: 'Withdrawal Status',
                            type: 'select',
                            valueSources: ['value'],
                            operators: ['select_equals'],
                            listValues: [
                                {value: '1', title: 'Male'},
                                {value: '0', title: 'Female'},
                                {value: '-1', title: 'Not Set'},
                            ],
                        },
                        range: {
                            label: 'Period Range',
                            type: 'date',
                            valueSources: ['value'],
                            operators: ['between'],
                        },
                    },
                },
                firstWithdrawalAmount: {
                    label: 'First withdrawal amount',
                    type: '!group',
                    subfields: {
                        value: {
                            label: 'Amount',
                            type: 'number',
                            valueSources: ['value'],
                            operators: [
                                'greater',
                                'greater_or_equal',
                                'less',
                                'less_or_equal',
                                'equal',
                                'not_equal',
                                'between',
                            ],
                        },
                        currency: {
                            label: 'Currency',
                            type: 'select',
                            valueSources: ['value'],
                            operators: ['select_equals'],
                            listValues: [
                                {value: '1', title: 'Male'},
                                {value: '0', title: 'Female'},
                                {value: '-1', title: 'Not Set'},
                            ],
                        },
                        period: {
                            label: 'Period',
                            type: 'select',
                            valueSources: ['value'],
                            operators: ['select_equals'],
                            listValues: [
                                {value: 'all_time', title: 'All time'},
                                {value: 'last_month', title: 'Last month'},
                                {value: 'current_month', title: 'Current month'},
                                {value: 'since_last_deposit', title: 'Since last deposit'},
                                {
                                    value: 'since_last_withdrawal',
                                    title: 'Since last withdrawal',
                                },
                            ],
                        },
                        range: {
                            label: 'Period Range',
                            type: 'date',
                            valueSources: ['value'],
                            operators: ['between'],
                        },
                    },
                },
                lastWithdrawalAmount: {
                    label: 'Last withdrawal amount',
                    type: '!group',
                    subfields: {
                        value: {
                            label: 'Amount',
                            type: 'number',
                            valueSources: ['value'],
                            operators: [
                                'greater',
                                'greater_or_equal',
                                'less',
                                'less_or_equal',
                                'equal',
                                'not_equal',
                                'between',
                            ],
                        },
                        currency: {
                            label: 'Currency',
                            type: 'select',
                            valueSources: ['value'],
                            operators: ['select_equals'],
                            listValues: [
                                {value: '1', title: 'Male'},
                                {value: '0', title: 'Female'},
                                {value: '-1', title: 'Not Set'},
                            ],
                        },
                        period: {
                            label: 'Period',
                            type: 'select',
                            valueSources: ['value'],
                            operators: ['select_equals'],
                            listValues: [
                                {value: 'all_time', title: 'All time'},
                                {value: 'last_month', title: 'Last month'},
                                {value: 'current_month', title: 'Current month'},
                                {value: 'since_last_deposit', title: 'Since last deposit'},
                                {
                                    value: 'since_last_withdrawal',
                                    title: 'Since last withdrawal',
                                },
                            ],
                        },
                        range: {
                            label: 'Period Range',
                            type: 'date',
                            valueSources: ['value'],
                            operators: ['between'],
                        },
                    },
                },
                firstWithdrawalDate: {
                    label: 'First withdrawal date',
                    type: '!group',
                    subfields: {
                        value: {
                            label: 'Date',
                            type: 'date',
                            valueSources: ['value'],
                            operators: [
                                'greater',
                                'greater_or_equal',
                                'less',
                                'less_or_equal',
                                'equal',
                                'not_equal',
                                'between',
                            ],
                        },
                        currency: {
                            label: 'Currency',
                            type: 'select',
                            valueSources: ['value'],
                            operators: ['select_equals'],
                            listValues: [
                                {value: '1', title: 'Male'},
                                {value: '0', title: 'Female'},
                                {value: '-1', title: 'Not Set'},
                            ],
                        },
                    },
                },
                lastWithdrawalDate: {
                    label: 'Last withdrawal date',
                    type: '!group',
                    subfields: {
                        value: {
                            label: 'Date',
                            type: 'date',
                            valueSources: ['value'],
                            operators: [
                                'greater',
                                'greater_or_equal',
                                'less',
                                'less_or_equal',
                                'equal',
                                'not_equal',
                                'between',
                            ],
                        },
                        currency: {
                            label: 'Currency',
                            type: 'select',
                            valueSources: ['value'],
                            operators: ['select_equals'],
                            listValues: [
                                {value: '1', title: 'Male'},
                                {value: '0', title: 'Female'},
                                {value: '-1', title: 'Not Set'},
                            ],
                        },
                    },
                },
                firstWithdrawalPaymentSystem: {
                    label: 'First withdrawal payment system',
                    type: '!group',
                    subfields: {
                        value: {
                            label: 'Payment System',
                            type: 'select',
                            operators: [
                                'select_equals',
                                'select_not_equals',
                                'select_any_in',
                                'select_not_any_in',
                            ],
                            valueSources: ['value'],
                            listValues: [
                                {value: '1', title: 'Male'},
                                {value: '0', title: 'Female'},
                                {value: '-1', title: 'Not Set'},
                            ],
                        },
                        currency: {
                            label: 'Currency',
                            type: 'select',
                            valueSources: ['value'],
                            operators: ['select_equals'],
                            listValues: [
                                {value: '1', title: 'Male'},
                                {value: '0', title: 'Female'},
                                {value: '-1', title: 'Not Set'},
                            ],
                        },
                        period: {
                            label: 'Period',
                            type: 'select',
                            valueSources: ['value'],
                            operators: ['select_equals'],
                            listValues: [
                                {value: 'all_time', title: 'All time'},
                                {value: 'last_month', title: 'Last month'},
                                {value: 'current_month', title: 'Current month'},
                                {value: 'since_last_deposit', title: 'Since last deposit'},
                                {
                                    value: 'since_last_withdrawal',
                                    title: 'Since last withdrawal',
                                },
                            ],
                        },
                        range: {
                            label: 'Period Range',
                            type: 'date',
                            valueSources: ['value'],
                            operators: ['between'],
                        },
                    },
                },
                lastWithdrawalPaymentSystem: {
                    label: 'Last withdrawal payment system',
                    type: '!group',
                    subfields: {
                        value: {
                            label: 'Payment System',
                            type: 'select',
                            valueSources: ['value'],
                            operators: [
                                'select_equals',
                                'select_not_equals',
                                'select_any_in',
                                'select_not_any_in',
                            ],
                            listValues: [
                                {value: '1', title: 'Male'},
                                {value: '0', title: 'Female'},
                                {value: '-1', title: 'Not Set'},
                            ],
                        },
                        currency: {
                            label: 'Currency',
                            type: 'select',
                            valueSources: ['value'],
                            operators: ['select_equals'],
                            listValues: [
                                {value: '1', title: 'Male'},
                                {value: '0', title: 'Female'},
                                {value: '-1', title: 'Not Set'},
                            ],
                        },
                        period: {
                            label: 'Period',
                            type: 'select',
                            valueSources: ['value'],
                            operators: ['select_equals'],
                            listValues: [
                                {value: 'all_time', title: 'All time'},
                                {value: 'last_month', title: 'Last month'},
                                {value: 'current_month', title: 'Current month'},
                                {value: 'since_last_deposit', title: 'Since last deposit'},
                                {
                                    value: 'since_last_withdrawal',
                                    title: 'Since last withdrawal',
                                },
                            ],
                        },
                        range: {
                            label: 'Period Range',
                            type: 'date',
                            valueSources: ['value'],
                            operators: ['between'],
                        },
                    },
                },
                firstWithdrawalPaymentMethod: {
                    label: 'First withdrawal payment Method',
                    type: '!group',
                    subfields: {
                        value: {
                            label: 'Payment Method',
                            type: 'select',
                            valueSources: ['value'],
                            operators: [
                                'select_equals',
                                'select_not_equals',
                                'select_any_in',
                                'select_not_any_in',
                            ],
                            listValues: [
                                {value: '1', title: 'Male'},
                                {value: '0', title: 'Female'},
                                {value: '-1', title: 'Not Set'},
                            ],
                        },
                        currency: {
                            label: 'Currency',
                            type: 'select',
                            valueSources: ['value'],
                            operators: ['select_equals'],
                            listValues: [
                                {value: '1', title: 'Male'},
                                {value: '0', title: 'Female'},
                                {value: '-1', title: 'Not Set'},
                            ],
                        },
                        period: {
                            label: 'Period',
                            type: 'select',
                            valueSources: ['value'],
                            operators: ['select_equals'],
                            listValues: [
                                {value: 'all_time', title: 'All time'},
                                {value: 'last_month', title: 'Last month'},
                                {value: 'current_month', title: 'Current month'},
                                {value: 'since_last_deposit', title: 'Since last deposit'},
                                {
                                    value: 'since_last_withdrawal',
                                    title: 'Since last withdrawal',
                                },
                            ],
                        },
                        range: {
                            label: 'Period Range',
                            type: 'date',
                            valueSources: ['value'],
                            operators: ['between'],
                        },
                    },
                },
                lastWithdrawalPaymentMethod: {
                    label: 'Last withdrawal payment Method',
                    type: '!group',
                    subfields: {
                        value: {
                            label: 'Payment Method',
                            type: 'select',
                            valueSources: ['value'],
                            operators: [
                                'select_equals',
                                'select_not_equals',
                                'select_any_in',
                                'select_not_any_in',
                            ],
                            listValues: [
                                {value: '1', title: 'Male'},
                                {value: '0', title: 'Female'},
                                {value: '-1', title: 'Not Set'},
                            ],
                        },
                        currency: {
                            label: 'Currency',
                            type: 'select',
                            valueSources: ['value'],
                            operators: ['select_equals'],
                            listValues: [
                                {value: '1', title: 'Male'},
                                {value: '0', title: 'Female'},
                                {value: '-1', title: 'Not Set'},
                            ],
                        },
                        period: {
                            label: 'Period',
                            type: 'select',
                            valueSources: ['value'],
                            operators: ['select_equals'],
                            listValues: [
                                {value: 'all_time', title: 'All time'},
                                {value: 'last_month', title: 'Last month'},
                                {value: 'current_month', title: 'Current month'},
                                {value: 'since_last_deposit', title: 'Since last deposit'},
                                {
                                    value: 'since_last_withdrawal',
                                    title: 'Since last withdrawal',
                                },
                            ],
                        },
                        range: {
                            label: 'Period Range',
                            type: 'date',
                            valueSources: ['value'],
                            operators: ['between'],
                        },
                    },
                },
                withdrawalsCount: {
                    label: 'Withdrawal count',
                    type: '!group',
                    subfields: {
                        value: {
                            label: 'Amount',
                            type: 'number',
                            valueSources: ['value'],
                            operators: [
                                'greater',
                                'greater_or_equal',
                                'less',
                                'less_or_equal',
                                'equal',
                                'not_equal',
                                'between',
                            ],
                        },
                        currency: {
                            label: 'Currency',
                            type: 'select',
                            valueSources: ['value'],
                            operators: ['select_equals'],
                            listValues: [
                                {value: '1', title: 'Male'},
                                {value: '0', title: 'Female'},
                                {value: '-1', title: 'Not Set'},
                            ],
                        },
                        period: {
                            label: 'Period',
                            type: 'select',
                            valueSources: ['value'],
                            operators: ['select_equals'],
                            listValues: [
                                {value: 'all_time', title: 'All time'},
                                {value: 'last_month', title: 'Last month'},
                                {value: 'current_month', title: 'Current month'},
                                {value: 'since_last_deposit', title: 'Since last deposit'},
                                {
                                    value: 'since_last_withdrawal',
                                    title: 'Since last withdrawal',
                                },
                            ],
                        },
                        paymentSystem: {
                            label: 'Payment System',
                            type: 'select',
                            valueSources: ['value'],
                            operators: ['select_equals'],
                            listValues: [
                                {value: '1', title: 'Male'},
                                {value: '0', title: 'Female'},
                                {value: '-1', title: 'Not Set'},
                            ],
                        },
                        paymentMethod: {
                            label: 'Payment Method',
                            type: 'select',
                            valueSources: ['value'],
                            operators: ['select_equals'],
                            listValues: [
                                {value: '1', title: 'Male'},
                                {value: '0', title: 'Female'},
                                {value: '-1', title: 'Not Set'},
                            ],
                        },
                        withdrawalStatus: {
                            label: 'Withdrawal Status',
                            type: 'select',
                            valueSources: ['value'],
                            operators: ['select_equals'],
                            listValues: [
                                {value: '1', title: 'Male'},
                                {value: '0', title: 'Female'},
                                {value: '-1', title: 'Not Set'},
                            ],
                        },
                        range: {
                            label: 'Period Range',
                            type: 'date',
                            valueSources: ['value'],
                            operators: ['between'],
                        },
                    },
                },
                withdrawalsAvg: {
                    label: 'Withdrawal average',
                    type: '!group',
                    subfields: {
                        value: {
                            label: 'Amount',
                            type: 'number',
                            valueSources: ['value'],
                            operators: [
                                'greater',
                                'greater_or_equal',
                                'less',
                                'less_or_equal',
                                'equal',
                                'not_equal',
                                'between',
                            ],
                        },
                        currency: {
                            label: 'Currency',
                            type: 'select',
                            valueSources: ['value'],
                            operators: ['select_equals'],
                            listValues: [
                                {value: '1', title: 'Male'},
                                {value: '0', title: 'Female'},
                                {value: '-1', title: 'Not Set'},
                            ],
                        },
                        period: {
                            label: 'Period',
                            type: 'select',
                            valueSources: ['value'],
                            operators: ['select_equals'],
                            listValues: [
                                {value: 'all_time', title: 'All time'},
                                {value: 'last_month', title: 'Last month'},
                                {value: 'current_month', title: 'Current month'},
                                {value: 'since_last_deposit', title: 'Since last deposit'},
                                {
                                    value: 'since_last_withdrawal',
                                    title: 'Since last withdrawal',
                                },
                            ],
                        },
                        paymentSystem: {
                            label: 'Payment System',
                            type: 'select',
                            valueSources: ['value'],
                            operators: ['select_equals'],
                            listValues: [
                                {value: '1', title: 'Male'},
                                {value: '0', title: 'Female'},
                                {value: '-1', title: 'Not Set'},
                            ],
                        },
                        paymentMethod: {
                            label: 'Payment Method',
                            type: 'select',
                            valueSources: ['value'],
                            operators: ['select_equals'],
                            listValues: [
                                {value: '1', title: 'Male'},
                                {value: '0', title: 'Female'},
                                {value: '-1', title: 'Not Set'},
                            ],
                        },
                        withdrawalStatus: {
                            label: 'Withdrawal Status',
                            type: 'select',
                            valueSources: ['value'],
                            operators: ['select_equals'],
                            listValues: [
                                {value: '1', title: 'Male'},
                                {value: '0', title: 'Female'},
                                {value: '-1', title: 'Not Set'},
                            ],
                        },
                        range: {
                            label: 'Period Range',
                            type: 'date',
                            valueSources: ['value'],
                            operators: ['between'],
                        },
                    },
                },
                accountValue: {
                    label: 'Account value',
                    type: '!group',
                    subfields: {
                        value: {
                            label: 'Amount',
                            type: 'number',
                            valueSources: ['value'],
                            operators: [
                                'greater',
                                'greater_or_equal',
                                'less',
                                'less_or_equal',
                                'equal',
                                'not_equal',
                                'between',
                            ],
                        },
                        currency: {
                            label: 'Currency',
                            type: 'select',
                            valueSources: ['value'],
                            operators: ['select_equals'],
                            listValues: [
                                {value: '1', title: 'Male'},
                                {value: '0', title: 'Female'},
                                {value: '-1', title: 'Not Set'},
                            ],
                        },
                        period: {
                            label: 'Period',
                            type: 'select',
                            valueSources: ['value'],
                            operators: ['select_equals'],
                            listValues: [
                                {value: 'all_time', title: 'All time'},
                                {value: 'last_month', title: 'Last month'},
                                {value: 'current_month', title: 'Current month'},
                                {value: 'since_last_deposit', title: 'Since last deposit'},
                                {
                                    value: 'since_last_withdrawal',
                                    title: 'Since last withdrawal',
                                },
                            ],
                        },
                        range: {
                            label: 'Period Range',
                            type: 'date',
                            valueSources: ['value'],
                            operators: ['between'],
                        },
                    },
                },
                accountLifetimeValue: {
                    label: 'Account lifetime value',
                    type: '!group',
                    subfields: {
                        value: {
                            label: 'Amount',
                            type: 'number',
                            valueSources: ['value'],
                            operators: [
                                'greater',
                                'greater_or_equal',
                                'less',
                                'less_or_equal',
                                'equal',
                                'not_equal',
                                'between',
                            ],
                        },
                        currency: {
                            label: 'Currency',
                            type: 'select',
                            valueSources: ['value'],
                            operators: ['select_equals'],
                            listValues: [
                                {value: '1', title: 'Male'},
                                {value: '0', title: 'Female'},
                                {value: '-1', title: 'Not Set'},
                            ],
                        },
                        period: {
                            label: 'Period',
                            type: 'select',
                            valueSources: ['value'],
                            operators: ['select_equals'],
                            listValues: [
                                {value: 'all_time', title: 'All time'},
                                {value: 'last_month', title: 'Last month'},
                                {value: 'current_month', title: 'Current month'},
                                {value: 'since_last_deposit', title: 'Since last deposit'},
                                {
                                    value: 'since_last_withdrawal',
                                    title: 'Since last withdrawal',
                                },
                            ],
                        },
                        range: {
                            label: 'Period Range',
                            type: 'date',
                            valueSources: ['value'],
                            operators: ['between'],
                        },
                    },
                },

                revenue: {
                    label: 'Revenue',
                    type: '!group',
                    subfields: {
                        value: {
                            label: 'Amount',
                            type: 'number',
                            valueSources: ['value'],
                            operators: [
                                'greater',
                                'greater_or_equal',
                                'less',
                                'less_or_equal',
                                'equal',
                                'not_equal',
                                'between',
                            ],
                        },
                        currency: {
                            label: 'Currency',
                            type: 'select',
                            valueSources: ['value'],
                            operators: ['select_equals'],
                            listValues: [
                                {value: '1', title: 'Male'},
                                {value: '0', title: 'Female'},
                                {value: '-1', title: 'Not Set'},
                            ],
                        },
                        period: {
                            label: 'Period',
                            type: 'select',
                            valueSources: ['value'],
                            operators: ['select_equals'],
                            listValues: [
                                {value: 'all_time', title: 'All time'},
                                {value: 'last_month', title: 'Last month'},
                                {value: 'current_month', title: 'Current month'},
                                {value: 'since_last_deposit', title: 'Since last deposit'},
                                {
                                    value: 'since_last_withdrawal',
                                    title: 'Since last withdrawal',
                                },
                            ],
                        },
                        range: {
                            label: 'Period Range',
                            type: 'date',
                            valueSources: ['value'],
                            operators: ['between'],
                        },
                    },
                },
                hold: {
                    label: 'Hold',
                    type: '!group',
                    subfields: {
                        value: {
                            label: 'Amount',
                            type: 'number',
                            valueSources: ['value'],
                            operators: [
                                'greater',
                                'greater_or_equal',
                                'less',
                                'less_or_equal',
                                'equal',
                                'not_equal',
                                'between',
                            ],
                        },
                        currency: {
                            label: 'Currency',
                            type: 'select',
                            valueSources: ['value'],
                            operators: ['select_equals'],
                            listValues: [
                                {value: '1', title: 'Male'},
                                {value: '0', title: 'Female'},
                                {value: '-1', title: 'Not Set'},
                            ],
                        },
                        period: {
                            label: 'Period',
                            type: 'select',
                            valueSources: ['value'],
                            operators: ['select_equals'],
                            listValues: [
                                {value: 'all_time', title: 'All time'},
                                {value: 'last_month', title: 'Last month'},
                                {value: 'current_month', title: 'Current month'},
                                {value: 'since_last_deposit', title: 'Since last deposit'},
                                {
                                    value: 'since_last_withdrawal',
                                    title: 'Since last withdrawal',
                                },
                            ],
                        },
                        range: {
                            label: 'Period Range',
                            type: 'date',
                            valueSources: ['value'],
                            operators: ['between'],
                        },
                    },
                },
            },
        },
            gameStatistics: {
                label: 'Game statistics',
                tooltip: 'Group of fields',
                type: '!struct',
                subfields: {
                    ggr: {
                        label: 'GGR',
                        type: '!group',
                        subfields: {
                            value: {
                                label: 'Amount',
                                type: 'number',
                                valueSources: ['value'],
                                operators: [
                                    'greater',
                                    'greater_or_equal',
                                    'less',
                                    'less_or_equal',
                                    'equal',
                                    'not_equal',
                                    'between',
                                ],
                            },
                            currency: {
                                label: 'Currency',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues:[
                                    { value: '1', title: 'Male' },
                                    { value: '0', title: 'Female' },
                                    { value: '-1', title: 'Not Set' },
                                ],
                            },
                            period: {
                                label: 'Period',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: 'all_time', title: 'All time' },
                                    { value: 'last_month', title: 'Last month' },
                                    { value: 'current_month', title: 'Current month' },
                                    { value: 'since_last_deposit', title: 'Since last deposit' },
                                    {
                                        value: 'since_last_withdrawal',
                                        title: 'Since last withdrawal',
                                    },
                                ],
                            },
                            range: {
                                label: 'Period Range',
                                type: 'date',
                                valueSources: ['value'],
                                operators: ['between'],
                            },
                        },
                    },
                    rtp: {
                        label: 'RTP',
                        type: '!group',
                        subfields: {
                            value: {
                                label: 'Amount',
                                type: 'number',
                                valueSources: ['value'],
                                operators: [
                                    'greater',
                                    'greater_or_equal',
                                    'less',
                                    'less_or_equal',
                                    'equal',
                                    'not_equal',
                                    'between',
                                ],
                            },
                            currency: {
                                label: 'Currency',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: '1', title: 'Male' },
                                    { value: '0', title: 'Female' },
                                    { value: '-1', title: 'Not Set' },
                                ],
                            },
                            period: {
                                label: 'Period',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: 'all_time', title: 'All time' },
                                    { value: 'last_month', title: 'Last month' },
                                    { value: 'current_month', title: 'Current month' },
                                    { value: 'since_last_deposit', title: 'Since last deposit' },
                                    {
                                        value: 'since_last_withdrawal',
                                        title: 'Since last withdrawal',
                                    },
                                ],
                            },
                            range: {
                                label: 'Period Range',
                                type: 'date',
                                valueSources: ['value'],
                                operators: ['between'],
                            },
                        },
                    },

                    betsAmount: {
                        label: 'Bets amount',
                        type: '!group',
                        subfields: {
                            value: {
                                label: 'Amount',
                                type: 'number',
                                valueSources: ['value'],
                                operators: [
                                    'greater',
                                    'greater_or_equal',
                                    'less',
                                    'less_or_equal',
                                    'equal',
                                    'not_equal',
                                    'between',
                                ],
                            },
                            currency: {
                                label: 'Currency',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: '1', title: 'Male' },
                                    { value: '0', title: 'Female' },
                                    { value: '-1', title: 'Not Set' },
                                ],
                            },
                            period: {
                                label: 'Period',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: 'all_time', title: 'All time' },
                                    { value: 'last_month', title: 'Last month' },
                                    { value: 'current_month', title: 'Current month' },
                                    { value: 'since_last_deposit', title: 'Since last deposit' },
                                    {
                                        value: 'since_last_withdrawal',
                                        title: 'Since last withdrawal',
                                    },
                                ],
                            },
                            provider: {
                                label: 'Provider',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: '1', title: 'Male' },
                                    { value: '0', title: 'Female' },
                                    { value: '-1', title: 'Not Set' },
                                ],
                            },
                            gameType: {
                                label: 'Game Type',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: '1', title: 'Male' },
                                    { value: '0', title: 'Female' },
                                    { value: '-1', title: 'Not Set' },
                                ],
                            },
                            game: {
                                label: 'Game',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: '1', title: 'Male' },
                                    { value: '0', title: 'Female' },
                                    { value: '-1', title: 'Not Set' },
                                ],
                            },
                            range: {
                                label: 'Period Range',
                                type: 'date',
                                valueSources: ['value'],
                                operators: ['between'],
                            },
                        },
                    },
                    betsSumSpins: {
                        label: 'Bets sum spins',
                        type: '!group',
                        subfields: {
                            value: {
                                label: 'Amount',
                                type: 'number',
                                valueSources: ['value'],
                                operators: [
                                    'greater',
                                    'greater_or_equal',
                                    'less',
                                    'less_or_equal',
                                    'equal',
                                    'not_equal',
                                    'between',
                                ],
                            },
                            currency: {
                                label: 'Currency',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: '1', title: 'Male' },
                                    { value: '0', title: 'Female' },
                                    { value: '-1', title: 'Not Set' },
                                ],
                            },
                            period: {
                                label: 'Period',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: 'all_time', title: 'All time' },
                                    { value: 'last_month', title: 'Last month' },
                                    { value: 'current_month', title: 'Current month' },
                                    { value: 'since_last_deposit', title: 'Since last deposit' },
                                    {
                                        value: 'since_last_withdrawal',
                                        title: 'Since last withdrawal',
                                    },
                                ],
                            },
                            provider: {
                                label: 'Provider',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: '1', title: 'Male' },
                                    { value: '0', title: 'Female' },
                                    { value: '-1', title: 'Not Set' },
                                ],
                            },
                            gameType: {
                                label: 'Game Type',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: '1', title: 'Male' },
                                    { value: '0', title: 'Female' },
                                    { value: '-1', title: 'Not Set' },
                                ],
                            },
                            game: {
                                label: 'Game',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: '1', title: 'Male' },
                                    { value: '0', title: 'Female' },
                                    { value: '-1', title: 'Not Set' },
                                ],
                            },
                            range: {
                                label: 'Period Range',
                                type: 'date',
                                valueSources: ['value'],
                                operators: ['between'],
                            },
                        },
                    },
                    betsAvgBySpins: {
                        label: 'Bets average by spins',
                        type: '!group',
                        subfields: {
                            value: {
                                label: 'Amount',
                                type: 'number',
                                valueSources: ['value'],
                                operators: [
                                    'greater',
                                    'greater_or_equal',
                                    'less',
                                    'less_or_equal',
                                    'equal',
                                    'not_equal',
                                    'between',
                                ],
                            },
                            currency: {
                                label: 'Currency',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: '1', title: 'Male' },
                                    { value: '0', title: 'Female' },
                                    { value: '-1', title: 'Not Set' },
                                ],
                            },
                            period: {
                                label: 'Period',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: 'all_time', title: 'All time' },
                                    { value: 'last_month', title: 'Last month' },
                                    { value: 'current_month', title: 'Current month' },
                                    { value: 'since_last_deposit', title: 'Since last deposit' },
                                    {
                                        value: 'since_last_withdrawal',
                                        title: 'Since last withdrawal',
                                    },
                                ],
                            },
                            provider: {
                                label: 'Provider',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: '1', title: 'Male' },
                                    { value: '0', title: 'Female' },
                                    { value: '-1', title: 'Not Set' },
                                ],
                            },
                            gameType: {
                                label: 'Game Type',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: '1', title: 'Male' },
                                    { value: '0', title: 'Female' },
                                    { value: '-1', title: 'Not Set' },
                                ],
                            },
                            game: {
                                label: 'Game',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: '1', title: 'Male' },
                                    { value: '0', title: 'Female' },
                                    { value: '-1', title: 'Not Set' },
                                ],
                            },
                            range: {
                                label: 'Period Range',
                                type: 'date',
                                valueSources: ['value'],
                                operators: ['between'],
                            },
                        },
                    },
                    betsAvg: {
                        label: 'Bets average',
                        type: '!group',
                        subfields: {
                            value: {
                                label: 'Amount',
                                type: 'number',
                                valueSources: ['value'],
                                operators: [
                                    'greater',
                                    'greater_or_equal',
                                    'less',
                                    'less_or_equal',
                                    'equal',
                                    'not_equal',
                                    'between',
                                ],
                            },
                            currency: {
                                label: 'Currency',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: '1', title: 'Male' },
                                    { value: '0', title: 'Female' },
                                    { value: '-1', title: 'Not Set' },
                                ],
                            },
                            period: {
                                label: 'Period',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: 'all_time', title: 'All time' },
                                    { value: 'last_month', title: 'Last month' },
                                    { value: 'current_month', title: 'Current month' },
                                    { value: 'since_last_deposit', title: 'Since last deposit' },
                                    {
                                        value: 'since_last_withdrawal',
                                        title: 'Since last withdrawal',
                                    },
                                ],
                            },
                            provider: {
                                label: 'Provider',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: '1', title: 'Male' },
                                    { value: '0', title: 'Female' },
                                    { value: '-1', title: 'Not Set' },
                                ],
                            },
                            gameType: {
                                label: 'Game Type',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: '1', title: 'Male' },
                                    { value: '0', title: 'Female' },
                                    { value: '-1', title: 'Not Set' },
                                ],
                            },
                            game: {
                                label: 'Game',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: '1', title: 'Male' },
                                    { value: '0', title: 'Female' },
                                    { value: '-1', title: 'Not Set' },
                                ],
                            },
                            range: {
                                label: 'Period Range',
                                type: 'date',
                                valueSources: ['value'],
                                operators: ['between'],
                            },
                        },
                    },
                    betsCount: {
                        label: 'Bets count',
                        type: '!group',
                        subfields: {
                            value: {
                                label: 'Amount',
                                type: 'number',
                                valueSources: ['value'],
                                operators: [
                                    'greater',
                                    'greater_or_equal',
                                    'less',
                                    'less_or_equal',
                                    'equal',
                                    'not_equal',
                                    'between',
                                ],
                            },
                            currency: {
                                label: 'Currency',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: '1', title: 'Male' },
                                    { value: '0', title: 'Female' },
                                    { value: '-1', title: 'Not Set' },
                                ],
                            },
                            period: {
                                label: 'Period',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: 'all_time', title: 'All time' },
                                    { value: 'last_month', title: 'Last month' },
                                    { value: 'current_month', title: 'Current month' },
                                    { value: 'since_last_deposit', title: 'Since last deposit' },
                                    {
                                        value: 'since_last_withdrawal',
                                        title: 'Since last withdrawal',
                                    },
                                ],
                            },
                            provider: {
                                label: 'Provider',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: '1', title: 'Male' },
                                    { value: '0', title: 'Female' },
                                    { value: '-1', title: 'Not Set' },
                                ],
                            },
                            gameType: {
                                label: 'Game Type',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues:[
                                    { value: '1', title: 'Male' },
                                    { value: '0', title: 'Female' },
                                    { value: '-1', title: 'Not Set' },
                                ],
                            },
                            game: {
                                label: 'Game',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: '1', title: 'Male' },
                                    { value: '0', title: 'Female' },
                                    { value: '-1', title: 'Not Set' },
                                ],
                            },
                            range: {
                                label: 'Period Range',
                                type: 'date',
                                valueSources: ['value'],
                                operators: ['between'],
                            },
                        },
                    },
                    betsCountGame: {
                        label: 'Bets count game',
                        type: '!group',
                        subfields: {
                            value: {
                                label: 'Amount',
                                type: 'number',
                                valueSources: ['value'],
                                operators: [
                                    'greater',
                                    'greater_or_equal',
                                    'less',
                                    'less_or_equal',
                                    'equal',
                                    'not_equal',
                                    'between',
                                ],
                            },
                            currency: {
                                label: 'Currency',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: '1', title: 'Male' },
                                    { value: '0', title: 'Female' },
                                    { value: '-1', title: 'Not Set' },
                                ],
                            },
                            period: {
                                label: 'Period',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: 'all_time', title: 'All time' },
                                    { value: 'last_month', title: 'Last month' },
                                    { value: 'current_month', title: 'Current month' },
                                    { value: 'since_last_deposit', title: 'Since last deposit' },
                                    {
                                        value: 'since_last_withdrawal',
                                        title: 'Since last withdrawal',
                                    },
                                ],
                            },
                            provider: {
                                label: 'Provider',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: '1', title: 'Male' },
                                        { value: '0', title: 'Female' },
                                        { value: '-1', title: 'Not Set' },
                                    ],
                            },
                            gameType: {
                                label: 'Game Type',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: '1', title: 'Male' },
                                    { value: '0', title: 'Female' },
                                    { value: '-1', title: 'Not Set' },
                                ],
                            },
                            game: {
                                label: 'Game',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: '1', title: 'Male' },
                                    { value: '0', title: 'Female' },
                                    { value: '-1', title: 'Not Set' },
                                ],
                            },
                            range: {
                                label: 'Period Range',
                                type: 'date',
                                valueSources: ['value'],
                                operators: ['between'],
                            },
                        },
                    },
                    betsCountGameType: {
                        label: 'Bets count game type',
                        type: '!group',
                        subfields: {
                            value: {
                                label: 'Amount',
                                type: 'number',
                                valueSources: ['value'],
                                operators: [
                                    'greater',
                                    'greater_or_equal',
                                    'less',
                                    'less_or_equal',
                                    'equal',
                                    'not_equal',
                                    'between',
                                ],
                            },
                            currency: {
                                label: 'Currency',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: '1', title: 'Male' },
                                    { value: '0', title: 'Female' },
                                    { value: '-1', title: 'Not Set' },
                                ],
                            },
                            period: {
                                label: 'Period',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: 'all_time', title: 'All time' },
                                    { value: 'last_month', title: 'Last month' },
                                    { value: 'current_month', title: 'Current month' },
                                    { value: 'since_last_deposit', title: 'Since last deposit' },
                                    {
                                        value: 'since_last_withdrawal',
                                        title: 'Since last withdrawal',
                                    },
                                ],
                            },
                            provider: {
                                label: 'Provider',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: '1', title: 'Male' },
                                    { value: '0', title: 'Female' },
                                    { value: '-1', title: 'Not Set' },
                                ],
                            },
                            gameType: {
                                label: 'Game Type',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: '1', title: 'Male' },
                                    { value: '0', title: 'Female' },
                                    { value: '-1', title: 'Not Set' },
                                ],
                            },
                            game: {
                                label: 'Game',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: '1', title: 'Male' },
                                    { value: '0', title: 'Female' },
                                    { value: '-1', title: 'Not Set' },
                                ],
                            },
                            range: {
                                label: 'Period Range',
                                type: 'date',
                                valueSources: ['value'],
                                operators: ['between'],
                            },
                        },
                    },
                    betsCountProvider: {
                        label: 'Bets count provider',
                        type: '!group',
                        subfields: {
                            value: {
                                label: 'Amount',
                                type: 'number',
                                valueSources: ['value'],
                                operators: [
                                    'greater',
                                    'greater_or_equal',
                                    'less',
                                    'less_or_equal',
                                    'equal',
                                    'not_equal',
                                    'between',
                                ],
                            },
                            currency: {
                                label: 'Currency',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: '1', title: 'Male' },
                                    { value: '0', title: 'Female' },
                                    { value: '-1', title: 'Not Set' },
                                ],
                            },
                            period: {
                                label: 'Period',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: 'all_time', title: 'All time' },
                                    { value: 'last_month', title: 'Last month' },
                                    { value: 'current_month', title: 'Current month' },
                                    { value: 'since_last_deposit', title: 'Since last deposit' },
                                    {
                                        value: 'since_last_withdrawal',
                                        title: 'Since last withdrawal',
                                    },
                                ],
                            },
                            provider: {
                                label: 'Provider',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: '1', title: 'Male' },
                                    { value: '0', title: 'Female' },
                                    { value: '-1', title: 'Not Set' },
                                ],
                            },
                            gameType: {
                                label: 'Game Type',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: '1', title: 'Male' },
                                    { value: '0', title: 'Female' },
                                    { value: '-1', title: 'Not Set' },
                                ],
                            },
                            game: {
                                label: 'Game',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: '1', title: 'Male' },
                                    { value: '0', title: 'Female' },
                                    { value: '-1', title: 'Not Set' },
                                ],
                            },
                            range: {
                                label: 'Period Range',
                                type: 'date',
                                valueSources: ['value'],
                                operators: ['between'],
                            },
                        },
                    },
                    winningsAmount: {
                        label: 'Winnings amount',
                        type: '!group',
                        subfields: {
                            value: {
                                label: 'Amount',
                                type: 'number',
                                valueSources: ['value'],
                                operators: [
                                    'greater',
                                    'greater_or_equal',
                                    'less',
                                    'less_or_equal',
                                    'equal',
                                    'not_equal',
                                    'between',
                                ],
                            },
                            currency: {
                                label: 'Currency',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: '1', title: 'Male' },
                                    { value: '0', title: 'Female' },
                                    { value: '-1', title: 'Not Set' },
                                ],
                            },
                            period: {
                                label: 'Period',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: 'all_time', title: 'All time' },
                                    { value: 'last_month', title: 'Last month' },
                                    { value: 'current_month', title: 'Current month' },
                                    { value: 'since_last_deposit', title: 'Since last deposit' },
                                    {
                                        value: 'since_last_withdrawal',
                                        title: 'Since last withdrawal',
                                    },
                                ],
                            },
                            provider: {
                                label: 'Provider',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: '1', title: 'Male' },
                                    { value: '0', title: 'Female' },
                                    { value: '-1', title: 'Not Set' },
                                ],
                            },
                            gameType: {
                                label: 'Game Type',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: '1', title: 'Male' },
                                    { value: '0', title: 'Female' },
                                    { value: '-1', title: 'Not Set' },
                                ],
                            },
                            game: {
                                label: 'Game',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: '1', title: 'Male' },
                                    { value: '0', title: 'Female' },
                                    { value: '-1', title: 'Not Set' },
                                ],
                            },
                            range: {
                                label: 'Period Range',
                                type: 'date',
                                valueSources: ['value'],
                                operators: ['between'],
                            },
                        },
                    },
                    winningsCount: {
                        label: 'Winnings amount',
                        type: '!group',
                        subfields: {
                            value: {
                                label: 'Amount',
                                type: 'number',
                                valueSources: ['value'],
                                operators: [
                                    'greater',
                                    'greater_or_equal',
                                    'less',
                                    'less_or_equal',
                                    'equal',
                                    'not_equal',
                                    'between',
                                ],
                            },
                            currency: {
                                label: 'Currency',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: '1', title: 'Male' },
                                    { value: '0', title: 'Female' },
                                    { value: '-1', title: 'Not Set' },
                                ],
                            },
                            period: {
                                label: 'Period',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: 'all_time', title: 'All time' },
                                    { value: 'last_month', title: 'Last month' },
                                    { value: 'current_month', title: 'Current month' },
                                    { value: 'since_last_deposit', title: 'Since last deposit' },
                                    {
                                        value: 'since_last_withdrawal',
                                        title: 'Since last withdrawal',
                                    },
                                ],
                            },
                            provider: {
                                label: 'Provider',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: '1', title: 'Male' },
                                    { value: '0', title: 'Female' },
                                    { value: '-1', title: 'Not Set' },
                                ],
                            },
                            gameType: {
                                label: 'Game Type',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: '1', title: 'Male' },
                                    { value: '0', title: 'Female' },
                                    { value: '-1', title: 'Not Set' },
                                ],
                            },
                            game: {
                                label: 'Game',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: '1', title: 'Male' },
                                    { value: '0', title: 'Female' },
                                    { value: '-1', title: 'Not Set' },
                                ],
                            },
                            range: {
                                label: 'Period Range',
                                type: 'date',
                                valueSources: ['value'],
                                operators: ['between'],
                            },
                        },
                    },
                    winningsAvg: {
                        label: 'Winnings average',
                        type: '!group',
                        subfields: {
                            value: {
                                label: 'Amount',
                                type: 'number',
                                valueSources: ['value'],
                                operators: [
                                    'greater',
                                    'greater_or_equal',
                                    'less',
                                    'less_or_equal',
                                    'equal',
                                    'not_equal',
                                    'between',
                                ],
                            },
                            currency: {
                                label: 'Currency',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: '1', title: 'Male' },
                                    { value: '0', title: 'Female' },
                                    { value: '-1', title: 'Not Set' },
                                ],
                            },
                            period: {
                                label: 'Period',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: 'all_time', title: 'All time' },
                                    { value: 'last_month', title: 'Last month' },
                                    { value: 'current_month', title: 'Current month' },
                                    { value: 'since_last_deposit', title: 'Since last deposit' },
                                    {
                                        value: 'since_last_withdrawal',
                                        title: 'Since last withdrawal',
                                    },
                                ],
                            },
                            provider: {
                                label: 'Provider',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: '1', title: 'Male' },
                                    { value: '0', title: 'Female' },
                                    { value: '-1', title: 'Not Set' },
                                ],
                            },
                            gameType: {
                                label: 'Game Type',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: '1', title: 'Male' },
                                    { value: '0', title: 'Female' },
                                    { value: '-1', title: 'Not Set' },
                                ],
                            },
                            game: {
                                label: 'Game',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: '1', title: 'Male' },
                                    { value: '0', title: 'Female' },
                                    { value: '-1', title: 'Not Set' },
                                ],
                            },
                            range: {
                                label: 'Period Range',
                                type: 'date',
                                valueSources: ['value'],
                                operators: ['between'],
                            },
                        },
                    },
                },
            },
            balance: {
                label: 'Balance Amount',
                tooltip: 'Group of fields',
                type: '!struct',
                subfields: {
                    amount: {
                        label: 'Balance Amount',
                        type: '!group',
                        subfields: {
                            value: {
                                label: 'Amount',
                                type: 'number',
                                valueSources: ['value'],
                                fieldSettings: {
                                    min: 0,
                                    max: 999999999999999999,
                                },
                                operators: [
                                    'greater',
                                    'greater_or_equal',
                                    'less',
                                    'less_or_equal',
                                    'equal',
                                    'not_equal',
                                    'between',
                                ],
                                mainWidgetProps: {
                                    valueLabel: 'Balance Amount',
                                    validateValue: (val, fieldDef, flag) => {
                                        if (val === undefined && flag) {
                                            return "No value entered"
                                        }
                                            const regex =  /^\$?(?!0.00)(([0-9]{1,3},([0-9]{3},)*)[0-9]{3}|[0-9]{1,3})(\.[0-9]{0,3}[^-_.])?$/;
                                            const validRegex = regex.test(val);

                                            return validRegex || !val ? null : "Invalid format";
                                    },
                                },
                            },
                            currency: {
                                label: 'Currency',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: '1', title: 'Male' },
                                    { value: '0', title: 'Female' },
                                    { value: '-1', title: 'Not Set' },
                                ],
                            },
                        },
                    },
                    count: {
                        label: 'Balance count',
                        type: '!group',
                        subfields: {
                            value: {
                                label: 'Amount',
                                type: 'number',
                                valueSources: ['value'],
                                operators: [
                                    'greater',
                                    'greater_or_equal',
                                    'less',
                                    'less_or_equal',
                                    'equal',
                                    'not_equal',
                                    'between',
                                ],
                            },
                            currency: {
                                label: 'Currency',
                                type: 'select',
                                valueSources: ['value'],
                                operators: ['select_equals'],
                                listValues: [
                                    { value: '1', title: 'Male' },
                                    { value: '0', title: 'Female' },
                                    { value: '-1', title: 'Not Set' },
                                ],
                            },
                        },
                    },
                },
            },

    };

    //////////////////////////////////////////////////////////////////////

    const funcs: Funcs = {
        LOWER: {
            label: 'Lowercase',
            mongoFunc: '$toLower',
            jsonLogic: "toLowerCase",
            jsonLogicIsMethod: true,
            returnType: 'text',
            args: {
                str: {
                    label: "String",
                    type: 'text',
                    valueSources: ['value', 'field'],
                },
            }
        },
        LINEAR_REGRESSION: {
            label: 'Linear regression',
            returnType: 'number',
            formatFunc: ({coef, bias, val}, _) => `(${coef} * ${val} + ${bias})`,
            sqlFormatFunc: ({coef, bias, val}) => `(${coef} * ${val} + ${bias})`,
            mongoFormatFunc: ({coef, bias, val}) => ({'$sum': [{'$multiply': [coef, val]}, bias]}),
            jsonLogic: ({coef, bias, val}) => ({ "+": [ {"*": [coef, val]}, bias ] }),
            renderBrackets: ['', ''],
            renderSeps: [' * ', ' + '],
            args: {
                coef: {
                    label: "Coef",
                    type: 'number',
                    defaultValue: 1,
                    valueSources: ['value'],
                },
                val: {
                    label: "Value",
                    type: 'number',
                    valueSources: ['value'],
                },
                bias: {
                    label: "Bias",
                    type: 'number',
                    defaultValue: 0,
                    valueSources: ['value'],
                }
            }
        },
    };



    const config: Config = {
        conjunctions,
        operators,
        widgets,
        types,
        settings,
        fields,
        funcs,
    };

    return config;
};

