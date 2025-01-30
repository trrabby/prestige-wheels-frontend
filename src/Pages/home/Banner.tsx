import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

const Banner = () => {
  return (
    <div>
      {/* banner */}
      <section
        className="  min-h-screen rounded-xl w-full  
      bg-[url('https://res.cloudinary.com/divyajujl/image/upload/v1738152884/white_car_in_white_background_hd_white_background_ibccry.jpg')] 
      bg-cover bg-center bg-opacity-5 "
      >
        <div className="mx-auto px-4 flex flex-col lg:items-start w-full  min-h-screen bg-[#ffffff67]    ">
          <div
            data-aos="fade-up"
            data-aos-duration="1000"
            className=" py-20 text-left space-y-5  w-8/12 flex flex-col items-start pl-20"
          >
            <h1 className="text-3xl font-extrabold sm:text-5xl  ">
              <strong className="font-extrabold text-accent sm:block mt-10">
                The All New Top Class Cars Now Available!
              </strong>
            </h1>

            <p className="mt-4 sm:text-xl/relaxed  w-8/12 text-justify">
              Reinvent adventure with an all new hybrid experience. The Toyota
              Corolla Cross brings a whole new meaning to the world of
              Crossovers.
            </p>

            <div>
              <div className="mt-8 flex justify-center items-center gap-4 w-full ">
                <Link
                  data-aos="fade-right"
                  data-aos-duration="1000"
                  className="block border border-accent rounded bg-accent px-12 py-3 text-sm text-white font-bold hover:text-accent duration-700 shadow hover:bg-primary focus:outline-none focus:ring  sm:w-auto"
                  to={"/products"}
                >
                  Get Started
                </Link>

                <ScrollLink
                  data-aos="fade-left"
                  data-aos-duration="1000"
                  className="block rounded px-10 py-3 text-sm font-bold border-accent border-2 text-accent shadow hover:text-primary focus:outline-none focus:ring hover:bg-accent duration-500 sm:w-auto cursor-pointer"
                  to="footer"
                >
                  Learn More
                </ScrollLink>
              </div>
            </div>
          </div>
          <div className="flex justify-end items-end w-full pt-20 ">
            <iframe
              className=" bg-[#ffffff67] rounded-lg shadow-md"
              width="560"
              height="315"
              src="https://www.youtube.com/embed/FxJALxhIx8k?si=Idj2GmUK7NWUueDm&amp;controls=0"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner;
