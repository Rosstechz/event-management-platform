import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../configure";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface EventProps {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
  category: string;
}

const Events = () => {
  const [events, setEvents] = useState<EventProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/events`);
        setEvents(response.data.events);
      } catch (err) {
        setError("Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  //event deletion
  const handleDelete = async (eventId: string) => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        toast.error("Unauthorized.Please login first");
        return;
      }

      await axios.delete(`${BASE_URL}/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEvents(events.filter((event) => event._id !== eventId));
      alert("Event deleted successfully");
    } catch (err) {
      toast.error("Failed to delete event");
    }
  };

  const handleEdit = (eventId: string) => {
    navigate(`/admin/events/edit/${eventId}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Events
      </h2>

      {loading && (
        <p className="text-gray-600 text-center">Loading events...</p>
      )}
      {error && <p className="text-gray-600 text-center">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-48 object-cover"
              onError={(e) => (e.currentTarget.src = "/fallback.jpg")}
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{event.title}</h3>
              <p>{event.description}</p>
              <p>
                {event.location} | {new Date(event.date).toLocaleString()}
              </p>
              <p className="mt-2 text-sm text-blue-600 font-medium">
                Category: {event.category}
              </p>

              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleEdit(event._id)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(event._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 "
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
