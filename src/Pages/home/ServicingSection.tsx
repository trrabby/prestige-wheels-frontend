import { Wrench, Car, ShieldCheck, Activity } from "lucide-react";
import { Link } from "react-router-dom";

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

const ServicingSection = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-12 px-6">
        {/* Left Side: Image */}
        <div className="w-full md:w-1/2">
          <img
            src="https://res.cloudinary.com/divyajujl/image/upload/v1740578286/360637_klvjqr.jpg"
            alt="Car Servicing"
            className="rounded-2xl shadow-lg w-full h-auto max-w-md mx-auto md:max-w-full"
          />
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
          <div className="flex justify-center md:justify-start">
            <Link to={"/services"}>
              <button className="mt-8 px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition">
                Book a Service
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicingSection;
