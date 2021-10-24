import React from "react";
import SVG from "react-inlinesvg";

//import { useBreakpoint } from "./breakpoint.js";

import "./mobile-logo.css";

const LogoXs = () => <SVG src="logo-xs.svg" />;

const MobileLogo = () => {
  //const breakpoints = useBreakpoint();

  return (
    <span>
      <LogoXs />
    </span>
  );
};

export default MobileLogo;
