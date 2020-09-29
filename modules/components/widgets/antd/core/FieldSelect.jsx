import React, { PureComponent } from 'react';
import { Tooltip, Select, Typography } from 'antd';
import {BUILT_IN_PLACEMENTS, SELECT_WIDTH_OFFSET_RIGHT, SELECT_WIDTH_ICON, calcTextWidth} from "../../../../utils/stuff";
import PropTypes from 'prop-types';
const { Option, OptGroup } = Select;
import keys from 'lodash/keys';


export default class FieldSelect extends PureComponent {
  static propTypes = {
      config: PropTypes.object.isRequired,
      customProps: PropTypes.object,
      items: PropTypes.array.isRequired,
      placeholder: PropTypes.string,
      selectedKey: PropTypes.string,
      selectedKeys: PropTypes.array,
      selectedPath: PropTypes.array,
      selectedLabel: PropTypes.string,
      selectedAltLabel: PropTypes.string,
      selectedFullLabel: PropTypes.string,
      selectedOpts: PropTypes.object,
      readonly: PropTypes.bool,
      childrenSelected: PropTypes.array,
      //actions
      setField: PropTypes.func.isRequired,
  };

  onChange = (key) => {
      this.props.setField(key);
  }

  filterOption = (input, option) => {
    const dataForFilter = option; // tip: props was available on antd < 4
      const keysForFilter = ['title', 'value', 'grouplabel', 'label'];
      const valueForFilter = keysForFilter
        .map(k => (typeof dataForFilter[k] == 'string' ? dataForFilter[k] : ''))
        .join("\0");
      return valueForFilter.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  }

  render() {
      const {
          config, customProps, items, placeholder,
          selectedKey, selectedLabel, selectedOpts, selectedAltLabel, selectedFullLabel, readonly, selectedPath, childrenSelected, parentField
      } = this.props;
      const {showSearch} = customProps || {};

      const selectText = selectedLabel || placeholder;
      const selectWidth = calcTextWidth(selectText);
      const isFieldSelected = !!selectedKey;
      const dropdownPlacement = config.settings.dropdownPlacement;
      const dropdownAlign = dropdownPlacement ? BUILT_IN_PLACEMENTS[dropdownPlacement] : undefined;
      const width = isFieldSelected && !showSearch ? null : selectWidth + SELECT_WIDTH_OFFSET_RIGHT + SELECT_WIDTH_ICON;
      let tooltipText = selectedAltLabel || selectedFullLabel;
      if (tooltipText == selectedLabel)
        tooltipText = null;

      const fieldSelectItems = this.renderSelectItems(items, childrenSelected);

      let res;
      if (placeholder && items  && items.length === 1) {
          res = <div className='single-operator'>
              <span>
              {selectedLabel}
                </span>
              </div>
      } else  {
          res = (
              <Select
                  dropdownAlign={dropdownAlign}
                  dropdownMatchSelectWidth={false}
                  style={{ width }}
                  placeholder={placeholder}
                  size={config.settings.renderSize}
                  onChange={this.onChange}
                  value={selectedKey || undefined}
                  filterOption={this.filterOption}
                  disabled={readonly}
                  {...customProps}
              >{fieldSelectItems}</Select>
          );
      }

      // if (tooltipText && !selectedOpts.tooltip) {
      //   res = <Tooltip title={tooltipText}>{res}</Tooltip>;
      // }

      return res;
  }

  renderSelectItems(fields, childrenSelected) {
    return keys(fields).map(fieldKey => {
        const field = fields[fieldKey];
        const {items, key, path, label, fullLabel, altLabel, tooltip, grouplabel, icon} = field;
        const _path = path || key;
        if (field.path.split('.').length <=2) {
            childrenSelected = null;
        }
            if (items) {
                return <OptGroup
                    key={_path}
                    label={label}
                >
                    {this.renderSelectItems(items)}
                </OptGroup>
            } else {
                const option = tooltip ? <Tooltip title={tooltip}>{label}</Tooltip> : label;
                return <Option
                    key={_path}
                    value={_path}
                    title={altLabel}
                    grouplabel={grouplabel}
                    label={label}
                    disabled={( childrenSelected && childrenSelected.keyField !== null && childrenSelected.some(el => el.keyField === field.path)) ||
                    (childrenSelected && childrenSelected.some(el => {
                        if (el.keyField === null) return;
                        if (el.keyField.split('.')[2] === 'range' && field.path.split('.')[2] === 'period') {
                            return true;
                        }
                        if (el.keyField.split('.')[2] === 'period' && field.path.split('.')[2] === 'range') {
                            return true;
                        }
                    }))}
                >
                    <div><i className={icon + ' query-builder-icon' }></i>{option}</div>
                </Option>;
            }
    });
  }

}
