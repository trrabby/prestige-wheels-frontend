/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar/Navbar";
import { NavbarMd } from "./Navbar/NavbarMd";

export default function MainLayout() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation(); // Get the current route

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      // Scrolling down
      setShowNavbar(false);
    } else {
      // Scrolling up
      setShowNavbar(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div>
      {/* Show Navbar only if the route is NOT "/" */}
      {location.pathname !== "/" && (
        <>
          {/* Navbar for medium and large devices */}
          <div
            className={`w-full md:flex md:sticky md:top-0 hidden z-50 transition-transform duration-300 ${
              showNavbar ? "translate-y-0" : "-translate-y-full"
            }`}
          >
            <NavbarMd />
          </div>

          {/* Navbar for small devices */}
          <Navbar />
        </>
      )}

      <Outlet />
    </div>
  );
}
