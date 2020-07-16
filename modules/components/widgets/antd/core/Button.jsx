import React from 'react';
import { Button } from 'antd';
import { PlusOutlined, PlusCircleOutlined, DeleteFilled } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';

export default ({type, onClick, label, config: {settings}, disabled}) => {
  const typeToIcon = {
    "addRule": <PlusOutlined />,
    "addGroup": <PlusCircleOutlined />,
    "delRule": <FontAwesomeIcon icon={faTrashAlt} size="1x" />,
    "delGroup": <FontAwesomeIcon icon={faTrashAlt} size="1x" />,

    "addRuleGroup": <PlusOutlined />,
    "delRuleGroup": <FontAwesomeIcon icon={faTrashAlt} size="1x" />,
  };

  const typeToClass = {
    "addRule": "action action--ADD-RULE",
    "addGroup": "action action--ADD-GROUP",
    "delRule": "action action--DELETE", //?
    "delGroup": "action action--DELETE",

    "addRuleGroup": <PlusOutlined />,
    "delRuleGroup": <FontAwesomeIcon icon={faTrashAlt} size="1x" />,
  };

  const typeToType = {
    "delRule": "danger",
    "delGroup": "danger",
    "delRuleGroup": "danger",
  };

  const {renderSize} = settings;

  const btnLabel = type == "addRuleGroup" ? "" : label;

  return (
    <Button
      key={type}
      type={typeToType[type] || "default"}
      icon={typeToIcon[type]}
      className={typeToClass[type]}
      onClick={onClick}
      size={renderSize}
      disabled={disabled}
    >{btnLabel}</Button>
  )
};
