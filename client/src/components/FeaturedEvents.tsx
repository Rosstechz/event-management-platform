import axios from "axios";
import { useEffect, useState } from "react";
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

const FeaturedEvents = () => {
  const [events, setEvents] = useState<EventProps[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/events`);
        const allEvent = response.data.events;

        const shuffled = allEvent.sort(() => 0.5 - Math.random());
        setEvents(shuffled.slice(0, 3));
      } catch (error) {
        console.error("Error fetching events", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">
        Featured Events
      </h2>

      {events.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No events available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
              onClick={() => navigate(`/events/${event._id}`)}
            >
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-56 object-cover"
                  onError={(e) => (e.currentTarget.src = "/fallback.jpg")}
                />
                <span className="absolute top-3 left-3 bg-green-600 text-white text-sm px-3 py-1 rounded-full shadow">
                  {event.category}
                </span>
              </div>

              <div className="p-5">
                <h3 className="text-2xl font-semibold text-gray-800">
                  {event.title}
                </h3>
                <p className="text-gray-600 mt-2">
                  {event.description.substring(0, 100)}...
                </p>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-sm text-gray-500">📍 {event.location}</p>
                  <p className="text-sm text-gray-500">
                    🗓 {new Date(event.date).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => navigate(`/events/${event._id}`)}
                  className="mt-5 w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedEvents;
