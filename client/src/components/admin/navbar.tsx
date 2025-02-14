import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../store/adminAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useAdminAuth();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Event Management</h1>
      <button
        onClick={handleLogout}
        className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
