import React from "react";
import { useBreakpoint } from "./breakpoint.js";

import "./timeline.css";

import { Row, Col } from "antd";

const OnboardingTimeLine = ({ dot1, line1, dot2, line2, dot3, label }) => {
  const breakpoints = useBreakpoint();

  //let m = (datetime || "").match(/^(\d{1,2})[^0-9](\d{1,2})[^0-9](\d{4})/);
  //if (breakpoints["m1"] && m) datetime = m[1] + "-" + m[2] + "-" + m[3];

  //if (breakpoints["md"] || breakpoints["sm"] || breakpoints["xs"])
  //  return <span />;

  const classNameDot1 = !!+dot1
    ? "onboarding-step-dot-on"
    : "onboarding-step-dot-off";

  const classNameDot2 = !!+dot2
    ? "onboarding-step-dot-on"
    : "onboarding-step-dot-off";

  const classNameDot3 = !!+dot3
    ? "onboarding-step-dot-on"
    : "onboarding-step-dot-off";

  const classNameLine1 = !!+line1
    ? "onboarding-step-line-on"
    : "onboarding-step-line-off";

  const classNameLine2 = !!+line2
    ? "onboarding-step-line-on"
    : "onboarding-step-line-off";

  const dataDot1 = !!+dot1 && !+dot2 && !+dot3 ? label : "";
  const dataDot2 = !!+dot1 && !!+dot2 && !+dot3 ? label : "";
  const dataDot3 = !!+dot1 && !!+dot2 && !!+dot3 ? label : "";

  //let className =
  //  breakpoints["sm"] || breakpoints["xs"] ? "" : breakpoints["md"] ? "" : "";

  return (
    <Row type="flex" justify="center">
      <Col>
        <div data-label={dataDot1} className={classNameDot1}>
          &#8226;
        </div>
      </Col>
      <Col span="10" className="onboarding-step-line-container">
        <div className={classNameLine1}>&nbsp;</div>
      </Col>
      <Col>
        <div data-label={dataDot2} className={classNameDot2}>
          &#8226;
        </div>
      </Col>
      <Col span="10" className="onboarding-step-line-container">
        <div className={classNameLine2}>&nbsp;</div>
      </Col>
      <Col>
        <div data-label={dataDot3} className={classNameDot3}>
          &#8226;
        </div>
      </Col>
    </Row>
  );
};

export default OnboardingTimeLine;
