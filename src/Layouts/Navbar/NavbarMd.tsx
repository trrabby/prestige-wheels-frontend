/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, NavLink } from "react-router-dom";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  logout,
  TUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";

export const NavbarMd = () => {
  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();

  let user: TUser | undefined;

  if (token) {
    user = verifyToken(token) as TUser;
  }

  const handleToast = () => {
    if (!user) {
      // setLoading(false)
      return toast.error("log in required to proceed");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out");
  };

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
  return (
    <div className="bg-transparent sticky top-0 text-black shadow-sm shadow-[#4d4d00] rounded-b-2xl  z-30 w-full py-2">
      <div className="navbar flex justify-between items-center">
        <div className="flex flex-row lg:flex-row justify-between items-end lg:flex-1">
          <div>
            <p className="text-primary text-3xl font-extrabold p-2 px-4">
              <span className="text-cyan-500 text-4xl">Prestige</span> Wheels
            </p>
          </div>
          {/* Menu */}
          <div className="p-0 flex flex-1 justify-around text-lg">
            {/* Menu lg */}
            <div className="navbar-center hidden md:flex gap-3 text-fourth">
              {navlinks.map((navLink) => {
                return (
                  <NavLink
                    onClick={handleToast}
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
            </div>

            <div className="flex justify-end items-center text-fourth ml-5 font-bold">
              {user && (
                <Link
                  onClick={handleLogout}
                  to={"/"}
                  className="btn btn-ghost hover:text-primary"
                >
                  SIGN OUT
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
