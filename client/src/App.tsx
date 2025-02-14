import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/layout";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Events from "./pages/Events";
import AdminLogin from "./pages/auth/admin/AdminLogin";
import AdminRoutes from "./routes/adminRoutes";
import EventDetail from "./pages/EventDetail";
import { Toaster } from "react-hot-toast";
import BlogDetails from "./pages/BlogDetails";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="events" element={<Events />} />
          <Route path="events/:eventId" element={<EventDetail />} />
          <Route path="blogs" element={<Blog />} />
          <Route path="blogs/:blogId" element={<BlogDetails />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/*" element={<AdminRoutes />} />
      </Routes>
    </>
  );
}

export default App;
