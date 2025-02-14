import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../configure";
import toast from "react-hot-toast";

const EditBlog = () => {
  const { blogId } = useParams<{ blogId: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    publishedDate: "",
    author: "",
    excerpt: "",
    content: "",
    tags: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch Blog Details
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/blogs/${blogId}`);
        const blog = response.data.blog;
        setFormData({
          title: blog.title,
          slug: blog.slug,
          category: blog.category,
          publishedDate: blog.publishedDate.split("T")[0],
          author: blog.author,
          excerpt: blog.excerpt,
          content: blog.content,
          tags: blog.tags.join(", "),
        });
      } catch (err) {
        setError("Failed to load blog details");
      }
    };

    fetchBlog();
  }, [blogId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("adminToken");

      await axios.put(
        `${BASE_URL}/blogs/${blogId}`,
        {
          ...formData,
          tags: formData.tags.split(",").map((tag) => tag.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Blog updated successfully!");
      navigate("/admin/blogs");
    } catch (err) {
      setError("Failed to update blog");
      toast.error("Failed to update blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-3xl font-semibold text-center mb-4">Edit Blog</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-3 border rounded"
        />
        <input
          type="text"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          placeholder="Slug"
          className="w-full p-3 border rounded"
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        >
          <option value="Event Planning">Event Planning</option>
          <option value="Marketing">Marketing</option>
          <option value="Technology">Technology</option>
          <option value="Business">Business</option>
        </select>
        <input
          type="date"
          name="publishedDate"
          value={formData.publishedDate}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Author"
          className="w-full p-3 border rounded"
        />
        <textarea
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          placeholder="Excerpt"
          className="w-full p-3 border rounded"
        />
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Content"
          className="w-full p-3 border rounded"
        />
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="Tags (comma separated)"
          className="w-full p-3 border rounded"
        />
        <button
          type="submit"
          className={`w-full bg-blue-600 text-white py-3 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Blog"}
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
