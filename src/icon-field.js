import React from "react";
import { useBreakpoint } from "./breakpoint.js";

import { Icon } from "antd";

const IconField = ({ type }) => {
  const breakpoints = useBreakpoint();

  //let m = (datetime || "").match(/^(\d{1,2})[^0-9](\d{1,2})[^0-9](\d{4})/);
  //if (breakpoints["m1"] && m) datetime = m[1] + "-" + m[2] + "-" + m[3];

  //if (breakpoints["md"] || breakpoints["sm"] || breakpoints["xs"])
  //  return <span />;

  return !(breakpoints["sm"] || breakpoints["xs"]) ? (
    <Icon type={type} />
  ) : (
    <span />
  );
};

export default IconField;
