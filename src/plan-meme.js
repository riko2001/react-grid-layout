import React from "react";
import { useBreakpoint } from "./breakpoint.js";

import styled from "styled-components";

//import PlanFlexBox from "./plan-flexbox";

import { Row, Col } from "antd";

import "./plan-meme.css";

const planInfoRowStyle = { width: "100%", padding: "0" };

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PlanMeme = () => {
  const breakpoints = useBreakpoint();
  /*const display =
    breakpoints["xs"] ||
    breakpoints["sm"] ||
    breakpoints["md"] ||
    breakpoints["m3"]
      ? "none"
      : "block";*/
  const sz = breakpoints["xs"]
    ? "xs"
    : breakpoints["sm"]
    ? "sm"
    : breakpoints["md"]
    ? "md"
    : "lg";

  const justify = breakpoints["lg"] ? "start" : "center";

  return (
    <Row>
      <Col span={24}>
        <Row style={{ "justify-content": "center" }} type="flex">
          <Col xs={2} sm={3} md={8} lg={12}>
            <div
              style={{
                background: "#fdbcc8",
                width: "80px",
                height: "80px",
                "border-radius": "50%",
                "-moz-border-radius": "50%",
                "-webkit-border-radius": "50%"
              }}
            />
          </Col>
          <Col
            xs={{ span: 2, offset: 21, pull: 11 }}
            sm={{ span: 3, offset: 21, pull: 10 }}
            md={{ span: 8, offset: 0, pull: 0 }}
            lg={{ span: 12, offset: 0, pull: 0 }}
          >
            <Row>
              <Col span={24} offset={4}>
                &nbsp;
              </Col>
              <Col
                xs={{ span: 2, offset: 21, pull: 11 }}
                sm={{ span: 4, offset: 2, pull: 8 }}
                md={{ span: 8, offset: 0, pull: 0 }}
                lg={{ span: 12, offset: 0, pull: 0 }}
                style={{ width: "180px" }}
              >
                <div
                  className={"plan-meme-user-name plan-meme-user-level-" + sz}
                  data-level="pro"
                >
                  User Name
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default PlanMeme;
