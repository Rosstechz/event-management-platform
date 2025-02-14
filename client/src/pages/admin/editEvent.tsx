import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../configure";
import toast from "react-hot-toast";

const EditEvent = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    category: "",
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/events/${eventId}`);
        const event = response.data.event;

        setEventData({
          ...event,
          date: new Date(event.date).toISOString().split("T")[0],
        });
      } catch (err) {
        console.error("Error fetching event", err);
      }
    };
    fetchEvent();
  }, [eventId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        toast.error("Unauthorized.Please login first");
        return;
      }

      await axios.put(
        `${BASE_URL}/events/${eventId}`,
        {
          ...eventData,
          date: new Date(eventData.date).toISOString(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Event updated successfully");
      navigate("/admin/events");
    } catch (err: unknown) {
      toast.error("Failed to update event");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg mt-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
        Edit Event
      </h2>
      <input
        type="text"
        name="title"
        value={eventData.title}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-2"
        placeholder="Event Title"
      />
      <textarea
        name="description"
        value={eventData.description}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-2"
        placeholder="Description"
      ></textarea>
      <input
        type="date"
        name="date"
        value={eventData.date}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-2"
      />
      <input
        type="text"
        name="location"
        value={eventData.location}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-2"
        placeholder="Location"
      />
      <button
        onClick={handleUpdate}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Update Event
      </button>
    </div>
  );
};

export default EditEvent;
