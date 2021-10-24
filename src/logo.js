import React from "react";
import SVG from "react-inlinesvg";

import { useBreakpoint } from "./breakpoint.js";

const LogoLg = () => <SVG src="logo.svg" />;
const LogoXs = () => <SVG src="logo-xs.svg" />;

const Logo = () => {
  const breakpoints = useBreakpoint();

  return (
    <span>
      <div className="alifa-cloud-logo-xs">
        <LogoXs />
      </div>
      <div className="alifa-cloud-logo">
        <LogoLg />
      </div>
    </span>
  );
};

export default Logo;
