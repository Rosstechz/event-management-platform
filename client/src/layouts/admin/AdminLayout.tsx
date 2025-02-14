import { Outlet } from "react-router-dom";
import Navbar from "../../components/admin/navbar";
import Sidebar from "../../components/admin/sidebar";

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex flex-col flex-grow">
        <Navbar />

        <main className="p-6 bg-gray-200 flex-grow">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
