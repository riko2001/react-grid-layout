import React, { useState } from "react";

import { useBreakpoint } from "./breakpoint.js";

import styled from "styled-components";

const HamburgerMenuButtonRelativeWrapper = ({ children }) => {
  return <div style={{ position: "relative" }}>{children}</div>;
};

const HamburgerMenuButtonWrapper = ({ active, visible, children }) => {
  return (
    <div
      style={{
        display: !visible ? "none" : "inline-block",
        position: !active ? "absolute" : "fixed",
        top: "0",
        left: "0",
        zIndex: "1001"
      }}
    >
      {children}
    </div>
  );
};

const animateHamburgerButton = (el, active) => {
  let position = "0";
  let rotation = "45";
  let color = "transparent";
  if (active) {
    position = "-8px";
    rotation = "0";
    color = "black";
  }
  if (!/SPAN/i.test(el.tagName)) el = el.getElementsByTagName("SPAN")[0];
  el.style.setProperty("--background", color);
  el.style.setProperty("--rotate-before", "rotate(" + rotation + "deg)");
  el.style.setProperty("--rotate-after", "rotate(-" + rotation + "deg)");
  el.style.setProperty("--before-top", position);
  el.style.setProperty("--after-bottom", position);
};

const HamburgerMenuButton = styled.button`
  & {
    background-color: transparent;
    border: 0;
    cursor: pointer;
    float: left;
    height: 50px;
    outline: 0;
    width: 50px;
  }
`;

const HamburgerMenuSpan = styled.span`
  & {
    z-index: 10000;
    background-color: var(--background, black);
    height: 4px;
    position: absolute;
    transition: all 0.3s ease-in-out;
    width: 30px;
  }
  &:before {
    content: "";
    top: var(--before-top, -8px);
    z-index: -1;
    display: block;
    background-color: black;
    transform: var(--rotate-before);
    height: 4px;
    position: absolute;
    transition: all 0.3s ease-in-out;
    width: 30px;
  }
  &:after {
    content: "";
    bottom: var(--after-bottom, -8px);
    z-index: -1;
    display: block;
    background-color: black;
    transform: var(--rotate-after);
    height: 4px;
    position: absolute;
    transition: all 0.3s ease-in-out;
    width: 30px;
  }
`;

const HamburgerButton = ({ visible, onClick }) => {
  const breakpoints = useBreakpoint();
  const [active, setActive] = useState(false);
  const display = active || breakpoints["sm"] ? "block" : "none";

  return (
    <HamburgerMenuButtonRelativeWrapper>
      <HamburgerMenuButtonWrapper active={active} visible={visible}>
        <HamburgerMenuButton
          id="sidebar-hamburger-menu"
          style={{ display: display }}
          onClick={e =>
            onClick() ||
            animateHamburgerButton(e.target, active) ||
            setActive(!active)
          }
        >
          <HamburgerMenuSpan>&nbsp;</HamburgerMenuSpan>
        </HamburgerMenuButton>
      </HamburgerMenuButtonWrapper>
    </HamburgerMenuButtonRelativeWrapper>
  );
};

export default HamburgerButton;
