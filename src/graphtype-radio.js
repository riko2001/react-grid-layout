import React from "react";
import { useBreakpoint } from "./breakpoint.js";

import { Switch, Radio } from "antd";

import "./graphtype-radio.css";

const GraphTypeRadioGroupWrapper = ({ children }) => {
  const breakpoints = useBreakpoint();

  const className = breakpoints["sm"] || breakpoints["xs"] ? "sm" : "";

  return (
    <div className={"graphtype-radio-wrapper-" + className}>{children}</div>
  );
};

export default class GraphTypeRadioGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state.optionA = props.optionA;
    this.state.optionB = props.optionB;
  }

  state = {
    value: 1,
    optionA: null,
    optionB: null
  };

  onChange = e => {
    //console.log("radio checked", e.target.value);
    this.setState({
      value: e.target.value
    });
  };

  render() {
    /*const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px"
    };*/
    return (
      <GraphTypeRadioGroupWrapper>
        <div className="graphtype-radio-wrapper">
          <div className="graphtype-radio-container">
            <div className="graphtype-radio-inner-container">
              <div className="graphtype-radio-header">
                <div className="graphtype-radio-title">
                  Tipologia grafico predefinita
                </div>
                <div className="graphtype-radio-switch">
                  <Switch defaultChecked />
                </div>
              </div>
              <Radio.Group
                className="graphtype-radio-group"
                onChange={this.onChange}
                value={this.state.value}
              >
                <Radio className="graphtype-radio-item" value={1}>
                  {this.state.optionA}
                </Radio>
                <Radio className="graphtype-radio-item" value={2}>
                  {this.state.optionB}
                </Radio>
              </Radio.Group>
            </div>
          </div>
        </div>
      </GraphTypeRadioGroupWrapper>
    );
  }
}
