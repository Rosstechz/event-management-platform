import { NavLink } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative w-full h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/4577179/pexels-photo-4577179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Hero Content */}
        <div className="relative flex flex-col justify-center items-center text-center text-white h-full px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Discover Exciting Events
          </h1>
          <p className="text-lg md:text-xl mt-4 max-w-2xl">
            Browse upcoming events and secure your spot with a simple
            registration process.
          </p>
          <button className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition duration-300 shadow-lg">
            <NavLink to="/events">View Events</NavLink>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
