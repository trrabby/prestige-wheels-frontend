import { Wrench, Car, ShieldCheck } from "lucide-react";

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
];

const ServicingSection = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-12 px-6">
        {/* Left Side: Image */}
        <div className="md:w-1/2">
          <img
            src="https://res.cloudinary.com/divyajujl/image/upload/v1740578286/360637_klvjqr.jpg" // Replace with your actual image path
            alt="Car Servicing"
            className="rounded-2xl shadow-lg w-full"
          />
        </div>

        {/* Right Side: Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-800">
            Premium Car Servicing
          </h2>
          <p className="text-gray-600 mt-3">
            Experience top-notch maintenance, repairs, and inspections to keep
            your car running smoothly.
          </p>

          <div className="mt-6 grid md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="p-5 bg-white rounded-2xl shadow-md flex flex-col items-center md:items-start"
              >
                <div className="text-indigo-600">{service.icon}</div>
                <h3 className="mt-4 text-lg font-semibold">{service.title}</h3>
                <p className="text-gray-500 mt-2 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>

          <button className="mt-8 px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition">
            Book a Service
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicingSection;
