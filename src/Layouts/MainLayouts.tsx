import React from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";

const { Header, Content, Footer, Sider } = Layout;

const items = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  UserOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));

const MainLayouts: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className="min-h-screen">
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
          className="flex flex-col items-center justify-center  h-full"
        />
      </Sider>
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
            content
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          ©{new Date().getFullYear()} Created by Towfique
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayouts;
