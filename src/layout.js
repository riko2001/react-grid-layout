import React, { useState } from "react";
import { useBreakpoint } from "./breakpoint.js";
import PropTypes from "prop-types";
import MobileLogo from "./mobile-logo";
import HamburgerButton from "./hamburger-button";
import HeaderWrapper from "./header-wrapper";
import { Row, Col, Layout, Menu, Drawer, Button /*,Icon*/ } from "antd";

import Icon from "./icons";

import Logo from "./logo";

import EventDispatcher from "./event-dispatcher";

const { Header, Content, Sider } = Layout;

const AntLayout = props => {
  const breakpoints = useBreakpoint();

  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(false);

  return (
    <Layout
      style={{
        minHeight: "100vh"
      }}
    >
      <Sider
        style={{ display: breakpoints["sm"] ? "none" : "block" }}
        trigger={null}
        breakpoint="lg"
        collapsible
        collapsed={collapsed}
      >
        <Logo />
        <Menu theme="light" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1">
            <Icon type="dashboard" />
            <span>Dashboard</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="fund" />
            <span>Reports</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="box-plot" />
            <span>Datalogger</span>
          </Menu.Item>
          <div
            className={
              (props.hideWarning ? "sidebar-dlwarning-hidden " : "") +
              "sidebar-dlwarning " +
              (collapsed
                ? "sidebar-dlwarning-collapsed"
                : "sidebar-dlwarning-expanded")
            }
          >
            <span
              className={
                "sidebar-dlwarning-bullet " +
                "sidebar-dlwarning-" +
                (!!props.hasWarning ? "on" : "off")
              }
            >
              {!collapsed ? "\u2022\xa0\xa0" : "\u2022"}
            </span>
            <span
              className={
                "sidebar-dlwarning-message " +
                "sidebar-dlwarning-" +
                (!!props.hasWarning ? "on" : "off")
              }
            >
              {!collapsed ? (!props.hasWarning ? "ON LINE" : "WARNING") : ""}
            </span>
          </div>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }}>
          <HeaderWrapper>
            <HamburgerButton
              visible={(breakpoints["sm"] && !visible) || visible}
              onClick={() => {
                const newVisibility = !visible;
                setVisible(newVisibility);
              }}
            >
              &nbsp;
            </HamburgerButton>
            <Row>
              <Col
                xs={{ span: 12 }}
                sm={{ span: 1 }}
                md={{ span: 1 }}
                lg={{ span: 1 }}
              />
              <Col
                xs={{ span: 4, pull: 0 }}
                sm={{ span: 4, pull: 1 }}
                md={{ span: 4, pull: 1 }}
                lg={{ span: 4, pull: 1 }}
              >
                <Button
                  style={{
                    outline: "none",
                    textDecoration: "none",
                    color: "#595959",
                    display: breakpoints["sm"] ? "none" : "inline-block"
                  }}
                  type="link"
                  onClick={() => {
                    EventDispatcher.publish(
                      "alifa.sidemenu.collapsed",
                      !collapsed
                    );
                    setCollapsed(!collapsed);
                  }}
                >
                  <Icon
                    className="sidebar-custom-trigger"
                    type={collapsed ? "menu-unfold" : "menu-fold"}
                  />
                </Button>
              </Col>
              <div
                className="mobile-logo-wrapper"
                style={{
                  display:
                    breakpoints["sm"] || breakpoints["xs"] ? "block" : "none"
                }}
              >
                <div className="mobile-logo-container">
                  <MobileLogo />
                </div>
              </div>
            </Row>
          </HeaderWrapper>
          {/*<Icon
            className="sidebar-custom-trigger"
            type={collapsed ? "menu-unfold" : "menu-fold"}
            style={{
              display: breakpoints["sm"] ? "none" : "inline-block"
            }}
            onClick={() => {
              setCollapsed(!collapsed);
            }}
          />
          <HeaderWrapper>
            <HamburgerButton
              visible={(breakpoints["sm"] && !visible) || visible}
              onClick={() => {
                const newVisibility = !visible;
                setVisible(newVisibility);
              }}
            >
              &nbsp;
            </HamburgerButton>
            </HeaderWrapper>*/}
        </Header>
        <Content>
          <Drawer
            className={!props.hasWarning ? "" : "ant-drawer-show-warning"}
            data-warning-message={!props.hasWarning ? "ON LINE" : "WARNING"}
            title="Alifa Cloud"
            placement={"left"}
            closable={false}
            onClose={() => {
              // do nothing
            }}
            visible={visible}
          >
            <Menu theme="light" defaultSelectedKeys={["1"]} mode="inline">
              <Menu.Item key="1">
                <Icon type="dashboard" />
                <span>Dashboard</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="fund" />
                <span>Reports</span>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="box-plot" />
                <span>Datalogger</span>
              </Menu.Item>
              <Menu.Item key="4">
                <Icon type="user" />
                <span>Profilo</span>
              </Menu.Item>
              <Menu.Item key="5">
                <Icon type="control" />
                <span>Impostazioni</span>
              </Menu.Item>
              <Menu.Item key="6">
                <Icon type="disconnect" />
                <span>Esci</span>
              </Menu.Item>
            </Menu>
          </Drawer>

          <div>{props.children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};

AntLayout.propTypes = {
  hasWarning: PropTypes.bool,
  hideWarning: PropTypes.bool
};

export default AntLayout;
