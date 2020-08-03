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
        // examples of  overridingAre you sure delete t
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
            jsonLogic: "between",
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
        is_empty: {
            ...InitialConfig.operators.is_empty,

            jsonLogic2: "!",
        },
        is_not_empty: {
            ...InitialConfig.operators.is_not_empty,

            jsonLogic2: "!!",

        },
        multiselect_equals: {
            ...InitialConfig.operators.multiselect_equals,
            jsonLogic2: "in",
            jsonLogic: (field, op, vals) => ({
                // it's not "equals", but "includes" operator - just for example
                "in": [ field, {"in": [{"var": ""}, vals]} ]
            }),
        },
    };


    const widgets: Widgets = {
        ...InitialConfig.widgets,
        // examples of  overriding
        text: {
            ...InitialConfig.widgets.text,
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
            jsonLogic: val => {
                return val.toString();
            },
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
        // select: merge(InitialConfig.types.select, {
        //     widgets: {
        //         select: {
        //             widgetProps: {
        //                 hideOperator: true,
        //                 operatorInlineLabel: "is"
        //             },
        //             opProps: {
        //                 select_any_in: {
        //                     label: "is"
        //                 },
        //             }
        //         },
        //     },
        // }),
        text: merge(BasicConfig.types.text, {
            widgets: {
                text: {
                    operators: [
                        'equal',
                        'not_equal',
                        'is_empty',
                        'is_not_empty',
                        'like',
                        'not_like',
                        'contains',
                        'not_contains',
                    ],
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
            title: 'Delete the rule?',
            text: 'Are you sure delete this rule?',
            okText: 'Delete',
            okType: 'danger',
            cancelText: 'Cancel'
        },
        removeGroupConfirmOptions: {
            title: 'Delete the group?',
            text: 'Are you sure delete this group?',
            okText: 'Delete',
            okType: 'danger',
            cancelText: 'Cancel'
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
        canLeaveEmptyGroup: false, //after deletion
        showErrorMessage: true,
        // renderField: (props) => <FieldCascader {...props} />,
        // renderOperator: (props) => <FieldDropdown {...props} />,
        // renderFunc: (props) => <FieldSelect {...props} />,
        maxNumberOfRules: 4, // number of rules can be added to the query builder
        requiredFieldsMessage: 'Required fields are empty',
        addRequiredFieldMessage: 'Please add the required parameter(s): ',
        noValueMessage: 'No value selected',
        amountLabel: 'Amount',
        currencyLabel: 'Currency'
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
                    operators: ['select_any_in'],
                    valueSources: ['value'],
                    listValues: [
                        { value: '1', title: 'Male' },
                        { value: '0', title: 'Female' },
                        { value: '-1', title: 'Not Set' },
                    ],
                },
                // socialNetwork: {
                //     type: 'select',
                //     label: 'Social Network',
                //     operators: [
                //         'is_not_empty',
                //         'is_empty',
                //         'select_any_in',
                //         'select_not_any_in',
                //     ],
                //     defaultOperator: 'select_any_in',
                //     valueSources: ['value'],
                //     listValues: [
                //         { value: '1', title: 'Male' },
                //         { value: '0', title: 'Female' },
                //         { value: '-1', title: 'Not Set' },
                //         { value: '2', title: 'Prefer not to say' },
                //     ],
                // },
                // timezone: {
                //     type: 'select',
                //     label: 'Timezone',
                //     operators: [
                //         'select_equals',
                //         'select_not_equals',
                //         'select_any_in',
                //         'select_not_any_in',
                //     ],
                //     valueSources: ['value'],
                //     listValues: [
                //         { value: '1', title: 'Male' },
                //         { value: '0', title: 'Female' },
                //         { value: '-1', title: 'Not Set' },
                //     ],
                // },
                // createdAt: {
                //     label: 'Created At',
                //     type: 'date',
                //     valueSources: ['value'],
                //     // defaultValue: moment()
                //     //   .subtract(18, 'year')
                //     //   .format('YYYY-MM-DD'),
                //     operators: [
                //         'greater',
                //         'greater_or_equal',
                //         'less',
                //         'less_or_equal',
                //         'equal',
                //         'not_equal',
                //     ],
                // },
                // lastVisitCountry: {
                //     label: 'Last Visit Country',
                //     type: 'select',
                //     operators: [
                //         'select_equals',
                //         'select_not_equals',
                //         'select_any_in',
                //         'select_not_any_in',
                //     ],
                //     valueSources: ['value'],
                //     listValues: [
                //         { value: '1', title: 'Male' },
                //         { value: '0', title: 'Female' },
                //         { value: '-1', title: 'Not Set' },
                //     ],
                // },
                // lastVisitCity: {
                //     type: 'text',
                //     label: 'Last visit city',
                //     valueSources: ['value'],
                //     operators: ['equal', 'not_equal', 'contains'],
                //     mainWidgetProps: {
                //         valueLabel: 'City',
                //         validateValue: (val, fieldDef, flag) => {
                //             if (!val && flag) {
                //                 return "No value entered"
                //             } else if (val) {
                //                 const regex =  /^[a-zA-Z ]*$/;
                //                 // const validRegex = regex.test(val);
                //                 const validLength = val.length >= 2 && val.length <= 10;
                //                 // const valid = validLength  && validRegex;
                //                 // let errorMessage;
                //                 // if (!validLength) {
                //                 //     errorMessage = "City length should be not les than 2 symbols and not more than 255 symbols"
                //                 // } else if (!validRegex) {
                //                 //     errorMessage = "City name can cota"
                //                 // }
                //
                //
                //                 // if (!validLength) {
                //                 //     return "City name length should be not les than 2 symbols and not more than 255 symbols";
                //                 // }
                //
                //                 return validLength ? null : "City name length should be not les than 2 symbols and not more than 255 symbols";
                //             }
                //
                //         },
                //     },
                // },
                status: {
                    type: 'select',
                    label: 'Status',
                    operators: [
                        'select_any_in',
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
                    operators: ['equal'],
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
                        'is_not_empty',
                        'is_empty',
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
                        'select_any_in',
                        'select_not_any_in',
                        'is_not_empty',
                        'is_empty',
                    ],
                    defaultOperator: 'select_any_in',
                    valueSources: ['value'],
                    listValues: [
                        // { value: '1', title: 'Male' },
                        // { value: '0', title: 'Female' },
                        // { value: '-1', title: 'Not Set' },
                        { id: 'AF', title: 'Afghanistan +09', value: '1'},
                        { id: 'AX', title: 'Aland Islands +02', value: '2'},
                        { id: 'AL', title: 'Albania + 03', value: '3'},
                        { id: 'DZ', title: 'Algeria +034', value: '4'},
                        { id: 'AS', title: 'American Samoa + 096', value: '5'},
                        { id: 'AD', title: 'Andorra + 012', value: '6'},
                        { id: 'AO', title: 'Angola +035', value: '7'},
                    ],
                },
                city: {
                    type: 'text',
                    label: 'City',
                    valueSources: ['value'],
                    operators: ['equal', 'not_equal', 'is_not_empty', 'is_empty'],
                    defaultOperator: 'equal',
                    mainWidgetProps: {
                        valueLabel: 'City',
                        validateValue: (val: any, fieldDef: object, flag: Boolean) => {
                            if (!val && flag) {
                                return 'No value entered';
                            } else if (val) {
                                const regex = /^[a-zA-Z ]*$/;
                                const validRegex = regex.test(val);
                                const validLength = val.length >= 2 && val.length <= 255;

                                if (!validLength) {
                                    return 'City length should be not les than 2 symbols and not more than 255 symbols';
                                } else if (!validRegex) {
                                    return 'City name can contain only letters';
                                }
                                if (!validLength) {
                                    return 'City name length should be not les than 2 symbols and not more than 255 symbols';
                                }
                            }
                            return false;
                        },
                    },
                },
            },
        },
        technical: {
            label: 'Technical information',
            tooltip: 'Group of fields',
            type: '!struct',
            subfields: {
                nodeId: {
                    type: 'treemultiselect',
                    label: 'Hall',
                    operators: [
                        'multiselect_equals',
                        'multiselect_not_equals',
                    ],
                    fieldSettings: {
                        treeExpandAll: true,
                        listValues: [{
                            children: [{value: 2, title: "Hall"}, {value: 3, title: "testHall"}],
                            value: 1,
                            title: "Root"
                        }]
                    }
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
                        'date_range',
                    ],
                    defaultOperator: 'equal',
                },
                registrationIp: {
                    type: 'text',
                    label: 'Registration IP',
                    valueSources: ['value'],
                    operators: ['equal', 'not_equal', 'contains'],
                    defaultOperator: 'equal',
                    mainWidgetProps: {
                        valueLabel: 'Registration IP',
                        mask: [/\d./],
                        placeholderInput: 'Ex. 192.22.42.5',
                        validateValue: (val: string, fieldDef: object, flag?: Boolean) => {
                            if (val === undefined && flag) {
                                return 'No value entered';
                            }
                            if (flag) {
                                const regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

                                const validRegex = regex.test(val);

                                return validRegex
                                    ? false
                                    : 'You have entered an invalid IP address';

                            } else {
                                return false;
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
                        'date_range',
                        'is_not_empty',
                        'is_empty',
                    ],
                    defaultOperator: 'equal',
                },
                lastLoginIp: {
                    type: 'text',
                    label: 'Last visit IP',
                    valueSources: ['value'],
                    operators: ['equal', 'not_equal', 'is_not_empty', 'is_empty'],
                    defaultOperator: 'equal',
                    mainWidgetProps: {
                        valueLabel: 'Registration IP',
                        mask: [/\d./],
                        placeholderInput: 'Ex. 192.22.42.5',
                        validateValue: (val: string, fieldDef: object, flag?: Boolean) => {
                            if (val === undefined && flag) {
                                return 'No value entered';
                            }
                            if (flag) {
                                const regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

                                const validRegex = regex.test(val);

                                return validRegex
                                    ? false
                                    : 'You have entered an invalid IP address';

                            } else {
                                return false;
                            }
                        },
                    },
                },
                // confirmationEmailStatus: {
                //     type: 'select',
                //     label: 'Confirmation Email Status',
                //     operators: ['select_equals'],
                //     valueSources: ['value'],
                //     listValues: [
                //         { value: '1', title: '\u0410\u043a\u0442\u0438\u0432\u0435\u043d' },
                //         {
                //             value: '0',
                //             title: '\u041d\u0435 \u0430\u043a\u0442\u0438\u0432\u0435\u043d',
                //         },
                //         {
                //             value: '-1',
                //             title: '\u0417\u0430\u0431\u0430\u043d\u0435\u043d',
                //         },
                //     ],
                // },
                // confirmationPhoneStatus: {
                //     type: 'select',
                //     label: 'Confirmation Phone Status',
                //     operators: ['select_equals', 'select_not_equals'],
                //     valueSources: ['value'],
                //     listValues: [
                //         { value: '1', title: '\u0410\u043a\u0442\u0438\u0432\u0435\u043d' },
                //         {
                //             value: '0',
                //             title: '\u041d\u0435 \u0430\u043a\u0442\u0438\u0432\u0435\u043d',
                //         },
                //         {
                //             value: '-1',
                //             title: '\u0417\u0430\u0431\u0430\u043d\u0435\u043d',
                //         },
                //     ],
                // },
                // phoneNumberPrefix: {
                //     type: 'select',
                //     label: 'Phone Number Prefix',
                //     operators: [
                //         'select_equals',
                //         'select_not_equals',
                //         'select_any_in',
                //         'select_not_any_in',
                //     ],
                //     valueSources: ['value'],
                //     listValues: [
                //         { value: '1', title: '\u0410\u043a\u0442\u0438\u0432\u0435\u043d' },
                //         {
                //             value: '0',
                //             title: '\u041d\u0435 \u0430\u043a\u0442\u0438\u0432\u0435\u043d',
                //         },
                //         {
                //             value: '-1',
                //             title: '\u0417\u0430\u0431\u0430\u043d\u0435\u043d',
                //         },
                //     ],
                // },
                // registrationFormName: {
                //     type: 'text',
                //     label: 'Registration Form Name',
                //     valueSources: ['value'],
                //     operators: ['equal', 'not_equal'],
                //     mainWidgetProps: {
                //         valueLabel: 'Registration Form Name',
                //         validateValue: (val, fieldDef, flag) => {
                //             if (!val && flag) {
                //                 return "No value entered"
                //             } else if (val) {
                //                 const regex =  /^[a-zA-Z ]*$/;
                //                 // const validRegex = regex.test(val);
                //                 const validLength = val.length >= 2 && val.length <= 2550;
                //                 // const valid = validLength  && validRegex;
                //                 // let errorMessage;
                //                 // if (!validLength) {
                //                 //     errorMessage = "City length should be not les than 2 symbols and not more than 255 symbols"
                //                 // } else if (!validRegex) {
                //                 //     errorMessage = "City name can cota"
                //                 // }
                //
                //
                //                 // if (!validLength) {
                //                 //     return "City name length should be not les than 2 symbols and not more than 255 symbols";
                //                 // }
                //
                //                 return validLength ? null : "City name length should be not les than 2 symbols and not more than 255 symbols";
                //             }
                //
                //         },
                //     },
                // },
                // countryOfRegistration: {
                //     label: 'Country Of Registration',
                //     type: 'select',
                //     operators: [
                //         'select_equals',
                //         'select_not_equals',
                //         'select_any_in',
                //         'select_not_any_in',
                //     ],
                //     valueSources: ['value'],
                //     listValues: [
                //         { value: '1', title: 'Male' },
                //         { value: '0', title: 'Female' },
                //         { value: '-1', title: 'Not Set' },
                //     ],
                // },
            },
        },
        financial: {
            label: 'Financial statistics',
            tooltip: 'Group of fields',
            type: '!struct',
            subfields: {
                amount: {
                    label: 'Current balance',
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
                            fieldSettings: {
                                max: 199999999999999999,
                            },
                            mainWidgetProps: {
                                valueLabel: 'Amount',
                                validateValue: (val, fieldDef, flag, valueArr, operator) => {
                                    // if (val === undefined && flag) {
                                    //   return 'No value entered';
                                    // }
                                    const regex = /^\$?(?!0.00)(([0-9]{1,3},([0-9]{3},)*)[0-9]{3}|[0-9]{1,19})(\.[0-9]{0,3}[^-_.])?$/g;
                                    const validRegex = regex.test(val);

                                    if (valueArr && val !== undefined) {
                                        if (
                                            valueArr[0] > valueArr[1] ||
                                            valueArr[0] === valueArr[1]
                                        ) {
                                            return "Value 'from' must be less than 'till'";
                                        }
                                    } else if (!validRegex && val !== undefined) {
                                        return 'Invalid format';
                                    } else if (
                                        operator === 'less' &&
                                        val <= 0 &&
                                        val !== undefined
                                    ) {
                                        return 'Value must be greater than 0 ';
                                    }
                                    return false;
                                },
                            },
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
                depositsAmount: {
                    label: 'Deposits Amount',
                    type: '!group',
                    subfields: {
                        value: {
                            label: 'Amount (Required)',
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
                            defaultOperator: 'equal',
                            fieldSettings: {
                                min: 0,
                                max: 999999999999999999,
                            },
                            mainWidgetProps: {
                                valueLabel: 'Amount',
                                validateValue: (val, fieldDef, flag, valueArr, operator) => {
                                    // if (val === undefined && flag) {
                                    //   return 'No value entered';
                                    // }
                                    const regex = /^\$?(?!0.00)(([0-9]{1,3},([0-9]{3},)*)[0-9]{3}|[0-9]{1,19})(\.[0-9]{0,3}[^-_.])?$/g;
                                    const validRegex = regex.test(val);

                                    if (valueArr && val !== undefined) {
                                        if (
                                            valueArr[0] > valueArr[1] ||
                                            valueArr[0] === valueArr[1]
                                        ) {
                                            return "Value 'from' must be less than 'till'";
                                        }
                                    } else if (!validRegex && val !== undefined) {
                                        return 'Invalid format';
                                    } else if (
                                        operator === 'less' &&
                                        val <= 0 &&
                                        val !== undefined
                                    ) {
                                        return 'Value must be greater than 0 ';
                                    }
                                    return false;
                                },
                            },
                        },
                        currency: {
                            label: 'Currency (Required)',
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
                        // paymentSystem: {
                        //     label: 'Payment System',
                        //     type: 'select',
                        //     valueSources: ['value'],
                        //     operators: ['select_equals'],
                        //     listValues: [
                        //         {value: '1', title: 'Male'},
                        //         {value: '0', title: 'Female'},
                        //         {value: '-1', title: 'Not Set'},
                        //     ],
                        // },
                        // paymentMethod: {
                        //     label: 'Payment Method',
                        //     type: 'select',
                        //     valueSources: ['value'],
                        //     operators: ['select_equals'],
                        //     listValues: [
                        //         {value: '1', title: 'Male'},
                        //         {value: '0', title: 'Female'},
                        //         {value: '-1', title: 'Not Set'},
                        //     ],
                        // },
                        range: {
                            label: 'Period Range',
                            type: 'date',
                            valueSources: ['value'],
                            operators: ['date_range'],
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
                            fieldSettings: {
                                min: 0,
                                max: 999999999999999999,
                            },
                            mainWidgetProps: {
                                valueLabel: 'Amount',
                                validateValue: (val, fieldDef, flag, valueArr, operator) => {
                                    if (val === undefined && flag) {
                                        return "No value entered"
                                    }
                                    const regex =  /^\$?(?!0.00)(([0-9]{1,3},([0-9]{3},)*)[0-9]{3}|[0-9]{1,19})(\.[0-9]{0,3}[^-_.])?$/g;
                                    const validRegex = regex.test(val);

                                    if (valueArr && val !== undefined) {
                                        if(valueArr[0] > valueArr[1] || valueArr[0] === valueArr[1]) {
                                            return "Value 'from' must be less than 'till'"
                                        }
                                    } else if (!validRegex && val !== undefined) {
                                        return  "Invalid format"
                                    } else if (operator === 'less' && val <= 0 && val !== undefined ) {
                                        return "Value must be greater than 0 "
                                    }
                                    return true;
                                },
                            },
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
                            operators: ['date_range'],
                        },
                    },
                },
                depositsAvg: {
                    label: 'Average deposit',
                    type: '!group',
                    subfields: {
                        value: {
                            label: 'Amount (Required)',
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
                            defaultOperator: 'equal',
                            fieldSettings: {
                                min: 0,
                                max: 999999999999999999,
                            },
                            mainWidgetProps: {
                                valueLabel: 'Amount',
                                validateValue: (val, fieldDef, flag, valueArr, operator) => {
                                    // if (val === undefined && flag) {
                                    //   return 'No value entered';
                                    // }
                                    const regex = /^\$?(?!0.00)(([0-9]{1,3},([0-9]{3},)*)[0-9]{3}|[0-9]{1,19})(\.[0-9]{0,3}[^-_.])?$/g;
                                    const validRegex = regex.test(val);

                                    if (valueArr && val !== undefined) {
                                        if (
                                            valueArr[0] > valueArr[1] ||
                                            valueArr[0] === valueArr[1]
                                        ) {
                                            return "Value 'from' must be less than 'till'";
                                        }
                                    } else if (!validRegex && val !== undefined) {
                                        return 'Invalid format';
                                    } else if (
                                        operator === 'less' &&
                                        val <= 0 &&
                                        val !== undefined
                                    ) {
                                        return 'Value must be greater than 0 ';
                                    }
                                    return false;
                                },
                            },
                        },
                        currency: {
                            label: 'Currency (Required)',
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
                        // paymentSystem: {
                        //     label: 'Payment System',
                        //     type: 'select',
                        //     valueSources: ['value'],
                        //     operators: ['select_equals'],
                        //     listValues: [
                        //         {value: '1', title: 'Male'},
                        //         {value: '0', title: 'Female'},
                        //         {value: '-1', title: 'Not Set'},
                        //     ],
                        // },
                        // paymentMethod: {
                        //     label: 'Payment Method',
                        //     type: 'select',
                        //     valueSources: ['value'],
                        //     operators: ['select_equals'],
                        //     listValues: [
                        //         {value: '1', title: 'Male'},
                        //         {value: '0', title: 'Female'},
                        //         {value: '-1', title: 'Not Set'},
                        //     ],
                        // },
                        range: {
                            label: 'Period Range',
                            type: 'date',
                            valueSources: ['value'],
                            operators: ['date_range'],
                        },
                    },
                },
                // firstDepositAmount: {
                //     label: 'First deposit amount',
                //     type: '!group',
                //     subfields: {
                //         value: {
                //             label: 'Amount',
                //             type: 'number',
                //             valueSources: ['value'],
                //             operators: [
                //                 'greater',
                //                 'greater_or_equal',
                //                 'less',
                //                 'less_or_equal',
                //                 'equal',
                //                 'not_equal',
                //                 'between',
                //             ],
                //             fieldSettings: {
                //                 min: 0,
                //                 max: 999999999999999999,
                //             },
                //             mainWidgetProps: {
                //                 valueLabel: 'Amount',
                //                 validateValue: (val, fieldDef, flag, valueArr, operator) => {
                //                     if (val === undefined && flag) {
                //                         return "No value entered"
                //                     }
                //                     const regex =  /^\$?(?!0.00)(([0-9]{1,3},([0-9]{3},)*)[0-9]{3}|[0-9]{1,19})(\.[0-9]{0,3}[^-_.])?$/g;
                //                     const validRegex = regex.test(val);
                //
                //                     if (valueArr && val !== undefined) {
                //                         if(valueArr[0] > valueArr[1] || valueArr[0] === valueArr[1]) {
                //                             return "Value 'from' must be less than 'till'"
                //                         }
                //                     } else if (!validRegex && val !== undefined) {
                //                         return  "Invalid format"
                //                     } else if (operator === 'less' && val <= 0 && val !== undefined ) {
                //                         return "Value must be greater than 0 "
                //                     }
                //                     return true;
                //                 },
                //             },
                //         },
                //         currency: {
                //             label: 'Currency',
                //             type: 'select',
                //             valueSources: ['value'],
                //             operators: ['select_equals'],
                //             listValues: [
                //                 {value: '1', title: 'Male'},
                //                 {value: '0', title: 'Female'},
                //                 {value: '-1', title: 'Not Set'},
                //             ],
                //         },
                //         period: {
                //             label: 'Period',
                //             type: 'select',
                //             valueSources: ['value'],
                //             listValues: [
                //                 {value: 'all_time', title: 'All time'},
                //                 {value: 'last_month', title: 'Last month'},
                //                 {value: 'current_month', title: 'Current month'},
                //                 {value: 'since_last_deposit', title: 'Since last deposit'},
                //                 {
                //                     value: 'since_last_withdrawal',
                //                     title: 'Since last withdrawal',
                //                 },
                //             ],
                //         },
                //         range: {
                //             label: 'Period Range',
                //             type: 'date',
                //             valueSources: ['value'],
                //             operators: ['date_range'],
                //         },
                //     },
                // },
                // firstDepositDate: {
                //     label: 'First deposit date',
                //     type: '!group',
                //     subfields: {
                //         value: {
                //             label: 'Date',
                //             type: 'date',
                //             valueSources: ['value'],
                //             operators: [
                //                 'greater',
                //                 'greater_or_equal',
                //                 'less',
                //                 'less_or_equal',
                //                 'equal',
                //                 'not_equal',
                //                 'date_range',
                //             ],
                //         },
                //         currency: {
                //             label: 'Currency',
                //             type: 'select',
                //             valueSources: ['value'],
                //             operators: ['select_equals'],
                //             listValues: [
                //                 {value: '1', title: 'Male'},
                //                 {value: '0', title: 'Female'},
                //                 {value: '-1', title: 'Not Set'},
                //             ],
                //         },
                //     },
                // },
                // lastDepositDate: {
                //     label: 'Last deposit date',
                //     type: '!group',
                //     subfields: {
                //         value: {
                //             label: 'Date',
                //             type: 'date',
                //             valueSources: ['value'],
                //             operators: [
                //                 'greater',
                //                 'greater_or_equal',
                //                 'less',
                //                 'less_or_equal',
                //                 'equal',
                //                 'not_equal',
                //                 'date_range',
                //             ],
                //         },
                //         currency: {
                //             label: 'Currency',
                //             type: 'select',
                //             valueSources: ['value'],
                //             operators: ['select_equals'],
                //             listValues: [
                //                 {value: '1', title: 'Male'},
                //                 {value: '0', title: 'Female'},
                //                 {value: '-1', title: 'Not Set'},
                //             ],
                //         },
                //     },
                // },
                // firstDepositPaymentMethod: {
                //     label: 'First deposit payment Method',
                //     type: '!group',
                //     subfields: {
                //         value: {
                //             label: 'Payment method',
                //             type: 'select',
                //             valueSources: ['value'],
                //             operators: [
                //                 'select_equals',
                //                 'select_not_equals',
                //                 'select_any_in',
                //                 'select_not_any_in',
                //             ],
                //             listValues: [
                //                 {value: '1', title: 'Male'},
                //                 {value: '0', title: 'Female'},
                //                 {value: '-1', title: 'Not Set'},
                //             ],
                //         },
                //         currency: {
                //             label: 'Currency',
                //             type: 'select',
                //             operators: ['select_equals'],
                //             valueSources: ['value'],
                //             listValues: [
                //                 {value: '1', title: 'Male'},
                //                 {value: '0', title: 'Female'},
                //                 {value: '-1', title: 'Not Set'},
                //             ],
                //         },
                //         period: {
                //             label: 'Period',
                //             type: 'select',
                //             valueSources: ['value'],
                //             listValues: [
                //                 {value: 'all_time', title: 'All time'},
                //                 {value: 'last_month', title: 'Last month'},
                //                 {value: 'current_month', title: 'Current month'},
                //                 {value: 'since_last_deposit', title: 'Since last deposit'},
                //                 {
                //                     value: 'since_last_withdrawal',
                //                     title: 'Since last withdrawal',
                //                 },
                //             ],
                //         },
                //         range: {
                //             label: 'Period Range',
                //             type: 'date',
                //             valueSources: ['value'],
                //             operators: ['date_range'],
                //         },
                //     },
                // },
                // lastDepositPaymentMethod: {
                //     label: 'Last deposit payment Method',
                //     type: '!group',
                //     subfields: {
                //         value: {
                //             label: 'Payment method',
                //             type: 'select',
                //             valueSources: ['value'],
                //             listValues: [
                //                 {value: '1', title: 'Male'},
                //                 {value: '0', title: 'Female'},
                //                 {value: '-1', title: 'Not Set'},
                //             ],
                //             operators: [
                //                 'select_equals',
                //                 'select_not_equals',
                //                 'select_any_in',
                //                 'select_not_any_in',
                //             ],
                //         },
                //         currency: {
                //             label: 'Currency',
                //             type: 'select',
                //             valueSources: ['value'],
                //             operators: ['select_equals'],
                //             listValues: [
                //                 {value: '1', title: 'Male'},
                //                 {value: '0', title: 'Female'},
                //                 {value: '-1', title: 'Not Set'},
                //             ],
                //         },
                //         period: {
                //             label: 'Period',
                //             type: 'select',
                //             valueSources: ['value'],
                //             listValues: [
                //                 {value: 'all_time', title: 'All time'},
                //                 {value: 'last_month', title: 'Last month'},
                //                 {value: 'current_month', title: 'Current month'},
                //                 {value: 'since_last_deposit', title: 'Since last deposit'},
                //                 {
                //                     value: 'since_last_withdrawal',
                //                     title: 'Since last withdrawal',
                //                 },
                //             ],
                //         },
                //         range: {
                //             label: 'Period Range',
                //             type: 'date',
                //             valueSources: ['value'],
                //             operators: ['date_range'],
                //         },
                //     },
                // },
                // firstDepositPaymentSystem: {
                //     label: 'First deposit payment system',
                //     type: '!group',
                //     subfields: {
                //         value: {
                //             label: 'Payment System',
                //             type: 'select',
                //             valueSources: ['value'],
                //             listValues: [
                //                 {value: '1', title: 'Male'},
                //                 {value: '0', title: 'Female'},
                //                 {value: '-1', title: 'Not Set'},
                //             ],
                //             operators: [
                //                 'select_equals',
                //                 'select_not_equals',
                //                 'select_any_in',
                //                 'select_not_any_in',
                //             ],
                //         },
                //         currency: {
                //             label: 'Currency',
                //             type: 'select',
                //             valueSources: ['value'],
                //             operators: ['select_equals'],
                //             listValues: [
                //                 {value: '1', title: 'Male'},
                //                 {value: '0', title: 'Female'},
                //                 {value: '-1', title: 'Not Set'},
                //             ],
                //         },
                //         period: {
                //             label: 'Period',
                //             type: 'select',
                //             valueSources: ['value'],
                //             listValues: [
                //                 {value: 'all_time', title: 'All time'},
                //                 {value: 'last_month', title: 'Last month'},
                //                 {value: 'current_month', title: 'Current month'},
                //                 {value: 'since_last_deposit', title: 'Since last deposit'},
                //                 {
                //                     value: 'since_last_withdrawal',
                //                     title: 'Since last withdrawal',
                //                 },
                //             ],
                //         },
                //         range: {
                //             label: 'Period Range',
                //             type: 'date',
                //             valueSources: ['value'],
                //             operators: ['date_range'],
                //         },
                //     },
                // },
                // lastDepositPaymentSystem: {
                //     label: 'Last deposit payment system',
                //     type: '!group',
                //     subfields: {
                //         value: {
                //             label: 'Payment System',
                //             type: 'select',
                //             valueSources: ['value'],
                //             listValues: [
                //                 {value: '1', title: 'Male'},
                //                 {value: '0', title: 'Female'},
                //                 {value: '-1', title: 'Not Set'},
                //             ],
                //             operators: [
                //                 'select_equals',
                //                 'select_not_equals',
                //                 'select_any_in',
                //                 'select_not_any_in',
                //             ],
                //         },
                //         currency: {
                //             label: 'Currency',
                //             type: 'select',
                //             valueSources: ['value'],
                //             operators: ['select_equals'],
                //             listValues: [
                //                 {value: '1', title: 'Male'},
                //                 {value: '0', title: 'Female'},
                //                 {value: '-1', title: 'Not Set'},
                //             ],
                //         },
                //         period: {
                //             label: 'Period',
                //             type: 'select',
                //             valueSources: ['value'],
                //             listValues: [
                //                 {value: 'all_time', title: 'All time'},
                //                 {value: 'last_month', title: 'Last month'},
                //                 {value: 'current_month', title: 'Current month'},
                //                 {value: 'since_last_deposit', title: 'Since last deposit'},
                //                 {
                //                     value: 'since_last_withdrawal',
                //                     title: 'Since last withdrawal',
                //                 },
                //             ],
                //         },
                //         range: {
                //             label: 'Period Range',
                //             type: 'date',
                //             valueSources: ['value'],
                //             operators: ['date_range'],
                //         },
                //     },
                // },
                // lastDepositAmount: {
                //     label: 'Last deposit amount',
                //     type: '!group',
                //     subfields: {
                //         value: {
                //             label: 'Amount',
                //             type: 'number',
                //             valueSources: ['value'],
                //             operators: [
                //                 'greater',
                //                 'greater_or_equal',
                //                 'less',
                //                 'less_or_equal',
                //                 'equal',
                //                 'not_equal',
                //                 'between',
                //             ],
                //             fieldSettings: {
                //                 min: 0,
                //                 max: 999999999999999999,
                //             },
                //             mainWidgetProps: {
                //                 valueLabel: 'Amount',
                //                 validateValue: (val, fieldDef, flag, valueArr, operator) => {
                //                     if (val === undefined && flag) {
                //                         return "No value entered"
                //                     }
                //                     const regex =  /^\$?(?!0.00)(([0-9]{1,3},([0-9]{3},)*)[0-9]{3}|[0-9]{1,19})(\.[0-9]{0,3}[^-_.])?$/g;
                //                     const validRegex = regex.test(val);
                //
                //                     if (valueArr && val !== undefined) {
                //                         if(valueArr[0] > valueArr[1] || valueArr[0] === valueArr[1]) {
                //                             return "Value 'from' must be less than 'till'"
                //                         }
                //                     } else if (!validRegex && val !== undefined) {
                //                         return  "Invalid format"
                //                     } else if (operator === 'less' && val <= 0 && val !== undefined ) {
                //                         return "Value must be greater than 0 "
                //                     }
                //                     return true;
                //                 },
                //             },
                //         },
                //         currency: {
                //             label: 'Currency',
                //             type: 'select',
                //             valueSources: ['value'],
                //             operators: ['select_equals'],
                //             listValues: [
                //                 {value: '1', title: 'Male'},
                //                 {value: '0', title: 'Female'},
                //                 {value: '-1', title: 'Not Set'},
                //             ],
                //         },
                //         period: {
                //             label: 'Period',
                //             type: 'select',
                //             valueSources: ['value'],
                //             listValues: [
                //                 {value: 'all_time', title: 'All time'},
                //                 {value: 'last_month', title: 'Last month'},
                //                 {value: 'current_month', title: 'Current month'},
                //                 {value: 'since_last_deposit', title: 'Since last deposit'},
                //                 {
                //                     value: 'since_last_withdrawal',
                //                     title: 'Since last withdrawal',
                //                 },
                //             ],
                //         },
                //         range: {
                //             label: 'Period Range',
                //             type: 'date',
                //             valueSources: ['value'],
                //             operators: ['date_range'],
                //         },
                //     },
                // },
                withdrawalsAmount: {
                    label: 'Withdrawal sum',
                    type: '!group',
                    subfields: {
                        value: {
                            label: 'Amount (Required)',
                            type: 'number',
                            valueSources: ['value'],
                            operators: [
                                'greater',
                                'greater_or_equal',
                                'less',
                                'less_or_equal',
                                'equal',
                                'not_equal',
                                'date_range',
                            ],
                            defaultOperator: 'equal',
                            fieldSettings: {
                                min: 0,
                                max: 999999999999999999,
                            },
                            mainWidgetProps: {
                                valueLabel: 'Amount',
                                validateValue: (val, fieldDef, flag, valueArr, operator) => {
                                    // if (val === undefined && flag) {
                                    //   return 'No value entered';
                                    // }
                                    const regex = /^\$?(?!0.00)(([0-9]{1,3},([0-9]{3},)*)[0-9]{3}|[0-9]{1,19})(\.[0-9]{0,3}[^-_.])?$/g;
                                    const validRegex = regex.test(val);

                                    if (valueArr && val !== undefined) {
                                        if (
                                            valueArr[0] > valueArr[1] ||
                                            valueArr[0] === valueArr[1]
                                        ) {
                                            return "Value 'from' must be less than 'till'";
                                        }
                                    } else if (!validRegex && val !== undefined) {
                                        return 'Invalid format';
                                    } else if (
                                        operator === 'less' &&
                                        val <= 0 &&
                                        val !== undefined
                                    ) {
                                        return 'Value must be greater than 0 ';
                                    }
                                    return false;
                                },
                            },
                        },
                        currency: {
                            label: 'Currency (Required)',
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
                        // paymentSystem: {
                        //     label: 'Payment System',
                        //     type: 'select',
                        //     valueSources: ['value'],
                        //     operators: ['select_equals'],
                        //     listValues: [
                        //         {value: '1', title: 'Male'},
                        //         {value: '0', title: 'Female'},
                        //         {value: '-1', title: 'Not Set'},
                        //     ],
                        // },
                        // paymentMethod: {
                        //     label: 'Payment Method',
                        //     type: 'select',
                        //     valueSources: ['value'],
                        //     operators: ['select_equals'],
                        //     listValues: [
                        //         {value: '1', title: 'Male'},
                        //         {value: '0', title: 'Female'},
                        //         {value: '-1', title: 'Not Set'},
                        //     ],
                        // },
                        // withdrawalStatus: {
                        //     label: 'Withdrawal Status',
                        //     type: 'select',
                        //     valueSources: ['value'],
                        //     operators: ['select_equals'],
                        //     listValues: [
                        //         {value: '1', title: 'Male'},
                        //         {value: '0', title: 'Female'},
                        //         {value: '-1', title: 'Not Set'},
                        //     ],
                        // },
                        range: {
                            label: 'Period Range',
                            type: 'date',
                            valueSources: ['value'],
                            operators: ['date_range'],
                        },
                    },
                },
                // firstWithdrawalAmount: {
                //     label: 'First withdrawal amount',
                //     type: '!group',
                //     subfields: {
                //         value: {
                //             label: 'Amount',
                //             type: 'number',
                //             valueSources: ['value'],
                //             operators: [
                //                 'greater',
                //                 'greater_or_equal',
                //                 'less',
                //                 'less_or_equal',
                //                 'equal',
                //                 'not_equal',
                //                 'between',
                //             ],
                //             fieldSettings: {
                //                 min: 0,
                //                 max: 999999999999999999,
                //             },
                //             mainWidgetProps: {
                //                 valueLabel: 'Amount',
                //                 validateValue: (val, fieldDef, flag, valueArr, operator) => {
                //                     if (val === undefined && flag) {
                //                         return "No value entered"
                //                     }
                //                     const regex =  /^\$?(?!0.00)(([0-9]{1,3},([0-9]{3},)*)[0-9]{3}|[0-9]{1,19})(\.[0-9]{0,3}[^-_.])?$/g;
                //                     const validRegex = regex.test(val);
                //
                //                     if (valueArr && val !== undefined) {
                //                         if(valueArr[0] > valueArr[1] || valueArr[0] === valueArr[1]) {
                //                             return "Value 'from' must be less than 'till'"
                //                         }
                //                     } else if (!validRegex && val !== undefined) {
                //                         return  "Invalid format"
                //                     } else if (operator === 'less' && val <= 0 && val !== undefined ) {
                //                         return "Value must be greater than 0 "
                //                     }
                //                     return true;
                //                 },
                //             },
                //         },
                //         currency: {
                //             label: 'Currency',
                //             type: 'select',
                //             valueSources: ['value'],
                //             operators: ['select_equals'],
                //             listValues: [
                //                 {value: '1', title: 'Male'},
                //                 {value: '0', title: 'Female'},
                //                 {value: '-1', title: 'Not Set'},
                //             ],
                //         },
                //         period: {
                //             label: 'Period',
                //             type: 'select',
                //             valueSources: ['value'],
                //             operators: ['select_equals'],
                //             listValues: [
                //                 {value: 'all_time', title: 'All time'},
                //                 {value: 'last_month', title: 'Last month'},
                //                 {value: 'current_month', title: 'Current month'},
                //                 {value: 'since_last_deposit', title: 'Since last deposit'},
                //                 {
                //                     value: 'since_last_withdrawal',
                //                     title: 'Since last withdrawal',
                //                 },
                //             ],
                //         },
                //         range: {
                //             label: 'Period Range',
                //             type: 'date',
                //             valueSources: ['value'],
                //             operators: ['date_range'],
                //         },
                //     },
                // },
                // lastWithdrawalAmount: {
                //     label: 'Last withdrawal amount',
                //     type: '!group',
                //     subfields: {
                //         value: {
                //             label: 'Amount',
                //             type: 'number',
                //             valueSources: ['value'],
                //             operators: [
                //                 'greater',
                //                 'greater_or_equal',
                //                 'less',
                //                 'less_or_equal',
                //                 'equal',
                //                 'not_equal',
                //                 'between',
                //             ],
                //             fieldSettings: {
                //                 min: 0,
                //                 max: 999999999999999999,
                //             },
                //             mainWidgetProps: {
                //                 valueLabel: 'Amount',
                //                 validateValue: (val, fieldDef, flag, valueArr, operator) => {
                //                     if (val === undefined && flag) {
                //                         return "No value entered"
                //                     }
                //                     const regex =  /^\$?(?!0.00)(([0-9]{1,3},([0-9]{3},)*)[0-9]{3}|[0-9]{1,19})(\.[0-9]{0,3}[^-_.])?$/g;
                //                     const validRegex = regex.test(val);
                //
                //                     if (valueArr && val !== undefined) {
                //                         if(valueArr[0] > valueArr[1] || valueArr[0] === valueArr[1]) {
                //                             return "Value 'from' must be less than 'till'"
                //                         }
                //                     } else if (!validRegex && val !== undefined) {
                //                         return  "Invalid format"
                //                     } else if (operator === 'less' && val <= 0 && val !== undefined ) {
                //                         return "Value must be greater than 0 "
                //                     }
                //                     return true;
                //                 },
                //             },
                //         },
                //         currency: {
                //             label: 'Currency',
                //             type: 'select',
                //             valueSources: ['value'],
                //             operators: ['select_equals'],
                //             listValues: [
                //                 {value: '1', title: 'Male'},
                //                 {value: '0', title: 'Female'},
                //                 {value: '-1', title: 'Not Set'},
                //             ],
                //         },
                //         period: {
                //             label: 'Period',
                //             type: 'select',
                //             valueSources: ['value'],
                //             operators: ['select_equals'],
                //             listValues: [
                //                 {value: 'all_time', title: 'All time'},
                //                 {value: 'last_month', title: 'Last month'},
                //                 {value: 'current_month', title: 'Current month'},
                //                 {value: 'since_last_deposit', title: 'Since last deposit'},
                //                 {
                //                     value: 'since_last_withdrawal',
                //                     title: 'Since last withdrawal',
                //                 },
                //             ],
                //         },
                //         range: {
                //             label: 'Period Range',
                //             type: 'date',
                //             valueSources: ['value'],
                //             operators: ['date_range'],
                //         },
                //     },
                // },
                // firstWithdrawalDate: {
                //     label: 'First withdrawal date',
                //     type: '!group',
                //     subfields: {
                //         value: {
                //             label: 'Date',
                //             type: 'date',
                //             valueSources: ['value'],
                //             operators: [
                //                 'greater',
                //                 'greater_or_equal',
                //                 'less',
                //                 'less_or_equal',
                //                 'equal',
                //                 'not_equal',
                //                 'date_range',
                //             ],
                //         },
                //         currency: {
                //             label: 'Currency',
                //             type: 'select',
                //             valueSources: ['value'],
                //             operators: ['select_equals'],
                //             listValues: [
                //                 {value: '1', title: 'Male'},
                //                 {value: '0', title: 'Female'},
                //                 {value: '-1', title: 'Not Set'},
                //             ],
                //         },
                //     },
                // },
                // lastWithdrawalDate: {
                //     label: 'Last withdrawal date',
                //     type: '!group',
                //     subfields: {
                //         value: {
                //             label: 'Date',
                //             type: 'date',
                //             valueSources: ['value'],
                //             operators: [
                //                 'greater',
                //                 'greater_or_equal',
                //                 'less',
                //                 'less_or_equal',
                //                 'equal',
                //                 'not_equal',
                //                 'date_range',
                //             ],
                //         },
                //         currency: {
                //             label: 'Currency',
                //             type: 'select',
                //             valueSources: ['value'],
                //             operators: ['select_equals'],
                //             listValues: [
                //                 {value: '1', title: 'Male'},
                //                 {value: '0', title: 'Female'},
                //                 {value: '-1', title: 'Not Set'},
                //             ],
                //         },
                //     },
                // },
                // firstWithdrawalPaymentSystem: {
                //     label: 'First withdrawal payment system',
                //     type: '!group',
                //     subfields: {
                //         value: {
                //             label: 'Payment System',
                //             type: 'select',
                //             operators: [
                //                 'select_equals',
                //                 'select_not_equals',
                //                 'select_any_in',
                //                 'select_not_any_in',
                //             ],
                //             valueSources: ['value'],
                //             listValues: [
                //                 {value: '1', title: 'Male'},
                //                 {value: '0', title: 'Female'},
                //                 {value: '-1', title: 'Not Set'},
                //             ],
                //         },
                //         currency: {
                //             label: 'Currency',
                //             type: 'select',
                //             valueSources: ['value'],
                //             operators: ['select_equals'],
                //             listValues: [
                //                 {value: '1', title: 'Male'},
                //                 {value: '0', title: 'Female'},
                //                 {value: '-1', title: 'Not Set'},
                //             ],
                //         },
                //         period: {
                //             label: 'Period',
                //             type: 'select',
                //             valueSources: ['value'],
                //             operators: ['select_equals'],
                //             listValues: [
                //                 {value: 'all_time', title: 'All time'},
                //                 {value: 'last_month', title: 'Last month'},
                //                 {value: 'current_month', title: 'Current month'},
                //                 {value: 'since_last_deposit', title: 'Since last deposit'},
                //                 {
                //                     value: 'since_last_withdrawal',
                //                     title: 'Since last withdrawal',
                //                 },
                //             ],
                //         },
                //         range: {
                //             label: 'Period Range',
                //             type: 'date',
                //             valueSources: ['value'],
                //             operators: ['date_range'],
                //         },
                //     },
                // },
                // lastWithdrawalPaymentSystem: {
                //     label: 'Last withdrawal payment system',
                //     type: '!group',
                //     subfields: {
                //         value: {
                //             label: 'Payment System',
                //             type: 'select',
                //             valueSources: ['value'],
                //             operators: [
                //                 'select_equals',
                //                 'select_not_equals',
                //                 'select_any_in',
                //                 'select_not_any_in',
                //             ],
                //             listValues: [
                //                 {value: '1', title: 'Male'},
                //                 {value: '0', title: 'Female'},
                //                 {value: '-1', title: 'Not Set'},
                //             ],
                //         },
                //         currency: {
                //             label: 'Currency',
                //             type: 'select',
                //             valueSources: ['value'],
                //             operators: ['select_equals'],
                //             listValues: [
                //                 {value: '1', title: 'Male'},
                //                 {value: '0', title: 'Female'},
                //                 {value: '-1', title: 'Not Set'},
                //             ],
                //         },
                //         period: {
                //             label: 'Period',
                //             type: 'select',
                //             valueSources: ['value'],
                //             operators: ['select_equals'],
                //             listValues: [
                //                 {value: 'all_time', title: 'All time'},
                //                 {value: 'last_month', title: 'Last month'},
                //                 {value: 'current_month', title: 'Current month'},
                //                 {value: 'since_last_deposit', title: 'Since last deposit'},
                //                 {
                //                     value: 'since_last_withdrawal',
                //                     title: 'Since last withdrawal',
                //                 },
                //             ],
                //         },
                //         range: {
                //             label: 'Period Range',
                //             type: 'date',
                //             valueSources: ['value'],
                //             operators: ['date_range'],
                //         },
                //     },
                // },
                // firstWithdrawalPaymentMethod: {
                //     label: 'First withdrawal payment Method',
                //     type: '!group',
                //     subfields: {
                //         value: {
                //             label: 'Payment Method',
                //             type: 'select',
                //             valueSources: ['value'],
                //             operators: [
                //                 'select_equals',
                //                 'select_not_equals',
                //                 'select_any_in',
                //                 'select_not_any_in',
                //             ],
                //             listValues: [
                //                 {value: '1', title: 'Male'},
                //                 {value: '0', title: 'Female'},
                //                 {value: '-1', title: 'Not Set'},
                //             ],
                //         },
                //         currency: {
                //             label: 'Currency',
                //             type: 'select',
                //             valueSources: ['value'],
                //             operators: ['select_equals'],
                //             listValues: [
                //                 {value: '1', title: 'Male'},
                //                 {value: '0', title: 'Female'},
                //                 {value: '-1', title: 'Not Set'},
                //             ],
                //         },
                //         period: {
                //             label: 'Period',
                //             type: 'select',
                //             valueSources: ['value'],
                //             operators: ['select_equals'],
                //             listValues: [
                //                 {value: 'all_time', title: 'All time'},
                //                 {value: 'last_month', title: 'Last month'},
                //                 {value: 'current_month', title: 'Current month'},
                //                 {value: 'since_last_deposit', title: 'Since last deposit'},
                //                 {
                //                     value: 'since_last_withdrawal',
                //                     title: 'Since last withdrawal',
                //                 },
                //             ],
                //         },
                //         range: {
                //             label: 'Period Range',
                //             type: 'date',
                //             valueSources: ['value'],
                //             operators: ['date_range'],
                //         },
                //     },
                // },
                // lastWithdrawalPaymentMethod: {
                //     label: 'Last withdrawal payment Method',
                //     type: '!group',
                //     subfields: {
                //         value: {
                //             label: 'Payment Method',
                //             type: 'select',
                //             valueSources: ['value'],
                //             operators: [
                //                 'select_equals',
                //                 'select_not_equals',
                //                 'select_any_in',
                //                 'select_not_any_in',
                //             ],
                //             listValues: [
                //                 {value: '1', title: 'Male'},
                //                 {value: '0', title: 'Female'},
                //                 {value: '-1', title: 'Not Set'},
                //             ],
                //         },
                //         currency: {
                //             label: 'Currency',
                //             type: 'select',
                //             valueSources: ['value'],
                //             operators: ['select_equals'],
                //             listValues: [
                //                 {value: '1', title: 'Male'},
                //                 {value: '0', title: 'Female'},
                //                 {value: '-1', title: 'Not Set'},
                //             ],
                //         },
                //         period: {
                //             label: 'Period',
                //             type: 'select',
                //             valueSources: ['value'],
                //             operators: ['select_equals'],
                //             listValues: [
                //                 {value: 'all_time', title: 'All time'},
                //                 {value: 'last_month', title: 'Last month'},
                //                 {value: 'current_month', title: 'Current month'},
                //                 {value: 'since_last_deposit', title: 'Since last deposit'},
                //                 {
                //                     value: 'since_last_withdrawal',
                //                     title: 'Since last withdrawal',
                //                 },
                //             ],
                //         },
                //         range: {
                //             label: 'Period Range',
                //             type: 'date',
                //             valueSources: ['value'],
                //             operators: ['between'],
                //         },
                //     },
                // },
                withdrawalsCount: {
                    label: 'Withdrawal count',
                    type: '!group',
                    subfields: {
                        value: {
                            label: 'Amount (Required)',
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
                            defaultOperator: 'equal',
                            fieldSettings: {
                                min: 0,
                                max: 999999999999999999,
                            },
                            mainWidgetProps: {
                                valueLabel: 'Amount',
                                validateValue: (val, fieldDef, flag, valueArr, operator) => {
                                    // if (val === undefined && flag) {
                                    //   return 'No value entered';
                                    // }
                                    const regex = /^\$?(?!0.00)(([0-9]{1,3},([0-9]{3},)*)[0-9]{3}|[0-9]{1,19})(\.[0-9]{0,3}[^-_.])?$/g;
                                    const validRegex = regex.test(val);

                                    if (valueArr && val !== undefined) {
                                        if (
                                            valueArr[0] > valueArr[1] ||
                                            valueArr[0] === valueArr[1]
                                        ) {
                                            return "Value 'from' must be less than 'till'";
                                        }
                                    } else if (!validRegex && val !== undefined) {
                                        return 'Invalid format';
                                    } else if (
                                        operator === 'less' &&
                                        val <= 0 &&
                                        val !== undefined
                                    ) {
                                        return 'Value must be greater than 0 ';
                                    }
                                    return false;
                                },
                            },
                        },
                        currency: {
                            label: 'Currency (Required)',
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
                        // paymentSystem: {
                        //     label: 'Payment System',
                        //     type: 'select',
                        //     valueSources: ['value'],
                        //     operators: ['select_equals'],
                        //     listValues: [
                        //         {value: '1', title: 'Male'},
                        //         {value: '0', title: 'Female'},
                        //         {value: '-1', title: 'Not Set'},
                        //     ],
                        // },
                        // paymentMethod: {
                        //     label: 'Payment Method',
                        //     type: 'select',
                        //     valueSources: ['value'],
                        //     operators: ['select_equals'],
                        //     listValues: [
                        //         {value: '1', title: 'Male'},
                        //         {value: '0', title: 'Female'},
                        //         {value: '-1', title: 'Not Set'},
                        //     ],
                        // },
                        // withdrawalStatus: {
                        //     label: 'Withdrawal Status',
                        //     type: 'select',
                        //     valueSources: ['value'],
                        //     operators: ['select_equals'],
                        //     listValues: [
                        //         {value: '1', title: 'Male'},
                        //         {value: '0', title: 'Female'},
                        //         {value: '-1', title: 'Not Set'},
                        //     ],
                        // },
                        range: {
                            label: 'Period Range',
                            type: 'date',
                            valueSources: ['value'],
                            operators: ['date_range'],
                        },
                    },
                },
                withdrawalsAvg: {
                    label: 'Withdrawal average',
                    type: '!group',
                    subfields: {
                        value: {
                            label: 'Amount (Required)',
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
                            defaultOperator: 'equal',
                            fieldSettings: {
                                min: 0,
                                max: 999999999999999999,
                            },
                            mainWidgetProps: {
                                valueLabel: 'Withdrawal average',
                                validateValue: (val, fieldDef, flag, valueArr, operator) => {
                                    // if (val === undefined && flag) {
                                    //   return 'No value entered';
                                    // }
                                    const regex = /^\$?(?!0.00)(([0-9]{1,3},([0-9]{3},)*)[0-9]{3}|[0-9]{1,19})(\.[0-9]{0,3}[^-_.])?$/g;
                                    const validRegex = regex.test(val);

                                    if (valueArr && val !== undefined) {
                                        if (
                                            valueArr[0] > valueArr[1] ||
                                            valueArr[0] === valueArr[1]
                                        ) {
                                            return "Value 'from' must be less than 'till'";
                                        }
                                    } else if (!validRegex && val !== undefined) {
                                        return 'Invalid format';
                                    } else if (
                                        operator === 'less' &&
                                        val <= 0 &&
                                        val !== undefined
                                    ) {
                                        return 'Value must be greater than 0 ';
                                    }
                                    return false;
                                },
                            },
                        },
                        currency: {
                            label: 'Currency (Required)',
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
                        // paymentSystem: {
                        //     label: 'Payment System',
                        //     type: 'select',
                        //     valueSources: ['value'],
                        //     operators: ['select_equals'],
                        //     listValues: [
                        //         {value: '1', title: 'Male'},
                        //         {value: '0', title: 'Female'},
                        //         {value: '-1', title: 'Not Set'},
                        //     ],
                        // },
                        // paymentMethod: {
                        //     label: 'Payment Method',
                        //     type: 'select',
                        //     valueSources: ['value'],
                        //     operators: ['select_equals'],
                        //     listValues: [
                        //         {value: '1', title: 'Male'},
                        //         {value: '0', title: 'Female'},
                        //         {value: '-1', title: 'Not Set'},
                        //     ],
                        // },
                        // withdrawalStatus: {
                        //     label: 'Withdrawal Status',
                        //     type: 'select',
                        //     valueSources: ['value'],
                        //     operators: ['select_equals'],
                        //     listValues: [
                        //         {value: '1', title: 'Male'},
                        //         {value: '0', title: 'Female'},
                        //         {value: '-1', title: 'Not Set'},
                        //     ],
                        // },
                        range: {
                            label: 'Period Range',
                            type: 'date',
                            valueSources: ['value'],
                            operators: ['date_range'],
                        },
                    },
                },
                // accountValue: {
                //     label: 'Account value',
                //     type: '!group',
                //     subfields: {
                //         value: {
                //             label: 'Amount',
                //             type: 'number',
                //             valueSources: ['value'],
                //             operators: [
                //                 'greater',
                //                 'greater_or_equal',
                //                 'less',
                //                 'less_or_equal',
                //                 'equal',
                //                 'not_equal',
                //                 'between',
                //             ],
                //             fieldSettings: {
                //                 min: 0,
                //                 max: 999999999999999999,
                //             },
                //             mainWidgetProps: {
                //                 valueLabel: 'Account value',
                //                 validateValue: (val, fieldDef, flag, valueArr, operator) => {
                //                     if (val === undefined && flag) {
                //                         return "No value entered"
                //                     }
                //                     const regex =  /^\$?(?!0.00)(([0-9]{1,3},([0-9]{3},)*)[0-9]{3}|[0-9]{1,19})(\.[0-9]{0,3}[^-_.])?$/g;
                //                     const validRegex = regex.test(val);
                //
                //                     if (valueArr && val !== undefined) {
                //                         if(valueArr[0] > valueArr[1] || valueArr[0] === valueArr[1]) {
                //                             return "Value 'from' must be less than 'till'"
                //                         }
                //                     } else if (!validRegex && val !== undefined) {
                //                         return  "Invalid format"
                //                     } else if (operator === 'less' && val <= 0 && val !== undefined ) {
                //                         return "Value must be greater than 0 "
                //                     }
                //                     return true;
                //                 },
                //             },
                //         },
                //         currency: {
                //             label: 'Currency',
                //             type: 'select',
                //             valueSources: ['value'],
                //             operators: ['select_equals'],
                //             listValues: [
                //                 {value: '1', title: 'Male'},
                //                 {value: '0', title: 'Female'},
                //                 {value: '-1', title: 'Not Set'},
                //             ],
                //         },
                //         period: {
                //             label: 'Period',
                //             type: 'select',
                //             valueSources: ['value'],
                //             operators: ['select_equals'],
                //             listValues: [
                //                 {value: 'all_time', title: 'All time'},
                //                 {value: 'last_month', title: 'Last month'},
                //                 {value: 'current_month', title: 'Current month'},
                //                 {value: 'since_last_deposit', title: 'Since last deposit'},
                //                 {
                //                     value: 'since_last_withdrawal',
                //                     title: 'Since last withdrawal',
                //                 },
                //             ],
                //         },
                //         range: {
                //             label: 'Period Range',
                //             type: 'date',
                //             valueSources: ['value'],
                //             operators: ['date_range'],
                //         },
                //     },
                // },
                // accountLifetimeValue: {
                //     label: 'Account lifetime value',
                //     type: '!group',
                //     subfields: {
                //         value: {
                //             label: 'Amount',
                //             type: 'number',
                //             valueSources: ['value'],
                //             operators: [
                //                 'greater',
                //                 'greater_or_equal',
                //                 'less',
                //                 'less_or_equal',
                //                 'equal',
                //                 'not_equal',
                //                 'between',
                //             ],
                //             fieldSettings: {
                //                 min: 0,
                //                 max: 999999999999999999,
                //             },
                //             mainWidgetProps: {
                //                 valueLabel: 'Account lifetime value',
                //                 validateValue: (val, fieldDef, flag, valueArr, operator) => {
                //                     if (val === undefined && flag) {
                //                         return "No value entered"
                //                     }
                //                     const regex =  /^\$?(?!0.00)(([0-9]{1,3},([0-9]{3},)*)[0-9]{3}|[0-9]{1,19})(\.[0-9]{0,3}[^-_.])?$/g;
                //                     const validRegex = regex.test(val);
                //
                //                     if (valueArr && val !== undefined) {
                //                         if(valueArr[0] > valueArr[1] || valueArr[0] === valueArr[1]) {
                //                             return "Value 'from' must be less than 'till'"
                //                         }
                //                     } else if (!validRegex && val !== undefined) {
                //                         return  "Invalid format"
                //                     } else if (operator === 'less' && val <= 0 && val !== undefined ) {
                //                         return "Value must be greater than 0 "
                //                     }
                //                     return true;
                //                 },
                //             },
                //         },
                //         currency: {
                //             label: 'Currency',
                //             type: 'select',
                //             valueSources: ['value'],
                //             operators: ['select_equals'],
                //             listValues: [
                //                 {value: '1', title: 'Male'},
                //                 {value: '0', title: 'Female'},
                //                 {value: '-1', title: 'Not Set'},
                //             ],
                //         },
                //         period: {
                //             label: 'Period',
                //             type: 'select',
                //             valueSources: ['value'],
                //             operators: ['select_equals'],
                //             listValues: [
                //                 {value: 'all_time', title: 'All time'},
                //                 {value: 'last_month', title: 'Last month'},
                //                 {value: 'current_month', title: 'Current month'},
                //                 {value: 'since_last_deposit', title: 'Since last deposit'},
                //                 {
                //                     value: 'since_last_withdrawal',
                //                     title: 'Since last withdrawal',
                //                 },
                //             ],
                //         },
                //         range: {
                //             label: 'Period Range',
                //             type: 'date',
                //             valueSources: ['value'],
                //             operators: ['date_range'],
                //         },
                //     },
                // },

                revenue: {
                    label: 'Revenue',
                    type: '!group',
                    subfields: {
                        value: {
                            label: 'Amount (Required)',
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
                            defaultOperator: 'equal',
                            fieldSettings: {
                                min: 0,
                                max: 999999999999999999,
                            },
                            mainWidgetProps: {
                                valueLabel: 'Revenue',
                                validateValue: (val, fieldDef, flag, valueArr, operator) => {
                                    // if (val === undefined && flag) {
                                    //   return 'No value entered';
                                    // }
                                    const regex = /^\$?(?!0.00)(([0-9]{1,3},([0-9]{3},)*)[0-9]{3}|[0-9]{1,19})(\.[0-9]{0,3}[^-_.])?$/g;
                                    const validRegex = regex.test(val);

                                    if (valueArr && val !== undefined) {
                                        if (
                                            valueArr[0] > valueArr[1] ||
                                            valueArr[0] === valueArr[1]
                                        ) {
                                            return "Value 'from' must be less than 'till'";
                                        }
                                    } else if (!validRegex && val !== undefined) {
                                        return 'Invalid format';
                                    } else if (
                                        operator === 'less' &&
                                        val <= 0 &&
                                        val !== undefined
                                    ) {
                                        return 'Value must be greater than 0 ';
                                    }
                                    return false;
                                },
                            },
                        },
                        currency: {
                            label: 'Currency (Required)',
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
                            operators: ['date_range'],
                        },
                    },
                },
                hold: {
                    label: 'Hold',
                    type: '!group',
                    subfields: {
                        value: {
                            label: 'Amount (Required)',
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
                            defaultOperator: 'equal',
                            fieldSettings: {
                                min: 0,
                                max: 100,
                            },
                            mainWidgetProps: {
                                valueLabel: 'Hold',
                                validateValue: (val, fieldDef, flag, valueArr, operator) => {
                                    // if (val === undefined && flag) {
                                    //   return 'No value entered';
                                    // }
                                    const regex = /^\$?(?!0.00)(([0-9]{1,3},([0-9]{3},)*)[0-9]{3}|[0-9]{1,19})(\.[0-9]{0,3}[^-_.])?$/g;
                                    const validRegex = regex.test(val);

                                    if (valueArr && val !== undefined) {
                                        if (
                                            valueArr[0] > valueArr[1] ||
                                            valueArr[0] === valueArr[1]
                                        ) {
                                            return "Value 'from' must be less than 'till'";
                                        }
                                    } else if (!validRegex && val !== undefined) {
                                        return 'Invalid format';
                                    } else if (
                                        operator === 'less' &&
                                        val <= 0 &&
                                        val !== undefined
                                    ) {
                                        return 'Value must be greater than 0 ';
                                    }
                                    return false;
                                },
                            },
                        },
                        currency: {
                            label: 'Currency (Required)',
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
                            label: 'Amount (Required)',
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
                            defaultOperator: 'equal',
                            fieldSettings: {
                                min: 0,
                                max: 999999999999999999,
                            },
                            mainWidgetProps: {
                                valueLabel: 'GGR',
                                validateValue: (val, fieldDef, flag, valueArr, operator) => {
                                    // if (val === undefined && flag) {
                                    //   return 'No value entered';
                                    // }
                                    const regex = /^\$?(?!0.00)(([0-9]{1,3},([0-9]{3},)*)[0-9]{3}|[0-9]{1,19})(\.[0-9]{0,3}[^-_.])?$/g;
                                    const validRegex = regex.test(val);

                                    if (valueArr && val !== undefined) {
                                        if (
                                            valueArr[0] > valueArr[1] ||
                                            valueArr[0] === valueArr[1]
                                        ) {
                                            return "Value 'from' must be less than 'till'";
                                        }
                                    } else if (!validRegex && val !== undefined) {
                                        return 'Invalid format';
                                    } else if (
                                        operator === 'less' &&
                                        val <= 0 &&
                                        val !== undefined
                                    ) {
                                        return 'Value must be greater than 0 ';
                                    }
                                    return false;
                                },
                            },
                        },
                        currency: {
                            label: 'Currency (Required)',
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
                            operators: ['date_range'],
                        },
                    },
                },
                rtp: {
                    label: 'RTP',
                    type: '!group',
                    subfields: {
                        value: {
                            label: 'Amount (Required)',
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
                            defaultOperator: 'equal',
                            fieldSettings: {
                                min: 0,
                                max: 999999999999999999,
                            },
                            mainWidgetProps: {
                                valueLabel: 'RTP',
                                validateValue: (val, fieldDef, flag, valueArr, operator) => {
                                    // if (val === undefined && flag) {
                                    //   return 'No value entered';
                                    // }
                                    const regex = /^\$?(?!0.00)(([0-9]{1,3},([0-9]{3},)*)[0-9]{3}|[0-9]{1,19})(\.[0-9]{0,3}[^-_.])?$/g;
                                    const validRegex = regex.test(val);

                                    if (valueArr && val !== undefined) {
                                        if (
                                            valueArr[0] > valueArr[1] ||
                                            valueArr[0] === valueArr[1]
                                        ) {
                                            return "Value 'from' must be less than 'till'";
                                        }
                                    } else if (!validRegex && val !== undefined) {
                                        return 'Invalid format';
                                    } else if (
                                        operator === 'less' &&
                                        val <= 0 &&
                                        val !== undefined
                                    ) {
                                        return 'Value must be greater than 0 ';
                                    }
                                    return false;
                                },
                            },

                        },
                        currency: {
                            label: 'Currency (Required)',
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
                            operators: ['date_range'],
                        },
                    },
                },

                betsAmount: {
                    label: 'Bets amount',
                    type: '!group',
                    subfields: {
                        value: {
                            label: 'Amount (Required)',
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
                            defaultOperator: 'equal',
                            fieldSettings: {
                                min: 0,
                                max: 999999999999999999,
                            },
                            mainWidgetProps: {
                                valueLabel: 'Bets amount',
                                validateValue: (val, fieldDef, flag, valueArr, operator) => {
                                    // if (val === undefined && flag) {
                                    //   return 'No value entered';
                                    // }
                                    const regex = /^\$?(?!0.00)(([0-9]{1,3},([0-9]{3},)*)[0-9]{3}|[0-9]{1,19})(\.[0-9]{0,3}[^-_.])?$/g;
                                    const validRegex = regex.test(val);

                                    if (valueArr && val !== undefined) {
                                        if (
                                            valueArr[0] > valueArr[1] ||
                                            valueArr[0] === valueArr[1]
                                        ) {
                                            return "Value 'from' must be less than 'till'";
                                        }
                                    } else if (!validRegex && val !== undefined) {
                                        return 'Invalid format';
                                    } else if (
                                        operator === 'less' &&
                                        val <= 0 &&
                                        val !== undefined
                                    ) {
                                        return 'Value must be greater than 0 ';
                                    }
                                    return false;
                                },
                            },
                        },
                        currency: {
                            label: 'Currency (Required)',
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
                        // provider: {
                        //     label: 'Provider',
                        //     type: 'select',
                        //     valueSources: ['value'],
                        //     operators: ['select_equals'],
                        //     listValues: [
                        //         { value: '1', title: 'Male' },
                        //         { value: '0', title: 'Female' },
                        //         { value: '-1', title: 'Not Set' },
                        //     ],
                        // },
                        // gameType: {
                        //     label: 'Game Type',
                        //     type: 'select',
                        //     valueSources: ['value'],
                        //     operators: ['select_equals'],
                        //     listValues: [
                        //         { value: '1', title: 'Male' },
                        //         { value: '0', title: 'Female' },
                        //         { value: '-1', title: 'Not Set' },
                        //     ],
                        // },
                        // game: {
                        //     label: 'Game',
                        //     type: 'select',
                        //     valueSources: ['value'],
                        //     operators: ['select_equals'],
                        //     listValues: [
                        //         { value: '1', title: 'Male' },
                        //         { value: '0', title: 'Female' },
                        //         { value: '-1', title: 'Not Set' },
                        //     ],
                        // },
                        range: {
                            label: 'Period Range',
                            type: 'date',
                            valueSources: ['value'],
                            operators: ['date_range'],
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
                            fieldSettings: {
                                min: 0,
                                max: 999999999999999999,
                            },
                            mainWidgetProps: {
                                valueLabel: 'Bets sum spins',
                                validateValue: (val, fieldDef, flag, valueArr, operator) => {
                                    if (val === undefined && flag) {
                                        return "No value entered"
                                    }
                                    const regex =  /^\$?(?!0.00)(([0-9]{1,3},([0-9]{3},)*)[0-9]{3}|[0-9]{1,19})(\.[0-9]{0,3}[^-_.])?$/g;
                                    const validRegex = regex.test(val);

                                    if (valueArr && val !== undefined) {
                                        if(valueArr[0] > valueArr[1] || valueArr[0] === valueArr[1]) {
                                            return "Value 'from' must be less than 'till'"
                                        }
                                    } else if (!validRegex && val !== undefined) {
                                        return  "Invalid format"
                                    } else if (operator === 'less' && val <= 0 && val !== undefined ) {
                                        return "Value must be greater than 0 "
                                    }
                                    return true;
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
                            operators: ['date_range'],
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
                            fieldSettings: {
                                min: 0,
                                max: 999999999999999999,
                            },
                            mainWidgetProps: {
                                valueLabel: 'Bets average by spin',
                                validateValue: (val, fieldDef, flag, valueArr, operator) => {
                                    if (val === undefined && flag) {
                                        return "No value entered"
                                    }
                                    const regex =  /^\$?(?!0.00)(([0-9]{1,3},([0-9]{3},)*)[0-9]{3}|[0-9]{1,19})(\.[0-9]{0,3}[^-_.])?$/g;
                                    const validRegex = regex.test(val);

                                    if (valueArr && val !== undefined) {
                                        if(valueArr[0] > valueArr[1] || valueArr[0] === valueArr[1]) {
                                            return "Value 'from' must be less than 'till'"
                                        }
                                    } else if (!validRegex && val !== undefined) {
                                        return  "Invalid format"
                                    } else if (operator === 'less' && val <= 0 && val !== undefined ) {
                                        return "Value must be greater than 0 "
                                    }
                                    return true;
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
                            operators: ['date_range'],
                        },
                    },
                },
                betsAvg: {
                    label: 'Bets average',
                    type: '!group',
                    subfields: {
                        value: {
                            label: 'Amount (Required)',
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
                            defaultOperator: 'equal',
                            fieldSettings: {
                                min: 0,
                                max: 999999999999999999,
                            },
                            mainWidgetProps: {
                                valueLabel: 'Bets average',
                                validateValue: (val, fieldDef, flag, valueArr, operator) => {
                                    // if (val === undefined && flag) {
                                    //   return 'No value entered';
                                    // }
                                    const regex = /^\$?(?!0.00)(([0-9]{1,3},([0-9]{3},)*)[0-9]{3}|[0-9]{1,19})(\.[0-9]{0,3}[^-_.])?$/g;
                                    const validRegex = regex.test(val);

                                    if (valueArr && val !== undefined) {
                                        if (
                                            valueArr[0] > valueArr[1] ||
                                            valueArr[0] === valueArr[1]
                                        ) {
                                            return "Value 'from' must be less than 'till'";
                                        }
                                    } else if (!validRegex && val !== undefined) {
                                        return 'Invalid format';
                                    } else if (
                                        operator === 'less' &&
                                        val <= 0 &&
                                        val !== undefined
                                    ) {
                                        return 'Value must be greater than 0 ';
                                    }
                                    return false;
                                },
                            },
                        },
                        currency: {
                            label: 'Currency (Required)',
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
                        // provider: {
                        //     label: 'Provider',
                        //     type: 'select',
                        //     valueSources: ['value'],
                        //     operators: ['select_equals'],
                        //     listValues: [
                        //         { value: '1', title: 'Male' },
                        //         { value: '0', title: 'Female' },
                        //         { value: '-1', title: 'Not Set' },
                        //     ],
                        // },
                        // gameType: {
                        //     label: 'Game Type',
                        //     type: 'select',
                        //     valueSources: ['value'],
                        //     operators: ['select_equals'],
                        //     listValues: [
                        //         { value: '1', title: 'Male' },
                        //         { value: '0', title: 'Female' },
                        //         { value: '-1', title: 'Not Set' },
                        //     ],
                        // },
                        // game: {
                        //     label: 'Game',
                        //     type: 'select',
                        //     valueSources: ['value'],
                        //     operators: ['select_equals'],
                        //     listValues: [
                        //         { value: '1', title: 'Male' },
                        //         { value: '0', title: 'Female' },
                        //         { value: '-1', title: 'Not Set' },
                        //     ],
                        // },
                        range: {
                            label: 'Period Range',
                            type: 'date',
                            valueSources: ['value'],
                            operators: ['date_range'],
                        },
                    },
                },
                betsCount: {
                    label: 'Bets count',
                    type: '!group',
                    subfields: {
                        value: {
                            label: 'Amount (Required)',
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
                            defaultOperator: 'equal',
                            fieldSettings: {
                                min: 0,
                                max: 999999999999999999,
                            },
                            mainWidgetProps: {
                                valueLabel: 'Bets count',
                                validateValue: (val, fieldDef, flag, valueArr, operator) => {
                                    // if (val === undefined && flag) {
                                    //   return 'No value entered';
                                    // }
                                    const regex = /^\$?(?!0.00)(([0-9]{1,3},([0-9]{3},)*)[0-9]{3}|[0-9]{1,19})(\.[0-9]{0,3}[^-_.])?$/g;
                                    const validRegex = regex.test(val);

                                    if (valueArr && val !== undefined) {
                                        if (
                                            valueArr[0] > valueArr[1] ||
                                            valueArr[0] === valueArr[1]
                                        ) {
                                            return "Value 'from' must be less than 'till'";
                                        }
                                    } else if (!validRegex && val !== undefined) {
                                        return 'Invalid format';
                                    } else if (
                                        operator === 'less' &&
                                        val <= 0 &&
                                        val !== undefined
                                    ) {
                                        return 'Value must be greater than 0 ';
                                    }
                                    return false;
                                },
                            },
                        },
                        currency: {
                            label: 'Currency (Required)',
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
                        // provider: {
                        //     label: 'Provider',
                        //     type: 'select',
                        //     valueSources: ['value'],
                        //     operators: ['select_equals'],
                        //     listValues: [
                        //         { value: '1', title: 'Male' },
                        //         { value: '0', title: 'Female' },
                        //         { value: '-1', title: 'Not Set' },
                        //     ],
                        // },
                        // gameType: {
                        //     label: 'Game Type',
                        //     type: 'select',
                        //     valueSources: ['value'],
                        //     operators: ['select_equals'],
                        //     listValues:[
                        //         { value: '1', title: 'Male' },
                        //         { value: '0', title: 'Female' },
                        //         { value: '-1', title: 'Not Set' },
                        //     ],
                        // },
                        // game: {
                        //     label: 'Game',
                        //     type: 'select',
                        //     valueSources: ['value'],
                        //     operators: ['select_equals'],
                        //     listValues: [
                        //         { value: '1', title: 'Male' },
                        //         { value: '0', title: 'Female' },
                        //         { value: '-1', title: 'Not Set' },
                        //     ],
                        // },
                        range: {
                            label: 'Period Range',
                            type: 'date',
                            valueSources: ['value'],
                            operators: ['date_range'],
                        },
                    },
                },
                // betsCountGame: {
                //     label: 'Bets count game',
                //     type: '!group',
                //     subfields: {
                //         value: {
                //             label: 'Amount',
                //             type: 'number',
                //             valueSources: ['value'],
                //             operators: [
                //                 'greater',
                //                 'greater_or_equal',
                //                 'less',
                //                 'less_or_equal',
                //                 'equal',
                //                 'not_equal',
                //                 'between',
                //             ],
                //             fieldSettings: {
                //                 min: 0,
                //                 max: 999999999999999999,
                //             },
                //             mainWidgetProps: {
                //                 valueLabel: 'Bets count game',
                //                 validateValue: (val, fieldDef, flag, valueArr, operator) => {
                //                     if (val === undefined && flag) {
                //                         return "No value entered"
                //                     }
                //                     const regex =  /^\$?(?!0.00)(([0-9]{1,3},([0-9]{3},)*)[0-9]{3}|[0-9]{1,19})(\.[0-9]{0,3}[^-_.])?$/g;
                //                     const validRegex = regex.test(val);
                //
                //                     if (valueArr && val !== undefined) {
                //                         if(valueArr[0] > valueArr[1] || valueArr[0] === valueArr[1]) {
                //                             return "Value 'from' must be less than 'till'"
                //                         }
                //                     } else if (!validRegex && val !== undefined) {
                //                         return  "Invalid format"
                //                     } else if (operator === 'less' && val <= 0 && val !== undefined ) {
                //                         return "Value must be greater than 0 "
                //                     }
                //                     return true;
                //                 },
                //             },
                //         },
                //         currency: {
                //             label: 'Currency',
                //             type: 'select',
                //             valueSources: ['value'],
                //             operators: ['select_equals'],
                //             listValues: [
                //                 { value: '1', title: 'Male' },
                //                 { value: '0', title: 'Female' },
                //                 { value: '-1', title: 'Not Set' },
                //             ],
                //         },
                //         period: {
                //             label: 'Period',
                //             type: 'select',
                //             valueSources: ['value'],
                //             operators: ['select_equals'],
                //             listValues: [
                //                 { value: 'all_time', title: 'All time' },
                //                 { value: 'last_month', title: 'Last month' },
                //                 { value: 'current_month', title: 'Current month' },
                //                 { value: 'since_last_deposit', title: 'Since last deposit' },
                //                 {
                //                     value: 'since_last_withdrawal',
                //                     title: 'Since last withdrawal',
                //                 },
                //             ],
                //         },
                //         provider: {
                //             label: 'Provider',
                //             type: 'select',
                //             valueSources: ['value'],
                //             operators: ['select_equals'],
                //             listValues: [
                //                 { value: '1', title: 'Male' },
                //                     { value: '0', title: 'Female' },
                //                     { value: '-1', title: 'Not Set' },
                //                 ],
                //         },
                //         gameType: {
                //             label: 'Game Type',
                //             type: 'select',
                //             valueSources: ['value'],
                //             operators: ['select_equals'],
                //             listValues: [
                //                 { value: '1', title: 'Male' },
                //                 { value: '0', title: 'Female' },
                //                 { value: '-1', title: 'Not Set' },
                //             ],
                //         },
                //         game: {
                //             label: 'Game',
                //             type: 'select',
                //             valueSources: ['value'],
                //             operators: ['select_equals'],
                //             listValues: [
                //                 { value: '1', title: 'Male' },
                //                 { value: '0', title: 'Female' },
                //                 { value: '-1', title: 'Not Set' },
                //             ],
                //         },
                //         range: {
                //             label: 'Period Range',
                //             type: 'date',
                //             valueSources: ['value'],
                //             operators: ['date_range'],
                //         },
                //     },
                // },
                // betsCountGameType: {
                //     label: 'Bets count game type',
                //     type: '!group',
                //     subfields: {
                //         value: {
                //             label: 'Amount',
                //             type: 'number',
                //             valueSources: ['value'],
                //             operators: [
                //                 'greater',
                //                 'greater_or_equal',
                //                 'less',
                //                 'less_or_equal',
                //                 'equal',
                //                 'not_equal',
                //                 'between',
                //             ],
                //             fieldSettings: {
                //                 min: 0,
                //                 max: 999999999999999999,
                //             },
                //             mainWidgetProps: {
                //                 valueLabel: 'Bets count game type',
                //                 validateValue: (val, fieldDef, flag, valueArr, operator) => {
                //                     if (val === undefined && flag) {
                //                         return "No value entered"
                //                     }
                //                     const regex =  /^\$?(?!0.00)(([0-9]{1,3},([0-9]{3},)*)[0-9]{3}|[0-9]{1,19})(\.[0-9]{0,3}[^-_.])?$/g;
                //                     const validRegex = regex.test(val);
                //
                //                     if (valueArr && val !== undefined) {
                //                         if(valueArr[0] > valueArr[1] || valueArr[0] === valueArr[1]) {
                //                             return "Value 'from' must be less than 'till'"
                //                         }
                //                     } else if (!validRegex && val !== undefined) {
                //                         return  "Invalid format"
                //                     } else if (operator === 'less' && val <= 0 && val !== undefined ) {
                //                         return "Value must be greater than 0 "
                //                     }
                //                     return true;
                //                 },
                //             },
                //         },
                //         currency: {
                //             label: 'Currency',
                //             type: 'select',
                //             valueSources: ['value'],
                //             operators: ['select_equals'],
                //             listValues: [
                //                 { value: '1', title: 'Male' },
                //                 { value: '0', title: 'Female' },
                //                 { value: '-1', title: 'Not Set' },
                //             ],
                //         },
                //         period: {
                //             label: 'Period',
                //             type: 'select',
                //             valueSources: ['value'],
                //             operators: ['select_equals'],
                //             listValues: [
                //                 { value: 'all_time', title: 'All time' },
                //                 { value: 'last_month', title: 'Last month' },
                //                 { value: 'current_month', title: 'Current month' },
                //                 { value: 'since_last_deposit', title: 'Since last deposit' },
                //                 {
                //                     value: 'since_last_withdrawal',
                //                     title: 'Since last withdrawal',
                //                 },
                //             ],
                //         },
                //         provider: {
                //             label: 'Provider',
                //             type: 'select',
                //             valueSources: ['value'],
                //             operators: ['select_equals'],
                //             listValues: [
                //                 { value: '1', title: 'Male' },
                //                 { value: '0', title: 'Female' },
                //                 { value: '-1', title: 'Not Set' },
                //             ],
                //         },
                //         gameType: {
                //             label: 'Game Type',
                //             type: 'select',
                //             valueSources: ['value'],
                //             operators: ['select_equals'],
                //             listValues: [
                //                 { value: '1', title: 'Male' },
                //                 { value: '0', title: 'Female' },
                //                 { value: '-1', title: 'Not Set' },
                //             ],
                //         },
                //         game: {
                //             label: 'Game',
                //             type: 'select',
                //             valueSources: ['value'],
                //             operators: ['select_equals'],
                //             listValues: [
                //                 { value: '1', title: 'Male' },
                //                 { value: '0', title: 'Female' },
                //                 { value: '-1', title: 'Not Set' },
                //             ],
                //         },
                //         range: {
                //             label: 'Period Range',
                //             type: 'date',
                //             valueSources: ['value'],
                //             operators: ['date_range'],
                //         },
                //     },
                // },
                // betsCountProvider: {
                //     label: 'Bets count provider',
                //     type: '!group',
                //     subfields: {
                //         value: {
                //             label: 'Amount',
                //             type: 'number',
                //             valueSources: ['value'],
                //             operators: [
                //                 'greater',
                //                 'greater_or_equal',
                //                 'less',
                //                 'less_or_equal',
                //                 'equal',
                //                 'not_equal',
                //                 'between',
                //             ],
                //             fieldSettings: {
                //                 min: 0,
                //                 max: 999999999999999999,
                //             },
                //             mainWidgetProps: {
                //                 valueLabel: 'Bets count provider',
                //                 validateValue: (val, fieldDef, flag, valueArr, operator) => {
                //                     if (val === undefined && flag) {
                //                         return "No value entered"
                //                     }
                //                     const regex =  /^\$?(?!0.00)(([0-9]{1,3},([0-9]{3},)*)[0-9]{3}|[0-9]{1,19})(\.[0-9]{0,3}[^-_.])?$/g;
                //                     const validRegex = regex.test(val);
                //
                //                     if (valueArr && val !== undefined) {
                //                         if(valueArr[0] > valueArr[1] || valueArr[0] === valueArr[1]) {
                //                             return "Value 'from' must be less than 'till'"
                //                         }
                //                     } else if (!validRegex && val !== undefined) {
                //                         return  "Invalid format"
                //                     } else if (operator === 'less' && val <= 0 && val !== undefined ) {
                //                         return "Value must be greater than 0 "
                //                     }
                //                     return true;
                //                 },
                //             },
                //         },
                //         currency: {
                //             label: 'Currency',
                //             type: 'select',
                //             valueSources: ['value'],
                //             operators: ['select_equals'],
                //             listValues: [
                //                 { value: '1', title: 'Male' },
                //                 { value: '0', title: 'Female' },
                //                 { value: '-1', title: 'Not Set' },
                //             ],
                //         },
                //         period: {
                //             label: 'Period',
                //             type: 'select',
                //             valueSources: ['value'],
                //             operators: ['select_equals'],
                //             listValues: [
                //                 { value: 'all_time', title: 'All time' },
                //                 { value: 'last_month', title: 'Last month' },
                //                 { value: 'current_month', title: 'Current month' },
                //                 { value: 'since_last_deposit', title: 'Since last deposit' },
                //                 {
                //                     value: 'since_last_withdrawal',
                //                     title: 'Since last withdrawal',
                //                 },
                //             ],
                //         },
                //         provider: {
                //             label: 'Provider',
                //             type: 'select',
                //             valueSources: ['value'],
                //             operators: ['select_equals'],
                //             listValues: [
                //                 { value: '1', title: 'Male' },
                //                 { value: '0', title: 'Female' },
                //                 { value: '-1', title: 'Not Set' },
                //             ],
                //         },
                //         gameType: {
                //             label: 'Game Type',
                //             type: 'select',
                //             valueSources: ['value'],
                //             operators: ['select_equals'],
                //             listValues: [
                //                 { value: '1', title: 'Male' },
                //                 { value: '0', title: 'Female' },
                //                 { value: '-1', title: 'Not Set' },
                //             ],
                //         },
                //         game: {
                //             label: 'Game',
                //             type: 'select',
                //             valueSources: ['value'],
                //             operators: ['select_equals'],
                //             listValues: [
                //                 { value: '1', title: 'Male' },
                //                 { value: '0', title: 'Female' },
                //                 { value: '-1', title: 'Not Set' },
                //             ],
                //         },
                //         range: {
                //             label: 'Period Range',
                //             type: 'date',
                //             valueSources: ['value'],
                //             operators: ['date_range'],
                //         },
                //     },
                // },
                winningsAmount: {
                    label: 'Winnings amount',
                    type: '!group',
                    subfields: {
                        value: {
                            label: 'Amount (Required)',
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
                            defaultOperator: 'equal',
                            fieldSettings: {
                                min: 0,
                                max: 999999999999999999,
                            },
                            mainWidgetProps: {
                                valueLabel: 'Winnings amount',
                                validateValue: (val, fieldDef, flag, valueArr, operator) => {
                                    // if (val === undefined && flag) {
                                    //   return 'No value entered';
                                    // }
                                    const regex = /^\$?(?!0.00)(([0-9]{1,3},([0-9]{3},)*)[0-9]{3}|[0-9]{1,19})(\.[0-9]{0,3}[^-_.])?$/g;
                                    const validRegex = regex.test(val);

                                    if (valueArr && val !== undefined) {
                                        if (
                                            valueArr[0] > valueArr[1] ||
                                            valueArr[0] === valueArr[1]
                                        ) {
                                            return "Value 'from' must be less than 'till'";
                                        }
                                    } else if (!validRegex && val !== undefined) {
                                        return 'Invalid format';
                                    } else if (
                                        operator === 'less' &&
                                        val <= 0 &&
                                        val !== undefined
                                    ) {
                                        return 'Value must be greater than 0 ';
                                    }
                                    return false;
                                },
                            },
                        },
                        currency: {
                            label: 'Currency (Required)',
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
                        // provider: {
                        //     label: 'Provider',
                        //     type: 'select',
                        //     valueSources: ['value'],
                        //     operators: ['select_equals'],
                        //     listValues: [
                        //         { value: '1', title: 'Male' },
                        //         { value: '0', title: 'Female' },
                        //         { value: '-1', title: 'Not Set' },
                        //     ],
                        // },
                        // gameType: {
                        //     label: 'Game Type',
                        //     type: 'select',
                        //     valueSources: ['value'],
                        //     operators: ['select_equals'],
                        //     listValues: [
                        //         { value: '1', title: 'Male' },
                        //         { value: '0', title: 'Female' },
                        //         { value: '-1', title: 'Not Set' },
                        //     ],
                        // },
                        // game: {
                        //     label: 'Game',
                        //     type: 'select',
                        //     valueSources: ['value'],
                        //     operators: ['select_equals'],
                        //     listValues: [
                        //         { value: '1', title: 'Male' },
                        //         { value: '0', title: 'Female' },
                        //         { value: '-1', title: 'Not Set' },
                        //     ],
                        // },
                        range: {
                            label: 'Period Range',
                            type: 'date',
                            valueSources: ['value'],
                            operators: ['date_range'],
                        },
                    },
                },
                // winningsCount: {
                //     label: 'Winnings count',
                //     type: '!group',
                //     subfields: {
                //         value: {
                //             label: 'Amount',
                //             type: 'number',
                //             valueSources: ['value'],
                //             operators: [
                //                 'greater',
                //                 'greater_or_equal',
                //                 'less',
                //                 'less_or_equal',
                //                 'equal',
                //                 'not_equal',
                //                 'between',
                //             ],
                //             fieldSettings: {
                //                 min: 0,
                //                 max: 999999999999999999,
                //             },
                //             mainWidgetProps: {
                //                 valueLabel: 'Winnings count',
                //                 validateValue: (val, fieldDef, flag, valueArr, operator) => {
                //                     if (val === undefined && flag) {
                //                         return "No value entered"
                //                     }
                //                     const regex =  /^\$?(?!0.00)(([0-9]{1,3},([0-9]{3},)*)[0-9]{3}|[0-9]{1,19})(\.[0-9]{0,3}[^-_.])?$/g;
                //                     const validRegex = regex.test(val);
                //
                //                     if (valueArr && val !== undefined) {
                //                         if(valueArr[0] > valueArr[1] || valueArr[0] === valueArr[1]) {
                //                             return "Value 'from' must be less than 'till'"
                //                         }
                //                     } else if (!validRegex && val !== undefined) {
                //                         return  "Invalid format"
                //                     } else if (operator === 'less' && val <= 0 && val !== undefined ) {
                //                         return "Value must be greater than 0 "
                //                     }
                //                     return true;
                //                 },
                //             },
                //         },
                //         currency: {
                //             label: 'Currency',
                //             type: 'select',
                //             valueSources: ['value'],
                //             operators: ['select_equals'],
                //             listValues: [
                //                 { value: '1', title: 'Male' },
                //                 { value: '0', title: 'Female' },
                //                 { value: '-1', title: 'Not Set' },
                //             ],
                //         },
                //         period: {
                //             label: 'Period',
                //             type: 'select',
                //             valueSources: ['value'],
                //             operators: ['select_equals'],
                //             listValues: [
                //                 { value: 'all_time', title: 'All time' },
                //                 { value: 'last_month', title: 'Last month' },
                //                 { value: 'current_month', title: 'Current month' },
                //                 { value: 'since_last_deposit', title: 'Since last deposit' },
                //                 {
                //                     value: 'since_last_withdrawal',
                //                     title: 'Since last withdrawal',
                //                 },
                //             ],
                //         },
                //         provider: {
                //             label: 'Provider',
                //             type: 'select',
                //             valueSources: ['value'],
                //             operators: ['select_equals'],
                //             listValues: [
                //                 { value: '1', title: 'Male' },
                //                 { value: '0', title: 'Female' },
                //                 { value: '-1', title: 'Not Set' },
                //             ],
                //         },
                //         gameType: {
                //             label: 'Game Type',
                //             type: 'select',
                //             valueSources: ['value'],
                //             operators: ['select_equals'],
                //             listValues: [
                //                 { value: '1', title: 'Male' },
                //                 { value: '0', title: 'Female' },
                //                 { value: '-1', title: 'Not Set' },
                //             ],
                //         },
                //         game: {
                //             label: 'Game',
                //             type: 'select',
                //             valueSources: ['value'],
                //             operators: ['select_equals'],
                //             listValues: [
                //                 { value: '1', title: 'Male' },
                //                 { value: '0', title: 'Female' },
                //                 { value: '-1', title: 'Not Set' },
                //             ],
                //         },
                //         range: {
                //             label: 'Period Range',
                //             type: 'date',
                //             valueSources: ['value'],
                //             operators: ['date_range'],
                //         },
                //     },
                // },
                // winningsAvg: {
                //     label: 'Winnings average',
                //     type: '!group',
                //     subfields: {
                //         value: {
                //             label: 'Amount',
                //             type: 'number',
                //             valueSources: ['value'],
                //             operators: [
                //                 'greater',
                //                 'greater_or_equal',
                //                 'less',
                //                 'less_or_equal',
                //                 'equal',
                //                 'not_equal',
                //                 'between',
                //             ],
                //             fieldSettings: {
                //                 min: 0,
                //                 max: 999999999999999999,
                //             },
                //             mainWidgetProps: {
                //                 valueLabel: 'Winnings average',
                //                 validateValue: (val, fieldDef, flag, valueArr, operator) => {
                //                     if (val === undefined && flag) {
                //                         return "No value entered"
                //                     }
                //                     const regex =  /^\$?(?!0.00)(([0-9]{1,3},([0-9]{3},)*)[0-9]{3}|[0-9]{1,19})(\.[0-9]{0,3}[^-_.])?$/g;
                //                     const validRegex = regex.test(val);
                //
                //                     if (valueArr && val !== undefined) {
                //                         if(valueArr[0] > valueArr[1] || valueArr[0] === valueArr[1]) {
                //                             return "Value 'from' must be less than 'till'"
                //                         }
                //                     } else if (!validRegex && val !== undefined) {
                //                         return  "Invalid format"
                //                     } else if (operator === 'less' && val <= 0 && val !== undefined ) {
                //                         return "Value must be greater than 0 "
                //                     }
                //                     return true;
                //                 },
                //             },
                //         },
                //         currency: {
                //             label: 'Currency',
                //             type: 'select',
                //             valueSources: ['value'],
                //             operators: ['select_equals'],
                //             listValues: [
                //                 { value: '1', title: 'Male' },
                //                 { value: '0', title: 'Female' },
                //                 { value: '-1', title: 'Not Set' },
                //             ],
                //         },
                //         period: {
                //             label: 'Period',
                //             type: 'select',
                //             valueSources: ['value'],
                //             operators: ['select_equals'],
                //             listValues: [
                //                 { value: 'all_time', title: 'All time' },
                //                 { value: 'last_month', title: 'Last month' },
                //                 { value: 'current_month', title: 'Current month' },
                //                 { value: 'since_last_deposit', title: 'Since last deposit' },
                //                 {
                //                     value: 'since_last_withdrawal',
                //                     title: 'Since last withdrawal',
                //                 },
                //             ],
                //         },
                //         provider: {
                //             label: 'Provider',
                //             type: 'select',
                //             valueSources: ['value'],
                //             operators: ['select_equals'],
                //             listValues: [
                //                 { value: '1', title: 'Male' },
                //                 { value: '0', title: 'Female' },
                //                 { value: '-1', title: 'Not Set' },
                //             ],
                //         },
                //         gameType: {
                //             label: 'Game Type',
                //             type: 'select',
                //             valueSources: ['value'],
                //             operators: ['select_equals'],
                //             listValues: [
                //                 { value: '1', title: 'Male' },
                //                 { value: '0', title: 'Female' },
                //                 { value: '-1', title: 'Not Set' },
                //             ],
                //         },
                //         game: {
                //             label: 'Game',
                //             type: 'select',
                //             valueSources: ['value'],
                //             operators: ['select_equals'],
                //             listValues: [
                //                 { value: '1', title: 'Male' },
                //                 { value: '0', title: 'Female' },
                //                 { value: '-1', title: 'Not Set' },
                //             ],
                //         },
                //         range: {
                //             label: 'Period Range',
                //             type: 'date',
                //             valueSources: ['value'],
                //             operators: ['date_range'],
                //         },
                //     },
                // },
            },
        },
        // balance: {
        //     label: 'Balance Amount',
        //     tooltip: 'Group of fields',
        //     type: '!struct',
        //     subfields: {
        //         amount: {
        //             label: 'Balance Amount',
        //             type: '!group',
        //             subfields: {
        //                 value: {
        //                     label: 'Amount',
        //                     type: 'number',
        //                     valueSources: ['value'],
        //                     operators: [
        //                         'greater',
        //                         'greater_or_equal',
        //                         'less',
        //                         'less_or_equal',
        //                         'equal',
        //                         'not_equal',
        //                         'between',
        //                     ],
        //                     fieldSettings: {
        //                         min: 0,
        //                         max: 999999999999999999,
        //                     },
        //                     mainWidgetProps: {
        //                         valueLabel: 'Balance Amount',
        //                         validateValue: (val, fieldDef, flag, valueArr, operator) => {
        //                             if (val === undefined && flag) {
        //                                 return "No value entered"
        //                             }
        //                             const regex =  /^\$?(?!0.00)(([0-9]{1,3},([0-9]{3},)*)[0-9]{3}|[0-9]{1,19})(\.[0-9]{0,3}[^-_.])?$/g;
        //                             const validRegex = regex.test(val);
        //
        //                             if (valueArr && val !== undefined) {
        //                                 if(valueArr[0] > valueArr[1] || valueArr[0] === valueArr[1]) {
        //                                     return "Value 'from' must be less than 'till'"
        //                                 }
        //                             } else if (!validRegex && val !== undefined) {
        //                                 return  "Invalid format"
        //                             } else if (operator === 'less' && val <= 0 && val !== undefined ) {
        //                                 return "Value must be greater than 0 "
        //                             }
        //                             return true;
        //                         },
        //                     },
        //                 },
        //                 currency: {
        //                     label: 'Currency',
        //                     type: 'select',
        //                     valueSources: ['value'],
        //                     operators: ['select_equals'],
        //                     listValues: [
        //                         { value: '1', title: 'Male' },
        //                         { value: '0', title: 'Female' },
        //                         { value: '-1', title: 'Not Set' },
        //                     ],
        //                 },
        //             },
        //         },
        //         count: {
        //             label: 'Balance count',
        //             type: '!group',
        //             subfields: {
        //                 value: {
        //                     label: 'Amount',
        //                     type: 'number',
        //                     valueSources: ['value'],
        //                     operators: [
        //                         'greater',
        //                         'greater_or_equal',
        //                         'less',
        //                         'less_or_equal',
        //                         'equal',
        //                         'not_equal',
        //                         'between',
        //                     ],
        //                     fieldSettings: {
        //                         min: 0,
        //                         max: 999999999999999999,
        //                     },
        //                     mainWidgetProps: {
        //                         valueLabel: 'Balance Amount',
        //                         validateValue: (val, fieldDef, flag, valueArr, operator) => {
        //                             if (val === undefined && flag) {
        //                                 return "No value entered"
        //                             }
        //                             const regex =  /^\$?(?!0.00)(([0-9]{1,3},([0-9]{3},)*)[0-9]{3}|[0-9]{1,19})(\.[0-9]{0,3}[^-_.])?$/g;
        //                             const validRegex = regex.test(val);
        //
        //                             if (valueArr && val !== undefined) {
        //                                 if(valueArr[0] > valueArr[1] || valueArr[0] === valueArr[1]) {
        //                                     return "Value 'from' must be less than 'till'"
        //                                 }
        //                             } else if (!validRegex && val !== undefined) {
        //                                 return  "Invalid format"
        //                             } else if (operator === 'less' && val <= 0 && val !== undefined ) {
        //                                 return "Value must be greater than 0 "
        //                             }
        //                             return true;
        //                         },
        //                     },
        //                 },
        //                 currency: {
        //                     label: 'Currency',
        //                     type: 'select',
        //                     valueSources: ['value'],
        //                     operators: ['select_equals'],
        //                     listValues: [
        //                         { value: '1', title: 'Male' },
        //                         { value: '0', title: 'Female' },
        //                         { value: '-1', title: 'Not Set' },
        //                     ],
        //                 },
        //             },
        //         },
        //     },
        // },

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

