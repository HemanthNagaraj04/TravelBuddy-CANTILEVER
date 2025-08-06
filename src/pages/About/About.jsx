import { useNavigate } from "react-router"
import planTrip from '../../assets/plan-trip.png'
import findBud from '../../assets/find-buddy.png'
import paris from '../../assets/PlaceImages/paris.jpg';
import bali from '../../assets/PlaceImages/bali.jpg';
import tokyo from '../../assets/PlaceImages/tokyo.jpg';
import newyork from '../../assets/PlaceImages/newyork.jpg';

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-blue-50 flex flex-col justify-center items-center min-h-screen">
      <div className="bg-white p-2 rounded-2xl mt-5 flex items-center justify-between w-3/4 max-w-4xl">
        <div className="flex items-center">
          <img src="/logo.png" alt="Travel Buddy" width={60} height={60} />
          <h1 className="text-blue-700 font-medium ml-3">Travel Buddy</h1>
        </div>
        <div>
          <button
            className="text-white bg-blue-600 rounded-full shadow-md hover:bg-blue-700 px-4 py-2 cursor-pointer"
            onClick={() => navigate('/Home')}
          >
            Home
          </button>
        </div>
      </div>

      <div className="mt-10 text-center bg-white rounded-2xl p-8 w-3/4 max-w-4xl">
        <p className="text-3xl text-gray-700 font-bold mb-6">Experience Traveling Like Never Before</p>

        <section className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col shadow-2xl hover:scale-105 transition-transform duration-300 w-full md:w-1/2 rounded-2xl p-4">
            <div className="flex gap-3 items-center mb-2">
              <img src={planTrip} alt="Plan Trip" width={60} height={60} />
              <p className="font-bold">Personalize Your Adventure</p>
            </div>
            <p className="font-light mt-4">From hidden gems to popular spots, design your perfect journey effortlessly.
              Let our AI craft a unique itinerary tailored just for you—every trip, your way.
            </p>
            <button onClick={()=>navigate('/tripplaner')}
              className="mt-3 bg-gradient-to-r from-blue-400 to-blue-600 px-4 py-2 rounded-full text-white shadow-lg hover:from-blue-500 hover:to-blue-700 transition-transform cursor-pointer"
            >
              Plan a trip with AI
            </button>
          </div>

          <div className="flex flex-col shadow-2xl hover:scale-105 transition-transform duration-300 w-full md:w-1/2 rounded-2xl p-4">
            <div className="flex gap-3 items-center mb-2">
              <img src={findBud} alt="Find Buddy" width={60} height={60} />
              <p className="font-bold">Explore the World with your ideal Buddy</p>
            </div>
            <p className="font-light mt-4">Meet fellow explorers and discover destinations handpicked for your shared interests.
              Find your perfect travel partner and share adventures that last a lifetime.
            </p>
            <button onClick={()=>navigate('/findabuddy')}
              className="mt-3 bg-gradient-to-r from-blue-600 to-blue-400 px-4 py-2 rounded-full text-white shadow-lg hover:from-blue-700 hover:to-blue-500 transition-transform cursor-pointer">
              Find a Buddy
            </button>
          </div>
        </section>
      </div>
      <div className="mt-10 text-center bg-white rounded-2xl p-8 w-3/4 max-w-4xl">
        <p className="text-3xl text-gray-700 font-bold mb-6">Dont take our word for it</p>
        <p className="text-gray-500">See what our users have to say</p>

        <section className="flex flex-col md:flex-row gap-6 mt-5">

          <div className="bg-green-50 p-4 rounded-2xl border-1 border-green-400 drop-shadow-lg hover:scale-105 transition-transform duration-300">
            <div className="flex flex-col items-start">
              <p className="font-medium">David Jordan</p>
              <p className="font-light text-gray-500">Student</p>
              <p className="text-sm">⭐⭐⭐⭐</p>
              <p className="font-light">"Travel Buddy matched me with the perfect partner for my trip to Bali. We ended up becoming lifelong friends!"</p>
            </div>
          </div>

          <div className="bg-orange-50 p-4 rounded-2xl border-1 border-orange-400 mt-10 drop-shadow-lg hover:scale-105 transition-transform duration-300">
            <div className="flex flex-col items-start">
              <p className="font-medium">Alex R</p>
              <p className="font-light text-gray-500">Adventure Seeker</p>
              <p className="text-sm">⭐⭐⭐⭐⭐</p>
              <p className="font-light">"I used to spend days planning trips... now it takes me 5 minutes. This AI is a game-changer!"</p>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-2xl border-1 border-green-400 drop-shadow-lg hover:scale-105 transition-transform duration-300">
            <div className="flex flex-col items-start">
              <p className="font-medium">Sarah L</p>
              <p className="font-light text-gray-500">First-Time Traveler</p>
              <p className="text-sm">⭐⭐⭐⭐</p>
              <p className="font-light">"I found the perfect co-working/travel balance in Lisbon, and even joined a group of fellow digital nomads!"</p>
            </div>
          </div>
        </section>
      </div>
      <div className="mt-10 text-center bg-white rounded-2xl p-8 w-3/4 max-w-4xl">
        <p className="text-3xl text-gray-700 font-bold mb-6">Journey Inspirations from Travelers</p>
        <p className="text-gray-500">Dive into unique trip itineraries crafted by our AI.
          Find your next adventure buddy and share your own journey with fellow explorers.</p>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">

          <div className="relative hover:scale-105 transition-transform duration-300 h-80">
            <img
              src={paris}
              alt="Paris"
              className="rounded-2xl w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 flex flex-col justify-start items-start bg-black/30 p-2 rounded-xl max-w-xs">
              <p className="text-white text-xl font-semibold mb-1">Trip to Paris</p>
              <p className="text-white text-sm">
                Fall in love with the charm of Paris—where every corner tells a story.
              </p>
            </div>
          </div>

          <div className="relative hover:scale-105 transition-transform duration-300 h-64">
            <img
              src={bali}
              alt="Bali"
              className="rounded-2xl w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 flex flex-col justify-start items-start bg-black/30 p-2 rounded-xl max-w-xs">
              <p className="text-white text-xl font-semibold mb-1">Trip to Bali</p>
              <p className="text-white text-sm">
                Unwind in paradise—where lush jungles meet crystal-clear beaches.
              </p>
            </div>
          </div>

          <div className="relative hover:scale-105 transition-transform duration-300 h-72">
            <img
              src={newyork}
              alt="New York"
              className="rounded-2xl w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 flex flex-col justify-start items-start bg-black/30 p-2 rounded-xl max-w-xs">
              <p className="text-white text-xl font-semibold mb-1">Trip to New York</p>
              <p className="text-white text-sm">
                Embrace the energy of the city that never sleeps—where every moment feels alive.
              </p>
            </div>
          </div>

          <div className="relative hover:scale-105 transition-transform duration-300 h-96">
            <img
              src={tokyo}
              alt="Tokyo"
              className="rounded-2xl w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 flex flex-col justify-start items-start bg-black/30 p-2 rounded-xl max-w-xs">
              <p className="text-white text-xl font-semibold mb-1">Trip to Tokyo</p>
              <p className="text-white text-sm">
                Where tradition meets tomorrow—Tokyo offers a journey through time and tech.
              </p>
            </div>
          </div>
        </section>


      </div>
    </div>
  );
};


export default About
