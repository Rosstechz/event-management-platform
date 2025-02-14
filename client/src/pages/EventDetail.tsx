import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../configure";
import { useAuthStore } from "../store/userAuth";
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

const EventDetail = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<EventProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [registering, setRegistering] = useState(false);
  const { user, token } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!eventId) {
      setError("Invalid event Id");
      setLoading(false);
      return;
    }

    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/events/${eventId}`);
        setEvent(response.data.event);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load event details");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleRegister = async () => {
    if (!user) {
      toast.error("You need to log in to register for an event.");
      navigate("/login");
      return;
    }
    setRegistering(true);

    try {
      const response = await axios.post(
        `${BASE_URL}/events/${eventId}/register`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to register. Try again"
      );
    } finally {
      setRegistering(false);
    }
  };

  if (loading)
    return (
      <p className="text-gray-600 text-center py-10">
        Loading event details...
      </p>
    );
  if (error) return <p className="text-red-600 text-center py-10">{error}</p>;
  if (!event)
    return <p className="text-gray-600 text-center py-10">Event not found.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#040F0F] to-[#2D3A3A]">
      <div className="max-w-4xl mx-auto px-6 py-32">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-80 object-cover rounded-lg shadow-md"
          onError={(e) => (e.currentTarget.src = "/fallback.jpg")}
        />
        <h2 className="text-4xl font-bold text-white mt-6">{event.title}</h2>
        <p className="text-lg text-white mt-4">{event.description}</p>
        <div className="mt-6 text-white ">
          📍 <strong>Location:</strong> {event.location}
        </div>
        <div className="mt-2 text-white">
          🗓 <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
        </div>
        <div className="mt-4">
          <span className="text-sm font-semibold bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
            {event.category}
          </span>
        </div>

        <button
          onClick={handleRegister}
          className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
          disabled={registering}
        >
          {registering ? "Registering..." : "Register for Event"}
        </button>
      </div>
    </div>
  );
};

export default EventDetail;
