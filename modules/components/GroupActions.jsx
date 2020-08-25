import React, { PureComponent } from 'react';
import {Utils} from "../index";

const groupActionsPositionList = {
  topLeft: 'group--actions--tl',
  topCenter: 'group--actions--tc',
  topRight: 'group--actions--tr',
  bottomLeft: 'group--actions--bl',
  bottomCenter: 'group--actions--bc',
  bottomRight: 'group--actions--br'
}
const defaultPosition = 'topRight';


export class GroupActions extends PureComponent {
  render() {
    const {config, addRule, addGroup, canAddGroup, canAddRule, canDeleteGroup, removeSelf, tree} = this.props;
    const {
      immutableGroupsMode, addRuleLabel, addGroupLabel, delGroupLabel, groupActionsPosition, 
      renderButton: Btn, renderButtonGroup: BtnGrp
    } = config.settings;
    const position = groupActionsPositionList[groupActionsPosition || defaultPosition];

    let disabled;
    const countRules = (children) => {
      let count = 0;
      for (let obj in children) {
        if (children[obj].type === "rule" || children[obj].type === "rule_group") {
          count += 1 ;
        } else {
          count +=  countRules(children[obj].children1)
        }
      }
      return count;
    };
    let properties = tree.get('properties');
    if (properties) {
      // let numberOfRues = properties.get('numberOfRules');
      let numberOfRues = countRules(Utils.getTree(tree).children1);

      if (numberOfRues && numberOfRues >= config.settings.maxNumberOfRules) {
        disabled = true;
      } else {
        disabled = false;
      }
    } else  {
      disabled = false;
    }


    const addRuleBtn = !immutableGroupsMode && canAddRule && <Btn
      type="addRule" onClick={addRule} label={addRuleLabel} config={config} disabled={disabled}
    />;
    const addGroupBtn = !immutableGroupsMode && canAddGroup && <Btn
      type="addGroup" onClick={addGroup} label={addGroupLabel} config={config} disabled={disabled}
    />;
    const delGroupBtn = !immutableGroupsMode && canDeleteGroup && <Btn
      type="delGroup" onClick={removeSelf} label={delGroupLabel} config={config}
    />;


    return (
      <div className={`group--actions ${position}`}>
        <BtnGrp config={config}>
          {addRuleBtn}
          {addGroupBtn}
          {delGroupBtn}
        </BtnGrp>
      </div>
    )
  }
}
