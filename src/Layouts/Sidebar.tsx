import {
  logout,
  TUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import AdminPaths from "@/routes/admin.routes";
import userPaths from "@/routes/user.routes";
import { sidebarItemsGenerator } from "@/utils/sideBarItemsGenerator";
import { verifyToken } from "@/utils/verifyToken";
import { Button, Layout, Menu } from "antd";
import { NavLink } from "react-router-dom";

const { Sider } = Layout;

const userRole = {
  ADMIN: "admin",
  USER: "user",
};

const Sidebar = () => {
  const token = useAppSelector(useCurrentToken);
  const despatch = useAppDispatch();

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
  const handelDelete = () => {
    despatch(logout());
  };

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{ height: "100vh", position: "sticky", top: "0", left: "0" }}
    >
      <div
        style={{
          color: "white",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1></h1>
      </div>
      <Menu
        style={{
          color: "white",
        }}
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
      <div className="text-white pt-5 gap-10 flex flex-col items-center justify-center">
        {!user && (
          <div className="text-white pt-5 gap-10 flex flex-col items-center justify-center">
            <NavLink to={"/blogs"}>Blogs</NavLink>
            <Button>
              <NavLink to={"/login"}>Login</NavLink>
            </Button>
          </div>
        )}

        {user && <Button onClick={handelDelete}>Log Out</Button>}
      </div>
    </Sider>
  );
};

export default Sidebar;
