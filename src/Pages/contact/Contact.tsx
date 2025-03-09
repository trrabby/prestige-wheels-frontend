/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    toast.success("Message sent successfully!");
  };

  return (
    <div className="bg-gray-100 py-20">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get in touch with us for inquiries, support, or partnership
            opportunities.
          </p>
        </section>

        {/* Contact Details & Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">
              Get in Touch
            </h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Mail className="text-indigo-600 w-6 h-6" />
                <span className="text-gray-700">info@prestigewheels.com</span>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="text-indigo-600 w-6 h-6" />
                <span className="text-gray-700">+880 1681164841</span>
              </div>
              <div className="flex items-center gap-4">
                <MapPin className="text-indigo-600 w-6 h-6" />
                <span className="text-gray-700">
                  Banasree, Dhaka, Bangladesh
                </span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">
              Send a Message
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">
                  {errors.name.message as string}
                </p>
              )}

              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">
                  {errors.email.message as string}
                </p>
              )}

              <textarea
                {...register("message", { required: "Message is required" })}
                rows={5}
                placeholder="Your Message"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-sm">
                  {errors.message.message as string}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold flex justify-center items-center gap-2 hover:bg-indigo-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Google Maps */}
        <div className="mt-16 rounded-2xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d790.1471105567507!2d90.4323271124602!3d23.76184955944591!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b80a03c8e22f%3A0xd52685f4a2fe003c!2sBanasree%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1740748690434!5m2!1sen!2sbd"
            className="w-full h-96"
            style={{ border: "0" }}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
