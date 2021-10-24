import React from "react";
import { useBreakpoint } from "./breakpoint.js";

const LastPingDate = ({ datetime }) => {
  const breakpoints = useBreakpoint();

  //let m = (datetime || "").match(/^(\d{1,2})[^0-9](\d{1,2})[^0-9](\d{4})/);
  //if (breakpoints["m1"] && m) datetime = m[1] + "-" + m[2] + "-" + m[3];

  //if (breakpoints["md"] || breakpoints["sm"] || breakpoints["xs"])
  //  return <span />;

  let className =
    breakpoints["sm"] || breakpoints["xs"]
      ? "ping-date-narrowed-aligment"
      : breakpoints["md"]
      ? "ping-date-quasi-narrowed-aligment"
      : "";

  return (
    <span style={{ whiteSpace: "nowrap" }} className={className}>
      {datetime}
    </span>
  );
};

export default LastPingDate;
