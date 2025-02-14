import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../configure";

interface BlogProps {
  _id: string;
  title: string;
  slug: string;
  category: string;
  publishedDate: string;
  author: string;
  excerpt: string;
  tags: string[];
}

const Blog = () => {
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

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#040F0F] to-[#2D3A3A] ">
      <div className="max-w-7xl mx-auto px-6 py-40">
        <h2 className="text-4xl font-semibold text-center text-white mb-10">
          Latest Blogs
        </h2>

        {loading && <p className="text-center text-white">Loading blogs...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1"
            >
              <div className="p-6 flex flex-col h-full">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-500">
                  By{" "}
                  <span className="font-medium text-gray-800">
                    {blog.author}
                  </span>{" "}
                  | {new Date(blog.publishedDate).toLocaleDateString()}
                </p>

                <p className="text-gray-700 mt-4 flex-grow">{blog.excerpt}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded">
                    {blog.category}
                  </span>
                  {blog.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => navigate(`/blogs/${blog._id}`)}
                  className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
