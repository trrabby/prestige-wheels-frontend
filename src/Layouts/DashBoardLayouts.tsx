import React from "react";
import { Layout, theme } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const { Header, Content, Footer } = Layout;

const DashBoardLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className="min-h-screen">
      <Sidebar></Sidebar>
      <Layout>
        <Header
          style={{
            padding: 0,
            color: "white",
            fontSize: "50px",
            textAlign: "center",
            fontWeight: "bold",
            width: "100%",
          }}
        >
          Ink <span className="text-amber-200">Hives</span>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet></Outlet>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          ©{new Date().getFullYear()} Created by Towfique
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashBoardLayout;
