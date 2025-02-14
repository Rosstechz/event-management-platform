import { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown, FaChevronUp, FaBars, FaTimes } from "react-icons/fa";

const Sidebar = () => {
  const [isEventsOpen, setIsEventsOpen] = useState(false);
  const [isBlogOpen, setIsBlogOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed top-4 left-4 bg-gray-800 text-white p-3 rounded-full z-50"
      >
        {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`bg-gray-800 text-white w-64 p-5 h-screen fixed top-0 left-0 overflow-y-auto transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>

        <ul className="space-y-3">
          {/* Dashboard Link */}
          <li>
            <Link
              to="/admin/dashboard"
              className="block py-2 px-4 rounded hover:bg-gray-700"
              onClick={() => setIsSidebarOpen(false)}
            >
              Dashboard
            </Link>
          </li>

          {/* Events Dropdown */}
          <li>
            <button
              onClick={() => setIsEventsOpen(!isEventsOpen)}
              className="flex justify-between w-full py-2 px-4 rounded hover:bg-gray-700"
            >
              Events {isEventsOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {isEventsOpen && (
              <ul className="ml-4 mt-2 space-y-2">
                <li>
                  <Link
                    to="/admin/events"
                    className="block py-2 px-4 rounded hover:bg-gray-700"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    View Events
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/events/create"
                    className="block py-2 px-4 rounded hover:bg-gray-700"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    Create Event
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Blogs Dropdown */}
          <li>
            <button
              onClick={() => setIsBlogOpen(!isBlogOpen)}
              className="flex justify-between w-full py-2 px-4 rounded hover:bg-gray-700"
            >
              Blogs {isBlogOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {isBlogOpen && (
              <ul className="ml-4 mt-2 space-y-2">
                <li>
                  <Link
                    to="/admin/blogs"
                    className="block py-2 px-4 rounded hover:bg-gray-700"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    View Blogs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/blogs/create"
                    className="block py-2 px-4 rounded hover:bg-gray-700"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    Create Blog
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
