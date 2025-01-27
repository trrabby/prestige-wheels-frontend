import { MdOutlineMenuOpen } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import { Element } from "react-scroll";
import { useState } from "react";

export const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };
  return (
    <div>
      <Element name="banner_scroll">
        <div className="w-full">
          {/* toggle button for small device  */}
          <div className="md:hidden flex fixed z-50">
            <button className="duration-500 p-4" onClick={handleToggle}>
              {!toggle ? (
                <MdOutlineMenuOpen className="text-white rounded-md h-10 w-10 duration-700 shadow-xl shadow-white hover:shadow-primary" />
              ) : (
                <IoMdMenu className="text-white h-10 w-10" />
              )}
            </button>
          </div>

          {/* sidebar for small device */}
          <div
            className={`md:hidden flex w-full  fixed right-0 z-50 duration-300  ${
              toggle ? "translate-x-[500px]" : "translate-x-0"
            }`}
          >
            <div
              onClick={() => setToggle(!toggle)}
              className="w-6/12 bg-transparent"
            ></div>

            <div className="w-6/12">
              {/* <SmNavbar toggle={toggle} setToggle={setToggle}></SmNavbar> */}
            </div>
          </div>
        </div>
      </Element>
    </div>
  );
};
