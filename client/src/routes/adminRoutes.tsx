import { Route, Routes } from "react-router-dom";
import AdminLayout from "../layouts/admin/AdminLayout";
import Dashboard from "../pages/admin/dashboard";
import Events from "../pages/admin/events";
import CreateEvent from "../pages/admin/createEvent";
import ProtectedRoute from "../components/admin/ProtectedRoute";
import EditEvent from "../pages/admin/editEvent";
import ViewBlogs from "../pages/admin/viewBlogs";
import CreateBlogs from "../pages/admin/createBlogs";
import EditBlog from "../pages/admin/editBlog";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <AdminLayout />{" "}
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />

        <Route path="events" element={<Events />} />
        <Route path="events/create" element={<CreateEvent />} />
        <Route path="events/edit/:eventId" element={<EditEvent />} />
        <Route path="blogs" element={<ViewBlogs />} />
        <Route path="blogs/create" element={<CreateBlogs />} />
        <Route path="blogs/edit/:blogId" element={<EditBlog />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
