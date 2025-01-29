import React, { useState } from "react";
import { Button, Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { logout, useCurrentToken } from "@/redux/features/auth/authSlice";
import { BsMenuButtonWideFill } from "react-icons/bs";

import { verifyToken } from "@/utils/verifyToken";

const { Header, Content, Footer } = Layout;

const DashBoardLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);

  const token = useAppSelector(useCurrentToken);

  let user;

  if (token) {
    user = verifyToken(token);
  }

  const despatch = useAppDispatch();

  const handelDelete = () => {
    despatch(logout());
  };

  return (
    <Layout className="min-h-screen">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed}></Sidebar>

      <Layout>
        <BsMenuButtonWideFill
          className="absolute text-accent h-16 w-16 p-5 hover:cursor-pointer flex justify-center items-center  p+"
          onClick={() => setCollapsed(!collapsed)}
        />
        <Header
          className="bg-white"
          style={{
            padding: 0,
            color: "white",
            fontSize: "50px",
            textAlign: "center",
            fontWeight: "bold",
            width: "100%",
          }}
        >
          <div className="flex">
            <p className="text-primary text-3xl text-center w-full font-extrabold p-2 px-4 flex justify-center gap-2">
              <img
                className="w-16 animate-pulse"
                src="https://i.ibb.co.com/M9tL3RT/suspension.png"
                alt=""
              />
              <a className="flex justify-center gap-2" href="/">
                <span className="text-accent ">PRESTIGE</span>
                WHEELS
              </a>
            </p>
            <div className="flex justify-start items-center h-16 px-5">
              {user && <Button onClick={handelDelete}>Log Out</Button>}
            </div>
          </div>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div className="min-h-[calc(100vh-200px)]">
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
