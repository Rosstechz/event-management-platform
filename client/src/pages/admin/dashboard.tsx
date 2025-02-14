import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../configure";
import toast from "react-hot-toast";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface Event {
  _id: string;
  title: string;
  attendees: User[];
}

const Dashboard = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRegisteredUser = async () => {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        setError("Unauthorized: No admin token found");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${BASE_URL}/events/registered-users`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setEvents(response.data.events);
      } catch (err: any) {
        setError(
          err.response?.data?.message || "Failed to load registered users"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRegisteredUser();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-semibold text-center text-slate-600 mb-6">
        Admin Dashboard
      </h2>

      {loading && <p className="text-gray-600 text-center">Loading...</p>}
      {error && <p className="text-red-600 text-center">{error}</p>}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-slate-600">
          Registered Users
        </h3>

        {events.length === 0 ? (
          <p className="text-gray-500">No registrations yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
              <thead>
                <tr className="bg-slate-700 text-white">
                  <th className="p-4 text-left">User Name</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Registered Event</th>
                </tr>
              </thead>
              <tbody>
                {events?.map((event) =>
                  event.attendees?.map((user) => (
                    <tr
                      key={user._id}
                      className="border-b bg-white hover:bg-gray-100 transition"
                    >
                      <td className="p-4 font-semibold text-blue-600">
                        {user.name}
                      </td>
                      <td className="p-4 font-semibold text-blue-600">
                        {user.email}
                      </td>
                      <td className="p-4 font-semibold text-blue-600">
                        {event.title}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
