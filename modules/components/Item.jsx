import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Rule from './Rule';
import Group from './Group';
import RuleGroup from './RuleGroup';

const typeMap = {
  rule: (props) => {

    const validationSpanStyle = {
      color: 'red',
      fontFamily: "Arial",
      fontSize: '13px',
      display: (props.validity || props.validity === undefined) && props.config.settings.showErrorMessage? 'none' : 'block',
    };

    return  (
        <>
      <Rule
          {...props.properties.toObject()}
          id={props.id}
          path={props.path}
          actions={props.actions}
          treeNodesCnt={props.treeNodesCnt}
          config={props.config}
          onDragStart={props.onDragStart}
          parentField={props.parentField}
          validity={props.validity}
          errorMessage={props.errorMessage}
      />
      <span style={validationSpanStyle}>{props.errorMessage}</span>
    </>
    )
  },
  group: (props) => (
    <Group 
      {...props.properties.toObject()}
      id={props.id}
      path={props.path}
      actions={props.actions}
      config={props.config}
      //tree={props.tree}
      treeNodesCnt={props.treeNodesCnt}
      onDragStart={props.onDragStart}
      children1={props.children1}
      parentField={null}
      validity={props.validity}
      errorMessage={props.errorMessage}
    />
  ),
  rule_group: (props) => (
    <RuleGroup 
      {...props.properties.toObject()}
      id={props.id}
      path={props.path}
      actions={props.actions}
      config={props.config}
      //tree={props.tree}
      treeNodesCnt={props.treeNodesCnt}
      onDragStart={props.onDragStart}
      children1={props.children1}
      parentField={props.parentField}
      validity={props.validity}
      errorMessage={props.errorMessage}
    />
  )
};


class Item extends PureComponent {
  static propTypes = {
    //tree: PropTypes.instanceOf(Immutable.Map).isRequired,
    config: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(Object.keys(typeMap)).isRequired,
    path: PropTypes.any.isRequired, //instanceOf(Immutable.List)
    properties: PropTypes.any.isRequired, //instanceOf(Immutable.Map)
    children1: PropTypes.any, //instanceOf(Immutable.OrderedMap)
    actions: PropTypes.object.isRequired,
    treeNodesCnt: PropTypes.number,
    onDragStart: PropTypes.func,
    parentField: PropTypes.string, //from RuleGroup
    validity:PropTypes.bool,
      errorMessage:PropTypes.string
  };

  render() {
    const { type, ...props } = this.props;
    return typeMap[type](props);
  }
}

export default Item;
