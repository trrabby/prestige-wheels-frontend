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
      setShowNavbar(false);
    } else {
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
      {/* Navbar */}
      <div
        className={`w-full md:flex md:sticky md:top-0 hidden z-50 transition-transform duration-300 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <NavbarMd />
      </div>

      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 bg-[url('https://res.cloudinary.com/divyajujl/image/upload/v1740578285/360915_mzddqk.jpg')] bg-fixed bg-cover bg-center"></div>

      {/* Content */}
      <section className="relative z-20 flex flex-col justify-center items-start min-h-screen px-6 sm:px-12 md:px-20 pt-20 text-black">
        <h1 className="text-3xl font-extrabold sm:text-5xl w-full sm:w-9/12">
          <strong className="font-extrabold sm:block p-3">
            The All New Top Class Cars Now Available!
          </strong>
        </h1>

        <p className="text-white mt-4 sm:text-xl w-full sm:w-8/12 text-justify p-3">
          Reinvent adventure with an all-new hybrid experience. The Toyota
          Corolla Cross brings a whole new meaning to the world of Crossovers.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap gap-4 pl-4">
          <Link
            className="border border-white rounded bg-accent px-6 sm:px-12 py-3 text-sm text-white font-bold hover:bg-transparent hover:scale-105 duration-700 shadow"
            to="/products"
          >
            Get Started
          </Link>

          <ScrollLink
            className="border-2 border-white text-white backdrop-blur-xl rounded px-6 sm:px-10 py-3 text-sm font-bold shadow hover:text-white hover:bg-transparent hover:backdrop-blur-0 hover:scale-105 duration-500 cursor-pointer"
            to="footer"
          >
            Learn More
          </ScrollLink>
        </div>

        {/* Video Section */}
        <div className="flex justify-center sm:justify-end items-end w-full pt-20 relative pb-5">
          {/* Play Button */}
          <div
            onClick={handlePlayButton}
            className={`flex justify-center items-center bg-black bg-opacity-50 w-full max-w-[560px] aspect-video rounded-lg ${
              play ? "hidden" : ""
            }`}
          >
            <img
              className="w-[50px] h-[50px] hover:cursor-pointer bg-white rounded-full"
              src="https://res.cloudinary.com/divyajujl/image/upload/v1740583826/2468825_g3rf5x.png"
              alt="Play Button"
            />
          </div>

          {/* Responsive Video */}
          <div
            className={`w-full max-w-[560px] aspect-video rounded-lg overflow-hidden ${
              play ? "" : "hidden"
            }`}
          >
            <iframe
              className="w-full h-full"
              src="https://www.youtube-nocookie.com/embed/PUkAIAIzA0I?si=avuQ80bQAEp64E7I&start=1&autoplay=1&mute=1"
              title="Promo Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner;
