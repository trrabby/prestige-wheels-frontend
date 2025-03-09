import { Facebook, Twitter, Instagram, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo & About */}
        <div className="space-y-4">
          <Link to={"/"}>
            <p className="text-primary text-3xl font-extrabold flex gap-2">
              <span className="text-accent">PRESTIGE</span>
              WHEELS
            </p>
          </Link>
          <p className="text-gray-400 text-sm">
            Providing top-notch car servicing and maintenance with quality you
            can trust.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <Link to="/about" className="hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-white">
                Our Services
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-white">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="text-gray-400 space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={16} /> info@prestigewheels.com
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} /> +880 1681164841
            </li>
          </ul>
          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 text-center text-gray-500 text-sm border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} CarServ. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
