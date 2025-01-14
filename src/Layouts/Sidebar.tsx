import { TUser, useCurrentToken } from '@/redux/features/auth/authSlice';
import { useAppSelector } from '@/redux/hook';
import AdminPaths from '@/routes/admin.routes';
import { sidebarItemsGenerator } from '@/utils/sideBarItemsGenerator';
import { verifyToken } from '@/utils/verifyToken';
import { Layout, Menu } from 'antd';

const { Sider } = Layout;

const userRole = {
  ADMIN: 'admin',
};

const Sidebar = () => {
  const token = useAppSelector(useCurrentToken);

  let user;

  if (token) {
    user = verifyToken(token);
  }

  let sidebarItems;

  switch ((user as TUser)!.role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(AdminPaths, userRole.ADMIN);
      break;

    default:
      break;
  }

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{ height: '100vh', position: 'sticky', top: '0', left: '0' }}
    >
      <div
        style={{
          color: 'white',
          height: '4rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h1>PH Uni</h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['4']}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
