import React, { useState } from "react";

import { useBreakpoint } from "./breakpoint.js";

import { Row, Col } from "antd";

import Icon from "./icons";

const HeaderWrapper = ({ children }) => {
  const breakpoints = useBreakpoint();

  const [usermenuShown, setUsermenuShown] = useState(false);

  return (
    <Row gutter={0}>
      <Col span={20}>{children}</Col>
      <Col span={4}>
        <Row gutter={[0, 0]}>
          <Col className="gutter-row" span={24} pull={4}>
            <div
              style={{ display: breakpoints["sm"] ? "none" : "block" }}
              className={"user-menu " + (usermenuShown ? "show" : "")}
              onClick={() => {
                setUsermenuShown(!usermenuShown);
              }}
            >
              <div className="user-menu-item">
                <div className="user-image-wrapper">
                  <span className="user-image">
                    <Icon type="user" />
                  </span>
                </div>
                <div className="user-name-wrapper">
                  <div className="user-name-content">
                    User Name <Icon type={usermenuShown ? "up" : "down"} />
                  </div>
                </div>
              </div>
              <div className="user-dropdown">
                <a href="#!" className="dropdown-item">
                  <span className="mr-3">&nbsp;</span>
                  Profilo
                </a>
                <a href="#!" className="dropdown-item">
                  <span className="mr-3">&nbsp;</span>
                  Impostazioni
                </a>
                <a href="#!" className="dropdown-item">
                  <span className="mr-3">&nbsp;</span>
                  Esci
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default HeaderWrapper;
