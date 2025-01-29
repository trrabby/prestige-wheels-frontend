/* eslint-disable @typescript-eslint/no-explicit-any */
import { TUser, useCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hook";
import AdminPaths from "@/routes/admin.routes";
import userPaths from "@/routes/user.routes";
import { sidebarItemsGenerator } from "@/utils/sideBarItemsGenerator";
import { verifyToken } from "@/utils/verifyToken";
import { Layout, Menu } from "antd";

const { Sider } = Layout;

const userRole = {
  ADMIN: "admin",
  USER: "user",
};

const Sidebar = ({ collapsed }: any) => {
  const token = useAppSelector(useCurrentToken);

  let user;

  if (token) {
    user = verifyToken(token);
  }

  let sidebarItems;
  if (user) {
    switch ((user as TUser).role) {
      case userRole.ADMIN:
        sidebarItems = sidebarItemsGenerator(AdminPaths, userRole.ADMIN);
        break;
      case userRole.USER:
        sidebarItems = sidebarItemsGenerator(userPaths, userRole.USER);
        break;

      default:
        break;
    }
  }

  return (
    <Sider
      className="bg-white"
      collapsedWidth="40"
      collapsed={collapsed}
      style={{ height: "100vh" }}
    >
      <Menu
        className="pt-20 bg-white "
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
