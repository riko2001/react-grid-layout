import React from "react";
import { useBreakpoint } from "./breakpoint.js";

import { Row, Col } from "antd";

import PlanMeme from "./plan-meme";
import PlanInfo from "./plan-info";

const PlanFlexBox = ({ plan, expiration }) => {
  const breakpoints = useBreakpoint();

  const display = /*breakpoints["md"] ? "none" :*/ "block";

  return (
    <Row gutter={[16, { xs: 16, sm: 32, md: 32, lg: 0 }]}>
      <Col
        xs={{ span: 24, offset: 0 }}
        sm={{ span: 24, offset: 0 }}
        md={{ span: 24, offset: 0 }}
        lg={{ span: 8, offset: 0 }}
      >
        <PlanMeme />
      </Col>
      <Col
        xs={{ span: 21, offset: 2 }}
        sm={{ span: 21, offset: 2 }}
        md={{ span: 21, offset: 2 }}
        lg={{ span: 16, offset: 0 }}
      >
        <PlanInfo />
      </Col>
    </Row>
  );
};

export default PlanFlexBox;
