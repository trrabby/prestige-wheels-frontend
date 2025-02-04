/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink } from "react-router-dom";
import { useAppSelector } from "@/redux/hook";
import { TUser, useCurrentToken } from "@/redux/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";
import DropdownHead from "./DropdownHead";
import CartBadge from "@/components/cart/CartBadge";
import { useState } from "react";
import CartPage from "@/components/cart/CartPage";
import { Tooltip } from "antd";

export const NavbarMd = () => {
  const [open, setOpen] = useState(false);
  const token = useAppSelector(useCurrentToken);

  let user: TUser | undefined;

  if (token) {
    user = verifyToken(token) as TUser;
  }
  // const handleToast = () => {
  //   if (!user) {
  //     // setLoading(false)
  //     return toast.error("log in required to proceed");
  //   }
  // };

  const navlinks = [
    {
      path: "/",
      name: "HOME",
    },
    {
      path: "/products",
      name: "PRODUCTS",
    },
  ];

  const handleOpenCartPage = () => {
    setOpen(!open);
  };
  return (
    <div className=" text-accent bg-transparent backdrop-blur-sm z-30 w-full py-2">
      <div className="navbar flex justify-between items-center">
        <div className="flex flex-row lg:flex-row justify-between items-end lg:flex-1">
          <div className="w-2/6 pl-10 flex items-end">
            <img
              className="w-16"
              src="https://i.ibb.co.com/M9tL3RT/suspension.png"
              alt=""
            />
            <p className="text-primary text-3xl font-extrabold p-2 px-4 flex gap-2">
              <span className="text-accent">PRESTIGE</span>
              WHEELS
            </p>
          </div>
          {/* Menu */}
          <div className="px-10 pl-28 flex flex-1 justify-between text-lg">
            {/* Menu lg */}
            <div className="navbar-center hidden md:flex gap-3 text-accent">
              {navlinks.map((navLink) => {
                return (
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-primary font-extrabold p-2"
                        : "hover:text-primary p-2 font-extrabold"
                    }
                    to={navLink.path}
                    key={navLink.path} // Ensure a unique key
                  >
                    {navLink.name}
                  </NavLink>
                );
              })}
            </div>

            <div className="flex gap-4 items-center justify-center">
              {!user && (
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary font-extrabold p-2"
                      : "hover:text-primary p-2 font-extrabold"
                  }
                  to={"/logIn"}
                >
                  SIGN IN
                </NavLink>
              )}
              <Tooltip title={"Cart"} placement={"rightBottom"}>
                <div onClick={handleOpenCartPage}>
                  <CartBadge />
                </div>
              </Tooltip>
              {/* Conditionally render CartPage */}
              <CartPage open={open} setOpen={setOpen} />
              {user && <DropdownHead user={user} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
