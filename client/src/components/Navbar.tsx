import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // Import icons for menu toggle
import { useAuthStore } from "../store/userAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/");
  };

  //from-blue-500 to-blue-900
  return (
    <div className="fixed w-full z-10">
      <nav className="container mx-auto bg-gradient-to-r from-[#24943A] to-[#2B502B]  rounded-xl mt-5 text-white">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold tracking-wide">
            <Link to="/" className="hover:text-gray-200 transition">
              EventManagement
            </Link>
          </h1>

          <ul className="hidden md:flex space-x-8 text-xl font-medium">
            <li>
              <Link
                to="/"
                className="hover:text-slate-400 transition duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/events"
                className="hover:text-slate-400 transition duration-200"
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                to="/blogs"
                className="hover:text-slate-400 transition duration-200"
              >
                Blogs
              </Link>
            </li>
          </ul>

          <div className="hidden md:block">
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-white text-blue-600 font-semibold px-5 py-2 rounded-lg shadow-md hover:bg-gray-300 transition duration-300"
              >
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button className="bg-white text-blue-600 font-semibold px-5 py-2 rounded-lg shadow-md hover:bg-gray-300 transition duration-300">
                  Login
                </button>
              </Link>
            )}
          </div>

          <button
            className="md:hidden text-white text-2xl focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden bg-green-700 rounded-lg py-4">
            <ul className="flex flex-col items-center space-y-4 text-lg font-medium">
              <li>
                <Link
                  to="/"
                  className="hover:text-gray-300 transition duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="hover:text-gray-300 transition duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  to="/blogs"
                  className="hover:text-gray-300 transition duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Blogs
                </Link>
              </li>
              <li>
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <button className="bg-white text-blue-600 font-semibold px-5 py-2 rounded-lg shadow-md hover:bg-gray-300 transition duration-300">
                    Login
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
