import React, {Component} from 'react';
import merge from 'lodash/merge';
import {
    BasicConfig,
    // types:
    Operators, Widgets, Fields, Config, Types, Conjunctions, Settings, LocaleSettings, OperatorProximity, Funcs,
} from 'react-awesome-query-builder';

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
        user: {
            label: 'User',
            tooltip: 'Group of fields',
            type: '!struct',
            subfields: {
                firstName: {
                    label2: 'Username', //only for menu's toggler
                    type: 'text',
                    excludeOperators: ['proximity'],
                    mainWidgetProps: {
                        valueLabel: "Name",
                        valuePlaceholder: "Enter name",
                        validateValue: (val, fieldDef) => {
                            const valid = val.length < 4;
                            return valid
                            const valid = val.length < 4;
                            let errorMessage = valid ? null : 'Incorrect value';

                            return valid
                        },
                    },
                },
                login: {
                    type: 'text',
                    tableName: 't1', // PR #18, PR #20
                    excludeOperators: ['proximity'],
                    mainWidgetProps: {
                        valueLabel: "Login",
                        valuePlaceholder: "Enter login",
                        validateValue: (val, fieldDef) => {
                            const valid = val.length < 4;
                            let errorMessage = valid ? null : 'Incorrect value';

                            return errorMessage
                        },
                    },
                }
            }
        },
        results: {
            label: 'Results',
            type: '!group',
            subfields: {
                product: {
                    type: 'select',
                    listValues: ['abc', 'def', 'xyz'],
                    valueSources: ['value'],
                },
                score: {
                    type: 'number',
                    fieldSettings: {
                        min: 0,
                        max: 100
                    },
                    valueSources: ['value'],
                    mainWidgetProps: {
                        validateValue: (val, fieldDef) => {
                            const valid = val < 3;
                            let errorMessage = valid ? null : 'Incorrect value';
                            return errorMessage
                        },
                    },
                }
            }
        },
        prox1: {
            label: 'prox',
            tooltip: 'Proximity search',
            type: 'text',
            operators: ['proximity'],
        },
        num: {
            label: 'Number',
            type: 'number',
            preferWidgets: ['number'],
            fieldSettings: {
                min: -1,
                max: 5
            },
            funcs: ['LINEAR_REGRESSION'],
        },
        slider: {
            label: 'Slider',
            type: 'number',
            preferWidgets: ['slider', 'rangeslider'],
            valueSources: ['value', 'field'],
            fieldSettings: {
                min: 0,
                max: 100,
                step: 1,
                marks: {
                    0: <strong>0%</strong>,
                    100: <strong>100%</strong>
                },
            },
            //overrides
            widgets: {
                slider: {
                    widgetProps: {
                        valuePlaceholder: "..Slider",
                    }
                }
            },
        },
        date: {
            label: 'Date',
            type: 'date',
            valueSources: ['value'],
            operators: ['date_range', 'equal', "greater_or_equal", "not_date_range"],
            fieldSettings: {
                dateFormat: 'DD-MM-YYYY',
            }
        },
        time: {
            label: 'Time',
            type: 'time',
            valueSources: ['value'],
            operators: ['greater_or_equal', 'less_or_equal', 'between'],
            defaultOperator: 'between',
        },
        datetime: {
            label: 'DateTime',
            type: 'datetime',
            valueSources: ['value']
        },
        datetime2: {
            label: 'DateTime2',
            type: 'datetime',
            valueSources: ['field']
        },
        color: {
            label: 'Color',
            type: 'select',
            valueSources: ['value'],
            // * old format:
            // listValues: {
            //     yellow: 'Yellow',
            //     green: 'Green',
            //     orange: 'Orange'
            // },
            // * new format:
            listValues: [
                { value: 'yellow', title: 'Yellow' },
                { value: 'green', title: 'Green' },
                { value: 'orange', title: 'Orange' }
            ],
        },
        color2: {
            label: 'Color2',
            type: 'select',
            listValues: {
                yellow: 'Yellow',
                green: 'Green',
                orange: 'Orange',
                purple: 'Purple'
            },
        },
        multicolor: {
            label: 'Colors',
            type: 'multiselect',
            listValues: {
                yellow: 'Yellow',
                green: 'Green',
                orange: 'Orange'
            },
            allowCustomValues: true
        },
        selecttree: {
            label: 'Color (tree)',
            type: 'treeselect',
            fieldSettings: {
                treeExpandAll: true,
                // * deep format (will be auto converted to flat format):
                // listValues: [
                //     { value: "1", title: "Warm colors", children: [
                //         { value: "2", title: "Red" }, 
                //         { value: "3", title: "Orange" }
                //     ] },
                //     { value: "4", title: "Cool colors", children: [
                //         { value: "5", title: "Green" }, 
                //         { value: "6", title: "Blue", children: [
                //             { value: "7", title: "Sub blue", children: [
                //                 { value: "8", title: "Sub sub blue and a long text" }
                //             ] }
                //         ] }
                //     ] }
                // ],
                // * flat format:
                listValues: [
                    { value: "1", title: "Warm colors" },
                    { value: "2", title: "Red", parent: "1" },
                    { value: "3", title: "Orange", parent: "1" },
                    { value: "4", title: "Cool colors" },
                    { value: "5", title: "Green", parent: "4" },
                    { value: "6", title: "Blue", parent: "4" },
                        { value: "7", title: "Sub blue", parent: "6" },
                        { value: "8", title: "Sub sub blue and a long text", parent: "7" },
                ],
            }
        },
        multiselecttree: {
            label: 'Colors (tree)',
            type: 'treemultiselect',
            fieldSettings: {
                treeExpandAll: true,
                listValues: [
                    { value: "1", title: "Warm colors", children: [
                        { value: "2", title: "Red" }, 
                        { value: "3", title: "Orange" }
                    ] },
                    { value: "4", title: "Cool colors", children: [
                        { value: "5", title: "Green" }, 
                        { value: "6", title: "Blue", children: [
                            { value: "7", title: "Sub blue", children: [
                                { value: "8", title: "Sub sub blue and a long text" }
                            ] }
                        ] }
                    ] }
                ]
            }
        },
        stock: {
            label: 'In stock',
            type: 'boolean',
            defaultValue: true,
            fieldSettings: {
                labelYes: "+",
                labelNo: "-"
            }
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

