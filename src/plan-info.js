import React from "react";
import { useBreakpoint } from "./breakpoint.js";

import { Row, Col } from "antd";

import "./plan-info.css";

const PlanInfo = () => {
  const breakpoints = useBreakpoint();
  const display =
    breakpoints["xs"] ||
    breakpoints["sm"] ||
    breakpoints["md"] ||
    breakpoints["m3"]
      ? "none"
      : "block";
  const sz = breakpoints["xs"]
    ? "xs"
    : breakpoints["sm"]
    ? "sm"
    : breakpoints["md"]
    ? "md"
    : "lg";

  const style =
    "user-form-plan-info-" + sz + " user-form-plan-info user-form-plan-content";

  return (
    <Col
      className={style}
      lg={{ span: 24, push: 0, offset: 0 }}
      md={{ span: 24, push: 0, offset: 0 }}
      sm={{ span: 12, push: 6, offset: 0 }}
      xs={{ span: 12, push: 6, offset: 0 }}
    >
      <Row>
        <Col
          lg={{ span: 6, offset: 0 }}
          md={{ span: 12, offset: 0 }}
          sm={{ span: 24, offset: 0 }}
          xs={{ span: 24, offset: 0 }}
        >
          <div className="plan-flexbox-line1">Il tuo Piano</div>
          <div className="plan-flexbox-line2">Professional</div>
        </Col>
        <Col
          lg={{ span: 6, offset: 2 }}
          md={{ span: 6, offset: 1 }}
          sm={{ span: 24, offset: 0 }}
          xs={{ span: 24, offset: 0 }}
        >
          <div className="plan-flexbox-line1">Scadenza</div>
          <div className="plan-flexbox-line2">12 Maggio 2020</div>
        </Col>
        <Col
          lg={{ span: 6, offset: 2 }}
          md={{ span: 6, offset: 0 }}
          sm={{ span: 24, pull: 0 }}
          xs={{ span: 24, pull: 0 }}
        >
          <div className="plan-flexbox-line1">&nbsp;</div>
          <div className="plan-flexbox-line2">
            <a className="plan-flexbox-link" href="#!">
              Modifica piano
            </a>
          </div>
        </Col>
      </Row>
    </Col>
  );
};

export default PlanInfo;
