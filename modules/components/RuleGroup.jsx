import React from 'react';
import PropTypes from 'prop-types';
import GroupContainer from './containers/GroupContainer';
import Draggable from './containers/Draggable';
import {Group} from './Group';
import {RuleGroupActions} from './RuleGroupActions';
import {FieldWrapper} from './Rule';
import {useOnPropsChanged} from "../utils/stuff";
import { ExclamationCircleFilled } from '@ant-design/icons';


@GroupContainer
@Draggable("group rule_group")
class RuleGroup extends Group {
  static propTypes = {
    ...Group.propTypes,
    selectedField: PropTypes.string,
    parentField: PropTypes.string,
    setField: PropTypes.func,
    removeError: PropTypes.func,
    item: PropTypes.any
  };

  constructor(props) {
      super(props);
      this.arrRequiredFields = [];
      useOnPropsChanged(this);
      this.onPropsChanged(props);
  }

  onPropsChanged(nextProps) {
  }

  childrenClassName = () => 'rule_group--children';
  
  renderHeaderWrapper = () => null;
  renderFooterWrapper = () => null;
  renderConjs = () => null;
  canAddGroup = () => false;
  canAddRule = () => true;
  canDeleteGroup = () => false;

  reordableNodesCnt() {
    const {children1} = this.props;
    return children1.size;
  }

  renderChildrenWrapper() {
    const divStyleRow = {
      display: 'flex',
      flexFlow: 'row',
    };
    return (
      <div className="rule--body--wrapper">
        <div className="rule-group-rows">
        {this.renderDrag()}
        {this.renderField()}
        {this.renderActions()}
        {super.renderChildrenWrapper()}
        </div>
        {this.ifRuleGroup() && this.arrRequiredFields.length > 0 && !this.ifErrorGroup()?
          <div>{this.errorMessageRequiredField(this.arrRequiredFields)}</div> : null}
      </div>
    );
  }

  errorMessageRequiredField(fields) {
    const {config} = this.props;
    let newFields = [...fields];
    let indexVal = newFields.indexOf('value');
    let indexCur = newFields.indexOf('currency');
    if (indexVal !== -1) {
      newFields.splice(indexVal, 1, config.settings.amountLabel);
    }
    if (indexCur !== -1) {
      newFields.splice(indexCur, 1, config.settings.currencyLabel);
    }
    newFields = newFields.map(el => el.charAt(0).toUpperCase() + el.slice(1));
       return <div className="rule--group-error">
          <p><ExclamationCircleFilled className="icon-red"/> {config.settings.addRequiredFieldMessage}
            <span> {newFields.join(', ')}</span>
          </p>
      </div>
  }

  ifRuleGroup() {
    const {selectedField, children1, config} = this.props;
    if (selectedField && selectedField.split('.').length === 2 &&
        config.fields[selectedField.split('.')[0]].subfields[selectedField.split('.')[1]].type === '!group') {
      let rule = selectedField.split('.');
      let requiredRules = [...config.fields[rule[0]].subfields[rule[1]].requiredFields];
      if (children1) {
        this.checkRequiredNestedFields(children1, requiredRules)
      }
      return true;
    }
  }

  ifErrorGroup() {
    const {item} = this.props;

    let validity = item.get('properties').get('validity');
    if (validity === undefined) {
      validity = true;
    }
    return validity;
  }

  checkRequiredNestedFields(children, requiredRules) {
    const arrChildrenSelected = [];
    // let requiredRules = ['currency', 'value'];
    children.forEach(function (item) {
      let temp = {
        keyField: null
      };
      temp.keyField = item.get('properties').get('field');

      arrChildrenSelected.push(temp);
    });
        for (let i = 0; i < arrChildrenSelected.length; i++) {
          if (arrChildrenSelected[i].keyField && arrChildrenSelected[i].keyField !== null && arrChildrenSelected[i].keyField.split('.').length > 1) {
            let temp = arrChildrenSelected[i].keyField.split('.')[2];
            let index = requiredRules.indexOf(temp);
            if (index !== -1) {
              requiredRules.splice(index, 1)
            }
          }
        }
    if (requiredRules.length <= 0) {
        this.props.removeError();
    }

    this.arrRequiredFields = requiredRules;
  }

  renderField() {
    const { immutableFieldsMode } = this.props.config.settings;
    return <FieldWrapper
      key="field"
      classname={"group--field"}
      config={this.props.config}
      selectedField={this.props.selectedField}
      setField={this.props.setField}
      parentField={this.props.parentField}
      readonly={immutableFieldsMode}
    />;
  }

  renderActions() {
    const {config, addRule} = this.props;

    return <RuleGroupActions
      config={config}
      addRule={addRule}
      canAddRule={this.canAddRule()}
      canDeleteGroup={this.canDeleteGroup()}
      removeSelf={this.removeSelf}
    />;
  }

  extraPropsForItem(_item) {
    return {
      parentField: this.props.selectedField
    };
  }
}


export default RuleGroup;
