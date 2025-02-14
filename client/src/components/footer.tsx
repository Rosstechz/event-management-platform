import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-green-700 text-white py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <h2 className="text-2xl font-bold">Event Management</h2>
          <p className="text-white mt-2">
            Discover and register for amazing events happening around you.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold">Quick Links</h3>
          <ul className="mt-3 space-y-2">
            <li>
              <Link to="/" className="hover:text-green-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/events" className="hover:text-green-400 transition">
                Events
              </Link>
            </li>
            <li>
              <Link to="/blogs" className="hover:text-green-400 transition">
                Blogs
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold">Connect with Us</h3>
          <div className="flex space-x-4 mt-3">
            <a href="#" className="text-white hover:text-green-400 transition">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="text-white hover:text-green-400 transition">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="text-white hover:text-green-400 transition">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="text-white hover:text-green-400 transition">
              <FaLinkedin size={20} />
            </a>
          </div>
          <p className="text-white mt-3">📧 support@eventmgmt.com</p>
          <p className="text-white">📞 +1 (234) 567-890</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-green-800 mt-8 pt-4 text-center text-white text-sm">
        © {new Date().getFullYear()} Event Management. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
