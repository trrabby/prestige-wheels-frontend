/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

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

  const handleLogout = () => {
    navigate("/login");
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
    <div className=" text-black bg-[#fffffffd] z-30 w-full py-2">
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

            <div className="flex justify-end items-center text-accent ml-5 font-bold">
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

              {user && (
                <button
                  onClick={handleLogout}
                  className="hover:text-primary font-extrabold"
                >
                  SIGN OUT
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
