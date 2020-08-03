import React, {Component} from 'react';
import {
  Query, Builder, Utils, 
  //types:
  ImmutableTree, Config, BuilderProps, JsonTree, JsonLogicTree
} from 'react-awesome-query-builder';
import throttle from 'lodash/throttle';
import loadConfig from './config';
import loadedInitValue from './init_value';
import loadedInitLogic from './init_logic';
import reverseParseSection from './parseServerPreset';

const preset = {
    type: 'preset',
    logic: 'AND',
    conditions: [
        {
            currency: "2",
            dateFrom: "2020-07-08",
            dateTo: "2020-07-17",
            filterName: "ggr",
            operator: "between",
            period: "arbitrary",
            type: "financial",
            value: "0,564"
        },
        {
            currency: "2",
            filterName: "rtp",
            operator: "not_equal",
            period: "last_month",
            type: "financial",
            value: 24342
        },
        {
            currency: "1",
            dateFrom: "2020-07-05",
            dateTo: "2020-07-18",
            filterName: "betsAmount",
            operator: "less",
            period: "arbitrary",
            type: "financial",
            value: 23
        },
        {
            currency: "1",
            filterName: "betsAvgBySpins",
            operator: "greater",
            period: "last_month",
            type: "financial",
            value: 124
        },
        {
            currency: "1",
            dateFrom: "2020-07-07",
            dateTo: "2020-07-18",
            filterName: "betsSumSpins",
            operator: "between",
            period: "arbitrary",
            type: "financial",
            value: "23,11432134"
        },
        {
            currency: "1",
            filterName: "winningsAmount",
            operator: "equal",
            type: "financial",
            value: 3424
        },
        {
            currency: "1",
            dateFrom: "2020-07-14",
            dateTo: "2020-07-24",
            filterName: "depositsCount",
            operator: "not_equal",
            period: "arbitrary",
            type: "financial",
            value: 1
        },
        {
            currency: "1",
            filterName: "depositsAvg",
            operator: "less",
            period: "current_month",
            type: "financial",
            value: 2
        },
        {
            currency: "1",
            filterName: "withdrawalsAmount",
            operator: "less_or_equal",
            period: "since_last_deposit",
            type: "financial",
            value: 6
        },
        {
            currency: "1",
            dateFrom: "2020-07-06",
            dateTo: "2020-07-30",
            filterName: "withdrawalsCount",
            operator: "greater",
            period: "arbitrary",
            type: "financial",
            value: 1
        },
        {
            currency: "1",
            filterName: "withdrawalsAvg",
            operator: "greater_or_equal",
            type: "financial",
            value: 4
        },
        {
            currency: "1",
            dateFrom: "2020-07-07",
            dateTo: "2020-07-23",
            filterName: "revenue",
            operator: "equal",
            period: "arbitrary",
            type: "financial",
            value: 4
        },
        {
            currency: "1",
            filterName: "hold",
            operator: "between",
            type: "financial",
            value: "23,1777"
        },
        {
            currency: "1",
            filterName: "amount",
            operator: "between",
            type: "balance",
            value: "0,7"
        },
        {
            currency: "1",
            dateFrom: "2020-07-05",
            dateTo: "2020-07-30",
            filterName: "depositsAmount",
            operator: "between",
            period: "arbitrary",
            type: "financial",
            value: "21,132"
        },
        {
            filterName: "lastLoginIp",
            operator: "equal",
            type: "personal",
            value: "1.1.1.111"
        },
        {
            filterName: "lastLoginIp",
            operator: "not_equal",
            type: "personal",
            value: "11.1.1.11"
        },
        {
            filterName: "lastLoginIp",
            operator: "is_empty",
            type: "personal",
            value: null
        },
        {
            filterName: "lastLoginIp",
            operator: "is_not_empty",
            type: "personal",
            value: null
        },
        {
            filterName: "lastVisitAt",
            operator: "equal",
            type: "personal",
            value: "2020-07-30"
        },
        {
            filterName: "lastVisitAt",
            operator: "not_equal",
            type: "personal",
            value: "2020-07-20"
        },
        {
            filterName: "lastVisitAt",
            operator: "less",
            type: "personal",
            value: "2020-07-11"
        },
        {
            filterName: "lastVisitAt",
            operator: "less_or_equal",
            type: "personal",
            value: "2020-07-24"
        },
        {
            filterName: "lastVisitAt",
            operator: "greater",
            type: "personal",
            value: "2020-07-29"
        },
        {
            filterName: "lastVisitAt",
            operator: "greater_or_equal",
            type: "personal",
            value: "2020-07-13"
        },
        {
            filterName: "lastVisitAt",
            operator: "is_empty",
            type: "personal",
            value: null
        },
        {
            filterName: "lastVisitAt",
            operator: "is_not_empty",
            type: "personal",
            value: null
        },
        {
            filterName: "lastVisitAt",
            operator: "between",
            type: "personal",
            value: "2020-07-06,2020-07-17"
        },
        {
            filterName: "registrationIp",
            operator: "equal",
            type: "personal",
            value: "1.1.1.111"
        },
        {
            filterName: "registrationIp",
            operator: "not_equal",
            type: "personal",
            value: "1.1.1.111"
        },
        {
            filterName: "birthdate",
            operator: "greater",
            type: "personal",
            value: "2020-07-22"
        }, {
            filterName: "birthdate",
            operator: "is_not_empty",
            type: "personal",
            value: null
        },
        {
            filterName: "birthdate",
            operator: "between",
            type: "personal",
            value: "2020-06-28,2020-07-07"
        },

        {
            filterName: "gender",
            operator: "in",
            type: "personal",
            value: "1,0,-1"
        },
        {
            filterName: "gender",
            operator: "in",
            type: "personal",
            value: 0
        },
        {
            filterName: "status",
            operator: "in",
            type: "personal",
            value: 0
        },
        {
            filterName: "status",
            operator: "in",
            type: "personal",
            value: "1,0,-1"
        },
        {
            filterName: "isVerified",
            operator: "equal",
            type: "personal",
            value: true
        },

        {
            filterName: "birthdate",
            operator: "between",
            type: "personal",
            value: "2020-06-28,2020-07-07"
        },
        {
            filterName: "birthdate",
            operator: "not_equal",
            type: "personal",
            value: "2020-07-29"
        },
        {
            filterName: "birthdate",
            operator: "less_or_equal",
            type: "personal",
            value: "2020-07-27"
        },
        {
            filterName: "birthdate",
            operator: "less",
            type: "personal",
            value: "2020-07-13"
        },
        {
            filterName: "birthdate",
            operator: "is_empty",
            type: "personal",
            value: null
        },
        {
            filterName: "birthdate",
            operator: "greater_or_equal",
            type: "personal",
            value: "2020-07-07"
        },
        {
            filterName: "birthdate",
            operator: "equal",
            type: "personal",
            value: "2002-07-29"
        },
        {
            filterName: "country",
            operator: "in",
            type: "personal",
            value: "1,2",
        },
        {
            filterName: "country",
            operator: "in",
            type: "personal",
            value: "241",
        },
        {
            filterName: "city",
            operator: "equal",
            type: "personal",
            value: "fdfdfdfddf"
        },
        {
            filterName: "city",
            operator: "not_equal",
            type: "personal",
            value: "hjhj"
        },
        {
            filterName: "city",
            operator: "is_empty",
            type: "personal",
            value: null
        },
        {
            filterName: "city",
            operator: "is_not_empty",
            type: "personal",
            value: null,
        },
        {
            filterName: "nodeId",
            operator: "in",
            type: "personal",
            value: "2"
        },
        {
            filterName: "nodeId",
            operator: "in",
            type: "personal",
            value: "2,3"
        },
        {
            filterName: "registeredAt",
            operator: "equal",
            type: "personal",
            value: "2020-07-30"
        },
        {
            filterName: "registeredAt",
            operator: "not_equal",
            type: "personal",
            value: "2020-07-15"
        },
        {
            filterName: "registeredAt",
            operator: "less",
            type: "personal",
            value: "2020-07-17"
        },
        {
            filterName: "registeredAt",
            operator: "less_or_equal",
            type: "personal",
            value: "2020-07-22"
        },
        {
            filterName: "registeredAt",
            operator: "greater",
            type: "personal",
            value: "2020-07-15"
        },
        {
            filterName: "registeredAt",
            operator: "greater_or_equal",
            type: "personal",
            value: "2020-06-29"
        },
        {
            filterName: "registeredAt",
            operator: "between",
            type: "personal",
            value: "2020-07-13,2020-07-22"
        },
        {
            logic: 'OR',
            type: "group",
            conditions: [
                {
                    filterName: "gender",
                    operator: "in",
                    type: "personal",
                    value: "1,0"
                },
                {
                    currency: "1",
                    dateFrom: "2020-07-06",
                    dateTo: "2020-07-29",
                    filterName: "betsAmount",
                    operator: "equal",
                    period: "arbitrary",
                    type: "financial",
                    value: 3
                },
                {
                    currency: "6",
                    filterName: "depositsAvg",
                    operator: "equal",
                    period: "all_time",
                    type: "financial",
                    value: 8
                },
                {
                    logic: 'OR',
                    type: "group",
                    conditions: [
                        {
                            filterName: "gender",
                            operator: "in",
                            type: "personal",
                            value: "1,0"
                        },
                        {
                            currency: "1",
                            dateFrom: "2020-07-06",
                            dateTo: "2020-07-29",
                            filterName: "betsAmount",
                            operator: "equal",
                            period: "arbitrary",
                            type: "financial",
                            value: 3
                        },
                        {
                            currency: "6",
                            filterName: "depositsAvg",
                            operator: "equal",
                            period: "all_time",
                            type: "financial",
                            value: 8
                        },
                    ]
                },
            ]
        },
        {
            currency: "1",
            filterName: "depositsAvg",
            operator: "equal",
            period: "all_time",
            type: "financial",
            value: 9
        },
        {
            currency: "1",
            dateFrom: "2020-07-06",
            dateTo: "2020-07-29",
            filterName: "betsAmount",
            operator: "equal",
            period: "arbitrary",
            type: "financial",
            value: 3
        },
    ]
};




const stringify = JSON.stringify;
const {queryBuilderFormat, jsonLogicFormat, queryString, mongodbFormat, sqlFormat, getTree, checkTree, loadTree, uuid, loadFromJsonLogic, isValidTree} = Utils;
const preStyle = { backgroundColor: 'darkgrey', margin: '10px', padding: '10px' };
const preErrorStyle = { backgroundColor: 'lightpink', margin: '10px', padding: '10px' };

const initialSkin = "antd";
const emptyInitValue: JsonTree = {id: uuid(), type: "group"};
const loadedConfig = loadConfig(initialSkin);
let initValue: JsonTree = loadedInitValue && Object.keys(loadedInitValue).length > 0 ? loadedInitValue as JsonTree : emptyInitValue;



const parsedPreset = reverseParseSection(preset);
let initLogic: JsonLogicTree = parsedPreset && Object.keys(parsedPreset).length > 0 ? parsedPreset as JsonLogicTree : undefined;
let initTree = checkTree(loadFromJsonLogic(initLogic, loadedConfig), loadedConfig); // <- this will work same

// let initLogic: JsonLogicTree = loadedInitLogic && Object.keys(loadedInitLogic).length > 0 ? loadedInitLogic as JsonLogicTree : undefined;


// let initTree;
// initTree = checkTree(loadTree(initValue), loadedConfig);


//initTree = checkTree(loadFromJsonLogic(initLogic, loadedConfig), loadedConfig); // <- this will work same  

const updateEvent = new CustomEvent('update', { detail: {
  config: loadedConfig,
  _initTree: initTree,
  _initValue: initValue,
} });
window.dispatchEvent(updateEvent);


interface DemoQueryBuilderState {
  tree: ImmutableTree;
  config: Config;
  skin: String,
}

export default class DemoQueryBuilder extends Component<{}, DemoQueryBuilderState> {
    private immutableTree: ImmutableTree;
    private config: Config;

    componentDidMount() {
      window.addEventListener('update', this.onConfigChanged);
    }

    componentWillUnmount() {
      window.removeEventListener('update', this.onConfigChanged);
    }

    state = {
      tree: initTree, 
      config: loadedConfig,
      skin: initialSkin
    };

    render = () => (
      <div>
        <Query
            {...this.state.config}
            value={this.state.tree}
            onChange={this.onChange}
            renderBuilder={this.renderBuilder}
        />

        <select value={this.state.skin} onChange={this.changeSkin}>
          <option key="vanilla">vanilla</option>
          <option key="antd">antd</option>
        </select>
        <button onClick={this.resetValue}>reset</button>
        <button onClick={this.clearValue}>clear</button>

        <div className="query-builder-result">
          {this.renderResult(this.state)}
        </div>
      </div>
    )

    onConfigChanged = ({detail: {config, _initTree, _initValue}}: CustomEvent) => {
      this.setState({
        config,
      });
      initTree = _initTree;
      initValue = _initValue;
    }

    resetValue = () => {
      this.setState({
        tree: initTree, 
      });
    };

    changeSkin = (e) => {
      const skin = e.target.value;
      const config = loadConfig(e.target.value);
      this.setState({
        skin,
        config,
        tree: checkTree(this.state.tree, config)
      });
    };

    clearValue = () => {
      this.setState({
        tree: loadTree(emptyInitValue),
      });
    };

    renderBuilder = (props: BuilderProps) => (
      <div className="query-builder-container" style={{padding: '10px'}}>
          <div className="query-builder qb-lite">
              <Builder {...props} />
          </div>
      </div>
    )
    
    onChange = (immutableTree: ImmutableTree, config: Config) => {
      this.immutableTree = immutableTree;
      this.config = config;
      this.updateResult();
      const jsonTree = getTree(immutableTree); //can be saved to backend
    }

    updateResult = throttle(() => {
      this.setState({tree: this.immutableTree, config: this.config});
    }, 100)

    renderResult = ({tree: immutableTree, config} : {tree: ImmutableTree, config: Config}) => {
      const {logic, data, errors} = jsonLogicFormat(immutableTree, config);
      const isValid = isValidTree(immutableTree);
      console.log(isValid);

      return (
      <div>
        <br />
        <div>
          stringFormat: 
          <pre style={preStyle}>
            {stringify(queryString(immutableTree, config), undefined, 2)}
          </pre>
        </div>
        <hr/>
        <div>
          humanStringFormat: 
          <pre style={preStyle}>
            {stringify(queryString(immutableTree, config, true), undefined, 2)}
          </pre>
        </div>
        <hr/>
        <div>
          sqlFormat: 
            <pre style={preStyle}>
              {stringify(sqlFormat(immutableTree, config), undefined, 2)}
            </pre>
        </div>
        <hr/>
        <div>
          mongodbFormat: 
            <pre style={preStyle}>
              {stringify(mongodbFormat(immutableTree, config), undefined, 2)}
            </pre>
        </div>
        <hr/>
        <div>
          <a href="http://jsonlogic.com/play.html" target="_blank">jsonLogicFormat</a>: 
            { errors.length > 0 && 
              <pre style={preErrorStyle}>
                {stringify(errors, undefined, 2)}
              </pre> 
            }
            { !!logic &&
              <pre style={preStyle}>
                // Rule:<br />
                {stringify(logic, undefined, 2)}
                <br />
                <hr />
                // Data:<br />
                {stringify(data, undefined, 2)}
              </pre>
            }
        </div>
        <hr/>
        <div>
          Tree: 
          <pre style={preStyle}>
            {stringify(getTree(immutableTree), undefined, 2)}
          </pre>
        </div>
        {/* <hr/>
        <div>
          queryBuilderFormat: 
            <pre style={preStyle}>
              {stringify(queryBuilderFormat(immutableTree, config), undefined, 2)}
            </pre>
        </div> */}
      </div>
      )
  }

}
