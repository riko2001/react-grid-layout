import React from "react";

import { UserOutlined } from "@ant-design/icons";
import { CaretDownOutlined } from "@ant-design/icons";
import { CaretUpOutlined } from "@ant-design/icons";
import { DashboardOutlined } from "@ant-design/icons";
import { FundOutlined } from "@ant-design/icons";
import { BoxPlotFilled } from "@ant-design/icons";
import { MenuFoldOutlined } from "@ant-design/icons";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import { ControlFilled } from "@ant-design/icons";
import { DisconnectOutlined } from "@ant-design/icons";

export default class Icon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      className: this.props.className || "",
      style: this.props.style || ""
    };
  }
  render() {
    let props = {};
    if (this.state.className) {
      props.className = this.state.className;
    }
    if (this.state.style) {
      props.style = this.state.style;
    }
    if (this.props.type === "user") {
      return <UserOutlined {...props} />;
    }
    if (this.props.type === "up") {
      return <CaretUpOutlined {...props} />;
    }
    if (this.props.type === "down") {
      return <CaretDownOutlined {...props} />;
    }
    if (this.props.type === "dashboard") {
      return <DashboardOutlined />;
    }
    if (this.props.type === "fund") {
      return <FundOutlined {...props} />;
    }
    if (this.props.type === "box-plot") {
      return <BoxPlotFilled {...props} />;
    }
    if (this.props.type === "menu-unfold") {
      return <MenuUnfoldOutlined {...props} />;
    }
    if (this.props.type === "menu-fold") {
      return <MenuFoldOutlined {...props} />;
    }
    if (this.props.type === "control") {
      return <ControlFilled {...props} />;
    }
    if (this.props.type === "disconnect") {
      return <DisconnectOutlined {...props} />;
    }

    return <i />;
  }
}
