import { Link } from "react-router";
import { TravelOptions, BudgetOptions } from "./options.jsx"

const TripPlaner = () => {
  return (
    <div className="bg-gradient-to-b from-blue-100 to-blue-300">

      <div className="min-h-screen items-center p-8 m-auto">


        <div className="flex justify-between items-center mb-1 bg-white p-3 rounded-t-4xl">
          <Link to={"/"}>
            <img src="/logo.png" alt="Logo" width={90} height={90} className="rounded-full lg:ml-5" />
          </Link>
          <Link to={"/"}>
            <button className="text-blue-600 cursor-pointer hover:scale-105 mr-5 text-lg">Home</button>
          </Link>
        </div>


        <div className="bg-white rounded-b-4xl min-h-screen p-10 md:px-20 lg:px-40 xl:px-80">

          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Effortless Travel Planning Starts Now 🌍</h2>
            <p className="text-gray-600 mt-2 text-lg">Answer a few quick questions and let AI handle the rest.</p>
          </div>


          <div className="mb-10">
            <h3 className="text-xl font-semibold text-gray-800">Where would you like to go? 📍 </h3>
            <p className="text-gray-600 mt-1 ">City, region, or hidden gem — you name it!</p>
            <input
              type="text"
              placeholder="e.g. Kyoto, Japan"
              className="w-full mt-3 p-2 border border-gray-300 rounded-xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>


          <div className="mb-10">
            <h3 className="text-xl font-semibold text-gray-800">How many days are you planning to travel? ⏳</h3>
            <p className="text-gray-600 mt-1 ">We'll tailor your itinerary accordingly.</p>
            <input
              type="number"
              placeholder="e.g. 7"
              className="w-full mt-3 p-2 border border-gray-300 rounded-xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>


          <div className="mb-10">
            <h3 className="text-xl font-semibold text-gray-800">Choose Your Travel Vibe 🧳</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mt-4">
              {TravelOptions.map((options, index) => (
                <div key={index}
                  className="p-5 border border-black/30 rounded-3xl shadow cursor-pointer hover:shadow-2xl hover:scale-102">
                  <h2 className="text-3xl">{options.icon}</h2>
                  <h2 className="font-medium text-lg">{options.title}</h2>
                  <h2 className="font-light">{options.desc}</h2>
                </div>
              ))}
            </div>
          </div>


          <div className="mb-10">
            <h3 className="text-xl font-semibold text-gray-800">Choose Your Travel Vibe 🧳</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mt-4">
              {BudgetOptions.map((options, index) => (
                <div key={index}
                  className="p-5 border border-black/30 rounded-3xl shadow cursor-pointer hover:shadow-2xl hover:scale-102">
                  <h2 className="text-3xl">{options.icon}</h2>
                  <h2 className="font-medium text-lg">{options.title}</h2>
                  <h2 className="font-light">{options.desc}</h2>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button className="bg-gradient-to-r from-blue-400 to-blue-600 px-4 py-2 rounded-full text-white shadow-lg hover:from-blue-500 hover:to-blue-700 transition-transform cursor-pointer"
            >
              Generate Trip
            </button>
          </div>


        </div>
      </div>
    </div>
  );
};

export default TripPlaner;
