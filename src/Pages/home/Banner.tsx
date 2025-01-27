import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

const Banner = () => {
  return (
    <div>
      {/* banner */}
      <section
        className=" shadow-sm h-[calc(100vh-130px)] rounded-xl my-5 
      bg-[url('https://i.ibb.co.com/Qbv9QB3/Toyota-Bangladesh-2e16d0ba-fill-680x381-c0-format-avif-Rp-Lgjn-R.jpg')] 
      bg-no-repeat bg-cover"
      >
        <div className="mx-auto max-w-screen-xl px-4 lg:flex lg:items-start w-full h-full ">
          <div
            data-aos="fade-up"
            data-aos-duration="1000"
            className=" py-20 text-left space-y-5  w-8/12 flex flex-col items-start   "
          >
            <h1 className="text-3xl font-extrabold sm:text-5xl  ">
              <strong className="font-extrabold text-accent sm:block mt-5">
                The All New Corolla Cross is Now Available!
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
                  to={"/lessons"}
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
        </div>
      </section>
    </div>
  );
};

export default Banner;
