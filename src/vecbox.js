import React from "react";
import { useBreakpoint } from "./breakpoint.js";
import SVG from "react-inlinesvg";

const VecBoxSvg = () => <SVG src="duinominiature.svg" />;

const VecBox = ({ plan, expiration }) => {
  const breakpoints = useBreakpoint();

  const display =
    breakpoints["xs"] || breakpoints["sm"] || breakpoints["md"]
      ? "none"
      : "block";

  return (
    <span style={{ display: display }}>
      <VecBoxSvg />
    </span>
  );
};

export default VecBox;
