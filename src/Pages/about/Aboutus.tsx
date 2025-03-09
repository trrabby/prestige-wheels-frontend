import { Car, ShieldCheck, Wrench, Users, Award, Heart } from "lucide-react";

const teamRoles = [
  {
    role: "Chief Executive Officer",
    name: "Towfiqur Rahman",
    img: "https://i.ibb.co.com/ng4pBn2/20241101-175724-0000-1.png",
  },
  {
    role: "Executive of Sales",
    name: "Neebeer Sheikh",
    img: "https://i.ibb.co.com/xGRKzjq/1668674433825.jpg",
  },
  {
    role: "Executive of Marketing",
    name: "Nabab Rehman",
    img: "https://i.ibb.co.com/X7c6bVT/fahim-ahmed-256x256.jpg",
  },
];

const AboutUsPage = () => {
  return (
    <div className="bg-gray-100 py-20">
      <div className="container mx-auto px-6">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
            At Prestige Wheels, we are passionate about cars and committed to
            providing the finest vehicles and servicing to our customers.
          </h1>
        </section>

        {/* History Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Our History
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                Humble Beginnings
              </h3>
              <p className="text-gray-600">
                Prestige Wheels was founded in 2003 by two car enthusiasts with
                a dream.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                Expanding Our Reach
              </h3>
              <p className="text-gray-600">
                We now operate in over 10 locations nationwide, offering top
                services.
              </p>
            </div>
          </div>
        </section>

        {/* Mission and Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Our Mission & Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Car />,
                title: "Quality Vehicles",
                desc: "Certified and inspected premium cars.",
              },
              {
                icon: <ShieldCheck />,
                title: "Trust & Integrity",
                desc: "Building relationships with honesty.",
              },
              {
                icon: <Wrench />,
                title: "Expert Servicing",
                desc: "Professional maintenance & repairs.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md text-center flex flex-col justify-center items-center"
              >
                <div className="text-indigo-600 text-4xl mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamRoles.map((one, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow-md text-center"
              >
                <img
                  src={one.img}
                  alt="Team"
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {one.name}
                </h3>
                <p className="text-gray-600">{one.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Achievements Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Our Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                icon: <Users />,
                title: "10,000+ Customers",
                desc: "Trusted nationwide.",
              },
              {
                icon: <Award />,
                title: "20+ Awards",
                desc: "Recognized excellence.",
              },
              {
                icon: <Car />,
                title: "5,000+ Cars Sold",
                desc: "Quality cars delivered.",
              },
              {
                icon: <Heart />,
                title: "Community Support",
                desc: "Giving back to society.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md text-center flex flex-col justify-center items-center"
              >
                <div className="text-indigo-600 text-4xl mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Join the Prestige Wheels Family
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Whether you're looking for a luxury vehicle or expert servicing, we
            are here for you.
          </p>
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
            Contact Us
          </button>
        </section>
      </div>
    </div>
  );
};

export default AboutUsPage;
