import React from "react";
import { useBreakpoint } from "./breakpoint.js";

import styled from "styled-components";

//import PlanFlexBox from "./plan-flexbox";

import { Icon, Row, Col } from "antd";

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

  const flexbox =
    breakpoints["xs"] || breakpoints["sm"] || breakpoints["md"] ? (
      <FlexBox>
        <Row
          type="flex"
          justify="center"
          gutter={[0, 80]}
          style={planInfoRowStyle}
        >
          <Col>
            <Col>
              <section className="user-form-icon-container">
                <Row type="flex" justify="center">
                  <Col>
                    <div className="user-form-meme-wrapper">
                      <div className="user-circle-miniature" />
                    </div>
                  </Col>
                </Row>
                <Row type="flex" justify="center">
                  <Col>
                    <div className="user-form-meme-wrapper">
                      <div className="user-form-meme-container">
                        <div className={"user-form-denomination-" + sz}>
                          User Name
                        </div>
                        <div className="user-form-meme-container">
                          <div className="user-form-level">PRO</div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </section>
            </Col>
          </Col>
        </Row>
      </FlexBox>
    ) : (
      <Row>
        <Col
          className="user-form-plan-info"
          lg={{ span: 18, push: 1, offset: 0 }}
          md={{ span: 18, push: 1, offset: 0 }}
        >
          <Row type="flex">
            <Col lg={{ span: 12, offset: 0 }} md={{ span: 24, offset: 0 }}>
              <div className="user-form-meme-wrapper user-form-icon-container">
                <div className="user-circle-miniature" />
              </div>
            </Col>
            <Col
              lg={{ span: 12, offset: 0, push: 3 }}
              md={{ span: 24, offset: 0 }}
            >
              <div
                className={
                  "user-form-meme-wrapper user-form-flexbox-wrapper user-form-meme-first-line-" +
                  (sz === "lg" ? "large" : "small")
                }
              >
                <div className="user-form-meme-container">
                  <div className={"user-form-denomination-" + sz}>
                    User Name
                  </div>
                </div>
              </div>
              <div className="user-form-meme-wrapper user-form-flexbox-wrapper user-form-meme-second-line">
                <div className="user-form-meme-container">
                  <div className="user-form-level">PRO</div>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    );

  return flexbox;
};

export default PlanMeme;
