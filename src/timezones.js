import React from "react";

import { Select } from "antd";

import { tz_gmts } from "./tz_gmts";
import { tz_gmt_deviants } from "./tz_gmt_deviants";

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

Object.entries(tz_gmts).forEach(entry => {
  let key = entry[0];
  let value = entry[1];
  items.push(<Option value={value}>{key}</Option>);
});

Object.entries(tz_gmt_deviants).forEach(entry => {
  let key = entry[0];
  let value = entry[1];
  items.push(<Option value={value}>{key}</Option>);
});

items.sort(
  (a, b) =>
    parseFloat(
      (a.props.children.replace(/(GMT|UTC)/, "") || "0").replace(":", ".")
    ) -
    parseFloat(
      (b.props.children.replace(/(GMT|UTC)/, "") || "0").replace(":", ".")
    )
);

class TimezoneSelect extends React.Component {
  render() {
    return (
      <Select
        showSearch
        style={{ width: "100%" }}
        placeholder="Selezionare un UTC/GMT Timezone"
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

export default TimezoneSelect;
