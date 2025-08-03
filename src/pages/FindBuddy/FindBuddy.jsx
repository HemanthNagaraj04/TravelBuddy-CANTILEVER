import { useContext, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from 'react';
import Profile from '../SignIn/profile';
import { UserContext } from '../../context/UserContext';


mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;


const FindBuddy = () => {
  const [destination, setDestination] = useState('');
  const mapContainerRef = useRef(null);
  const {userDetails}=useContext(UserContext);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [78.9629, 20.5937], 
      zoom: 4
    });

    return () => map.remove();
  }, []);

  const handleSubmit = () => {
    console.log('Destination set to:', destination);
    // Later: Emit via socket.io
  };

  return (
    <div className="relative h-screen w-screen">

      <div ref={mapContainerRef} className="h-full w-full" />

      <div className="absolute top-3 left-3 max-h-3/4 w-full max-w-xs bg-white/50 backdrop-blur-lg rounded-2xl shadow-lg p-6 flex flex-col gap-4 z-10">

        <div className='flex items-center gap-5 p-3'>
          <div><Profile /></div>
          <div className='text-2xl font-light'>{userDetails?.username}</div>
        </div>

        <input
          type="text"
          placeholder="Enter destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="p-3 rounded-3xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-3xl transition">
          Set Location
        </button>
      </div>
    </div>
  );
};

export default FindBuddy;
