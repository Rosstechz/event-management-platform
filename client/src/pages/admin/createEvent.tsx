import { useState } from "react";
import { EventCategory } from "../../types/EventTypes";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../../configure";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    category: "",
  });
  const [image, setImage] = useState<File | null>(null);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (
      !formData.title ||
      !formData.description ||
      !formData.date ||
      !formData.location ||
      !formData.category ||
      !image
    ) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formDateToSend = new FormData();
      formDateToSend.append("title", formData.title);
      formDateToSend.append("description", formData.description);
      formDateToSend.append("date", formData.date);
      formDateToSend.append("location", formData.location);
      formDateToSend.append("category", formData.category);
      formDateToSend.append("image", image);

      const token = localStorage.getItem("adminToken");

      await axios.post(`${BASE_URL}/events/create`, formDateToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/admin/events");
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data.message || "Event creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Create Event
      </h2>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      {/* Event Title */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          Event Title
        </label>
        <input
          type="text"
          name="title"
          placeholder="Enter event title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Event Description */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          Event Description
        </label>
        <textarea
          name="description"
          placeholder="Enter event description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          Event Date
        </label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          Event Location
        </label>
        <input
          type="text"
          name="location"
          placeholder="Enter event location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Event Image Upload */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          Upload Event Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {image && <p className="mt-2 text-gray-600">Selected: {image.name}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          Event Category
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select a category</option>
          {Object.values(EventCategory).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        className={`w-full bg-blue-600 text-white py-3 rounded-lg font-semibold transition duration-300 ${
          loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
        }`}
        disabled={loading}
      >
        {loading ? "Creating Event" : "Create Event"}
      </button>
    </div>
  );
};

export default CreateEvent;
