import axios, { AxiosError } from "axios";
import { useState } from "react";
import { BASE_URL } from "../../configure";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CreateBlogs = () => {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    publishedDate: new Date().toISOString().split("T")[0],
    author: "",
    excerpt: "",
    content: "",
    tags: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.slug ||
      !formData.category ||
      !formData.publishedDate ||
      !formData.author ||
      !formData.excerpt ||
      !formData.content ||
      !formData.tags
    ) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setError("Unauthorized: No token found. Please log in.");
        return;
      }

      await axios.post(
        `${BASE_URL}/blogs/create`,
        {
          ...formData,
          tags: formData.tags.split(",").map((tag) => tag.trim()),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Blog created successfully");
      navigate("/admin/blogs");
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data.message || "Blog creation failed");
      toast.error(error.response?.data.message || "Blog creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Create Blog
      </h2>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* Blog Title */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1 ">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter blog title"
          />
        </div>

        {/* Slug */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Slug</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter blog slug"
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Select a category</option>
            <option value="Event Planning">Event Planning</option>
            <option value="Marketing">Marketing</option>
            <option value="Technology">Technology</option>
            <option value="Business">Business</option>
          </select>
        </div>

        {/* Published Date */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Published Date
          </label>
          <input
            type="date"
            name="publishedDate"
            value={formData.publishedDate}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Author */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter author name"
          />
        </div>

        {/* Excerpt */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Excerpt
          </label>
          <textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={2}
            placeholder="Short summary of the blog"
          />
        </div>

        {/* Content */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Content
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={6}
            placeholder="Full blog content"
          />
        </div>

        {/* Tags */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Tags</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Comma separated tags (e.g., event, planning)"
          />
        </div>

        <button
          type="submit"
          className={`w-full bg-blue-600 text-white py-3 rounded-lg font-semibold transition duration-300 ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Creating Blog..." : "Create Blog"}
        </button>
      </form>
    </div>
  );
};

export default CreateBlogs;
