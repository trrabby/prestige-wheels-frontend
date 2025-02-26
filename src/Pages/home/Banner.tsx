/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { NavbarMd } from "@/Layouts/Navbar/NavbarMd";
import { useEffect, useState } from "react";

const Banner = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [play, setPlay] = useState(false);

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

  const handlePlayButton = () => {
    setPlay(!play);
  };
  return (
    <div className="relative w-full min-h-screen">
      <div
        className={`w-full md:flex md:sticky md:top-0 hidden z-50 transition-transform duration-300 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <NavbarMd />
      </div>
      {/* Background Video */}
      {/* <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src={bgVideo}
        autoPlay
        loop
        muted
      /> */}

      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50 bg-[url('https://res.cloudinary.com/divyajujl/image/upload/v1740578285/360915_mzddqk.jpg')] bg-fixed bg-cover bg-center"></div>

      {/* Content */}
      <section className="relative z-20 flex flex-col justify-center items-start min-h-screen px-20 pt-20 text-black  ">
        <h1 className=" text-3xl font-extrabold sm:text-5xl w-9/12">
          <strong className="font-extrabold sm:block p-3">
            The All New Top Class Cars Now Available!
          </strong>
        </h1>

        <p className="text-white mt-4 sm:text-xl/relaxed w-8/12 text-justify p-3">
          Reinvent adventure with an all-new hybrid experience. The Toyota
          Corolla Cross brings a whole new meaning to the world of Crossovers.
        </p>

        <div className="mt-8 flex gap-4 pl-4">
          <Link
            className="border border-white rounded bg-accent px-12 py-3 text-sm text-white font-bold hover:bg-transparent hover:scale-105 duration-700 shadow"
            to={"/products"}
          >
            Get Started
          </Link>

          <ScrollLink
            className="border-2 border-white text-white backdrop-blur-xl rounded px-10 py-3 text-sm font-bold shadow hover:text-white hover:bg-transparent hover:backdrop-blur-0 hover:scale-105 duration-500 cursor-pointer"
            to="footer"
          >
            Learn More
          </ScrollLink>
        </div>

        {/* Embedded Video */}
        <div className=" flex justify-end items-end w-full pt-20 relative pb-5">
          <div
            onClick={handlePlayButton}
            className={`flex justify-center items-center inset-0 bg-black bg-opacity-50 w-[560px] h-[318px]  right-0 bottom-0 rounded-lg ${
              play ? "hidden" : ""
            }`}
          >
            <img
              className={
                " w-[50px] h-[50px] hover:cursor-pointer bg-white  rounded-full"
              }
              src={
                "https://res.cloudinary.com/divyajujl/image/upload/v1740583826/2468825_g3rf5x.png"
              }
            />
          </div>
          <iframe
            className={`bg-white  rounded-lg ${play ? "" : "hidden"}`}
            width="560"
            height="315"
            src="https://www.youtube-nocookie.com/embed/PUkAIAIzA0I?si=avuQ80bQAEp64E7I&amp;start=01&autoplay=1&mute=1"
            title="Fuck you"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default Banner;
