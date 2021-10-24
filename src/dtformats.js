import React from "react";

import { Select } from "antd";

const { Option } = Select;

function onChange(value) {
  console.log(`selected ${value}`);
}

function onBlur() {
  console.log("blur");
}

function onFocus() {
  console.log("focus");
}

function onSearch(val) {
  console.log("search:", val);
}

const items = [];

items.push(<Option value="DD-MM-YYYY">DD-MM-YYYY</Option>);

class DateTimeFormatSelect extends React.Component {
  render() {
    return (
      <Select
        showSearch
        style={{ width: "100%" }}
        placeholder="Selezionare un Formato Data"
        optionFilterProp="children"
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onSearch={onSearch}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {items}
      </Select>
    );
  }
}

export default DateTimeFormatSelect;
