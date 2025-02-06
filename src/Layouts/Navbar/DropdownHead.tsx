import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { logout, TUser } from "@/redux/features/auth/authSlice";
import { FaUserGear } from "react-icons/fa6";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hook";
import { useNavigate } from "react-router-dom";
import { FaUserSecret } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";

interface MenuClickEvent {
  key: string;
}

interface DropdownHeadProps {
  user: TUser | undefined;
}

const DropdownHead = ({ user }: DropdownHeadProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
    dispatch(logout());
    toast.success("Logged out");
  };

  const handleMenuClick = (e: MenuClickEvent) => {
    // console.log("Clicked item:", e.key);

    switch (e.key) {
      case "/dashboard":
        navigate(`/${user?.role}/dashboard`);
        break;
      case "/profile":
        navigate(`/my-profile`);
        break;
      default:
        break;
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "/dashboard",
      label: "Dashboard",
      icon: <MdDashboard />,
      onClick: handleMenuClick,
    },
    {
      type: "divider",
    },
    {
      key: "/profile",
      label: "Profile",
      icon: <FaUserSecret />,
      onClick: handleMenuClick,
    },
    {
      type: "divider",
    },
    {
      key: "/logout",
      label: "Logout",
      icon: <IoMdLogOut className="text-red-700" />,
      onClick: handleLogout,
    },
  ];

  return (
    <Dropdown menu={{ items }}>
      <a onClick={(e) => console.log(e.target)}>
        <Space>
          {user ? (
            <>
              <div className=" font-bold rounded-full border hover:cursor-pointer">
                {user.imgUrl ? (
                  <div className="h-full w-full">
                    <img
                      className="rounded-full object-center h-10 w-10 p-1"
                      src={user.imgUrl}
                    />
                  </div>
                ) : (
                  <FaUserGear className="h-10 w-10 p-1 text-accent border rounded-full " />
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center">
              <button className="border-none">
                <FaUserGear className="h-10 w-10 p-1 text-accent border rounded-full " />
              </button>
            </div>
          )}
        </Space>
      </a>
    </Dropdown>
  );
};

export default DropdownHead;
