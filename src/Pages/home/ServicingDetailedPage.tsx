import { useState } from "react";
import { Wrench, Car, ShieldCheck, Activity } from "lucide-react";
import { toast } from "sonner";

const services = [
  {
    id: "maintenance",
    icon: <Wrench size={40} />,
    title: "General Maintenance",
    desc: "Regular checkups, oil changes, fluid refills, brake inspections, and tire rotations to keep your vehicle in top shape.",
  },
  {
    id: "engine",
    icon: <Car size={40} />,
    title: "Engine Repair",
    desc: "Expert diagnostics and repairs for engine performance issues, overheating, and warning lights.",
  },
  {
    id: "insurance",
    icon: <ShieldCheck size={40} />,
    title: "Insurance & Safety",
    desc: "Vehicle safety inspections and insurance assistance for claims and coverage.",
  },
  {
    id: "alignment",
    icon: <Activity size={40} />,
    title: "Wheel Alignment & Balancing",
    desc: "Improve handling and reduce tire wear with precision wheel alignment and balancing services.",
  },
];

const ServiceBookingPage = () => {
  const [selectedService, setSelectedService] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking Data:", { selectedService, ...formData });
    if (selectedService === "") {
      return toast.error("Please select a service at first.");
    }
    toast.success("Your service appointment has been booked!");
  };

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            Book a Car Service
          </h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Select a service, enter your details, and schedule an appointment.
            Our experts will take care of your car.
          </p>
        </div>

        {/* Service Selection */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service.title)}
              className={`p-5 bg-white rounded-2xl shadow-md flex flex-col items-center md:items-start cursor-pointer hover:scale-105 transition ${
                selectedService === service.title
                  ? "border-2 border-indigo-600"
                  : ""
              }`}
            >
              <div className="text-indigo-600">{service.icon}</div>
              <h3 className="mt-4 text-lg font-semibold">{service.title}</h3>
              <p className="text-gray-500 mt-2 text-sm">{service.desc}</p>
            </div>
          ))}
        </div>

        {/* Booking Form */}
        <div className="mt-12 bg-white p-8 rounded-2xl shadow-lg max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800">
            Enter Your Details
          </h2>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Name */}
            <div>
              <label className="block text-gray-700 font-medium">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-700 font-medium">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium">
                  Preferred Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium">
                  Preferred Time
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-gray-700 font-medium">
                Additional Message (Optional)
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={3}
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ServiceBookingPage;
