import { Link, useNavigate } from "react-router";
import { TravelOptions, BudgetOptions, AI_Prompt } from "./options.jsx"
import { useEffect, useState } from "react";
import { Slide, toast } from "react-toastify";
import { generateItinerary } from "../../../service/AIModel.jsx";


const TripPlaner = () => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState([]);
  const [place, setPlace] = useState("");
  const handleInput = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }

  useEffect(() => {
    console.log(formData);
  }, [formData])



  const onGenerateTrip = async () => {
    const { Location, noOfDays, noOfPeople, budget } = formData;

    if (!Location) {
      toast.warn("Enter Location", { transition: Slide, autoClose: 2000, closeOnClick: true });
      return;
    }
    if (!noOfDays || noOfDays > 12) {
      toast.warn("Please enter a valid number of days (max 12).", { transition: Slide, autoClose: 2000, closeOnClick: true });
      return;
    }
    if (!noOfPeople) {
      toast.warn("Please select the number of people.", { transition: Slide, autoClose: 2000, closeOnClick: true });
      return;
    }

    if (!budget) {
      toast.warn("Please select a budget.", { transition: Slide, autoClose: 2000, closeOnClick: true });
      return;
    }
    console.log("Generating trip with data:", formData);

    try {
      const generatedData = await generateItinerary(formData);
      if (generatedData) {
        console.log(generatedData);
      }
      else {
        console.log("try error");
      }
    } catch (error) {
      console.error("Error during trip generation:", error);
    }
  };


  return (
      <div className="bg-gradient-to-b from-blue-100 to-blue-300">

        <div className="min-h-screen items-center p-8 m-auto">

          <div className="flex justify-between items-center mb-1 bg-white p-3 rounded-t-4xl">

              <img src="/logo.png" alt="Logo" width={90} height={90} onClick={()=>navigate('/Home')} className="rounded-full lg:ml-5" />
              <button onClick={()=>navigate('/Home')} className="text-blue-600 cursor-pointer hover:scale-105 mr-5 text-lg">Home</button>
            
          </div>


          <div className="bg-white rounded-b-4xl min-h-screen p-10 md:px-20 lg:px-40 xl:px-80">

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-800">Effortless Travel Planning Starts Now 🌍🛫</h2>
              <p className="text-gray-600 mt-2 text-lg">Answer a few quick questions and let AI handle the rest.</p>
            </div>


            <div className="mb-10">
              <h3 className="text-xl font-semibold text-gray-800">Where would you like to go? <span className="text-2xl">📍</span></h3>
              <p className="text-gray-600 mt-1 ">City, region, or hidden gem — you name it!</p>
              <input
                type="text"
                value={place}
                placeholder="e.g. Kyoto, Japan"
                className="w-full mt-3 p-2 border border-gray-300 rounded-xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => { setPlace(e.target.value); handleInput('Location', e.target.value) }}
              />
            </div>


            <div className="mb-10">
              <h3 className="text-xl font-semibold text-gray-800">How many days are you planning to travel? <span className="text-2xl">⏳</span></h3>
              <p className="text-gray-600 mt-1 ">We'll tailor your itinerary accordingly.</p>
              <input
                type="number"
                placeholder="e.g. 7"
                onChange={(e) => handleInput("noOfDays", e.target.value)}
                className="w-full mt-3 p-2 border border-gray-300 rounded-xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>


            <div className="mb-10">
              <h3 className="text-xl font-semibold text-gray-800">Choose Your Travel Vibe <span className="text-2xl">🧳</span></h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mt-4">
                {TravelOptions.map((options, index) => (
                  <div key={index}
                    onClick={() => handleInput("noOfPeople", options.people)}
                    className={`p-5 border rounded-3xl shadow cursor-pointer hover:shadow-2xl hover:scale-102
                  ${formData.noOfPeople == options.people ? "border-blue-400 border-2 shadow-blue-400" : "border-black/20"}
                  `}>
                    <h2 className="text-3xl">{options.icon}</h2>
                    <h2 className="font-medium text-lg">{options.title}</h2>
                    <h2 className="font-light">{options.desc}</h2>
                  </div>
                ))}
              </div>
            </div>


            <div className="mb-10">
              <h3 className="text-xl font-semibold text-gray-800">Choose Your Travel Budget <span className="text-2xl">💵</span></h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mt-4">
                {BudgetOptions.map((options, index) => (
                  <div key={index}
                    onClick={() => handleInput("budget", options.title)}
                    className={`p-5 border rounded-3xl shadow cursor-pointer hover:shadow-2xl hover:scale-102
                  ${formData.budget == options.title ? "border-2 border-blue-400 shadow-blue-400" : "border-black/20"}
                  `}>
                    <h2 className="text-3xl">{options.icon}</h2>
                    <h2 className="font-medium text-lg">{options.title}</h2>
                    <h2 className="font-light">{options.desc}</h2>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center md:justify-end">
              <button className="bg-gradient-to-r from-blue-400 to-blue-600 px-4 py-2 rounded-full text-white shadow-lg hover:from-blue-500 hover:to-blue-700 transition-transform cursor-pointer"
                onClick={onGenerateTrip}
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
