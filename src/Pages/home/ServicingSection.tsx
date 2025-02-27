import { Wrench, Car, ShieldCheck, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // Import all Swiper styles
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const services = [
  {
    icon: <Wrench size={32} />,
    title: "General Maintenance",
    desc: "Keep your car in top condition with regular checkups.",
  },
  {
    icon: <Car size={32} />,
    title: "Engine Repair",
    desc: "Expert engine diagnostics and repair services.",
  },
  {
    icon: <ShieldCheck size={32} />,
    title: "Insurance & Safety",
    desc: "Comprehensive inspections and coverage assistance.",
  },
  {
    icon: <Activity size={32} />,
    title: "Wheel Alignment & Balancing",
    desc: "Ensure smooth rides with precise wheel balancing.",
  },
];

const images = [
  "https://res.cloudinary.com/divyajujl/image/upload/v1740627103/communicate_qzmp7i.jpg",
  "https://res.cloudinary.com/divyajujl/image/upload/v1740627103/istockphoto-1497239622-612x612_jol1t3.jpg",
  "https://res.cloudinary.com/divyajujl/image/upload/v1740627103/service-tile_s4k6yx.avif",
];

const ServicingSection = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-12 px-6">
        {/* Left Side: Image */}
        <div className="w-full md:w-1/2">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            loop
            className="rounded-2xl shadow-lg w-full max-w-md mx-auto md:max-w-full flex justify-center items-center"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img}
                  alt={`Slide ${index + 1}`}
                  className="rounded-2xl w-full h-96 flex justify-center items-center"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Right Side: Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-800">
            Premium Car Servicing
          </h2>
          <p className="text-gray-600 mt-3">
            Experience top-notch maintenance, repairs, and inspections to keep
            your car running smoothly.
          </p>

          {/* Services Grid */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="p-5 bg-white rounded-2xl shadow-md flex flex-col items-center md:items-start text-center md:text-left"
              >
                <div className="text-indigo-600">{service.icon}</div>
                <h3 className="mt-4 text-lg font-semibold">{service.title}</h3>
                <p className="text-gray-500 mt-2 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>

          {/* Call to Action Button */}
          <div className=" w-full flex justify-center md:justify-start">
            <Link to={"/services"}>
              <button className="lightning-button mt-8 px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition">
                Book a Service
              </button>
            </Link>
            <style>
              {`
          .lightning-button {
            position: relative;
            padding: 10px 20px;
            font-size: 16px;
            font-weight: bold;
            color: #fff;
            background-color: #333;
            border: 2px solid #fff;
            border-radius: 5px;
            cursor: pointer;
            overflow: hidden;
            text-transform: uppercase;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
            transition: background-color 0.3s ease-in-out;
          }

          .lightning-button:hover {
            background-color: #fd5c70;
          }

          .lightning-button::before {
            content: "";
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            border-radius: 50%;
            border: 5px solid #fd5c70;
            animation: lightning 3s linear infinite;
            opacity: 0.7;
          }

          @keyframes lightning {
            0% { transform: rotate(0deg); opacity: 0.7; }
            50% { transform: rotate(180deg); opacity: 1; }
            100% { transform: rotate(360deg); opacity: 0.7; }
          }
        `}
            </style>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicingSection;
