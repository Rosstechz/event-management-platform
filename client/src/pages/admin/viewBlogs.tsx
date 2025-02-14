import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../configure";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface BlogProps {
  _id: string;
  title: string;
  excerpt: string;
  author: string;
  publishedDate: string;
}

const ViewBlogs = () => {
  const [blogs, setBlogs] = useState<BlogProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/blogs`);
        setBlogs(response.data.blogs);
      } catch (err) {
        setError("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (blogId: string) => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        toast.error("Unauthorized.Please login first");
        return;
      }

      await axios.delete(`${BASE_URL}/blogs/${blogId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBlogs(blogs.filter((blog) => blog._id !== blogId));
      alert("Blog deleted successfully");
    } catch (err) {
      toast.error("Failed to delete Blog");
    }
  };

  const handleEdit = async (blogId: string) => {
    navigate(`/admin/blogs/edit/${blogId}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Blogs
      </h2>

      {loading && <p className="text-center text-gray-600">Loading blogs...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      <div>
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition mt-4 "
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              {blog.title}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              By {blog.author} |{" "}
              {new Date(blog.publishedDate).toLocaleDateString()}
            </p>
            <p className="text-gray-700 mb-4">{blog.excerpt}</p>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleEdit(blog._id)}
                className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(blog._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewBlogs;
