import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../configure";

interface BlogProps {
  _id: string;
  title: string;
  slug: string;
  category: string;
  publishedDate: string;
  author: string;
  excerpt: string;
  content: string;
  tags: string[];
}

const BlogDetails = () => {
  const { blogId } = useParams<{ blogId: string }>();
  const [blog, setBlog] = useState<BlogProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/blogs/${blogId}`);
        setBlog(response.data.blog);
        console.log(response);
      } catch (err) {
        setError("Failed to load blog details");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  if (loading)
    return <p className="text-center text-gray-600">Loading blog details...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;
  if (!blog) return <p className="text-center text-gray-600">Blog not found</p>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#040F0F] to-[#2D3A3A] py-12 px-6 md:px-12 flex items-center justify-center ">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>
        <p className="text-gray-600 mb-4">
          By {blog.author} | {new Date(blog.publishedDate).toLocaleDateString()}
        </p>
        <p className="text-gray-700 mb-6 italic">{blog.excerpt}</p>
        <div
          className="prose prose-lg max-w-none text-gray-800"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
        <div className="mt-6 flex flex-wrap gap-2">
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
      </div>
    </div>
  );
};

export default BlogDetails;
