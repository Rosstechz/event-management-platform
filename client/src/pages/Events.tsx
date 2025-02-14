import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../configure";
import { useNavigate } from "react-router-dom";

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

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#040F0F] to-[#2D3A3A]">
      <div className="max-w-7xl mx-auto px-6 py-40">
        <h2 className="text-4xl font-semibold text-center text-white mb-10">
          Explore Our Events
        </h2>

        {loading && <p className="text-white text-center">Loading events...</p>}
        {error && <p className="text-red-600 text-center">{error}</p>}

        {events.length === 0 && !loading && !error ? (
          <p className="text-white text-center">No events available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white shadow-xl rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-60 object-cover"
                  onError={(e) => (e.currentTarget.src = "/fallback.jpg")}
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-900">
                    {event.title}
                  </h3>
                  <p className="text-gray-700 mt-2">
                    {event.description.substring(0, 120)}...
                  </p>
                  <div className="mt-4 text-gray-500">
                    📍 {event.location} | 🗓{" "}
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                  <div className="mt-4">
                    <span className="text-sm font-semibold bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                      {event.category}
                    </span>
                  </div>
                  <button
                    onClick={() => navigate(`/events/${event._id}`)}
                    className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
