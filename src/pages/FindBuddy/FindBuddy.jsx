import { useContext, useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { UserContext } from '../../context/UserContext';
import Profile from '../SignIn/profile';
import 'mapbox-gl/dist/mapbox-gl.css';
import { createRoot } from 'react-dom/client';
import { io } from 'socket.io-client';
import Recommended from './Recommended';


const socket = io('http://localhost:5000');
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const PopupContent = ({ username }) => {
  const handleChatClick = () => {
    alert(`Starting a chat with ${username}!`);
  };

  return (
    <div className="w-[220px] bg-white rounded-xl shadow-xl border border-blue-300 px-5 py-4 flex flex-col items-center text-center">
      <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl mb-3">
        📍
      </div>
      <p className="text-xs text-gray-500 uppercase tracking-wider">Destination by</p>
      <h3 className="text-lg font-medium text-gray-800 mb-3">{username}</h3>
      <button
        onClick={handleChatClick}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 rounded-lg shadow transition"
      >
        Chat with {username.split(' ')[0]}
      </button>
    </div>
  );
};



const FindBuddy = () => {
  const [destination, setDestination] = useState('');
  const { userDetails, searchHistory, setSearchHistory } = useContext(UserContext);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [markedDestinations, setMarkedDestinations] = useState([]);
  const [pendingLocation, setPendingLocation] = useState(null);
  const [showRecommendations, setShowRecommendations] = useState(true);
  const [showHistory, setShowHistory] = useState(false);
  useEffect(() => {
    socket.on('destination-updated', (data) => {
      setMarkedDestinations(prev => [...prev, data]);
    });

    return () => {
      socket.off('destination-updated');
    };
  }, []);

  const geocodeLocation = async (place) => {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(place)}.json?access_token=${mapboxgl.accessToken}`
    );
    const data = await response.json();
    if (!data.features.length) throw new Error('Location not found');
    const [lng, lat] = data.features[0].center;
    return { lat, lng };
  };

  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [78.9629, 20.5937],
      zoom: 4,
    });

    mapRef.current.on('load', () => {
      mapRef.current.addSource('destination-point', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] },
      });

      mapRef.current.addLayer({
        id: 'destination-circle',
        type: 'circle',
        source: 'destination-point',
        paint: {
          'circle-color': '#ff0000',
          'circle-radius': 8,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff',
        },
      });

      mapRef.current.on('click', 'destination-circle', (e) => {
        const { lng, lat } = e.lngLat;
        const { markedBy } = e.features[0].properties;
        const popupNode = document.createElement('div');
        popupNode.style.maxWidth = '220px';

        const root = createRoot(popupNode);
        root.render(<PopupContent username={markedBy || 'Unknown'} />);

        new mapboxgl.Popup({ offset: 25 })
          .setLngLat([lng, lat])
          .setDOMContent(popupNode)
          .addTo(mapRef.current);
      });
    });

    return () => mapRef.current.remove();
  }, []);

  useEffect(() => {
    if (
      mapRef.current &&
      mapRef.current.isStyleLoaded() &&
      markedDestinations.length > 0
    ) {
      const geojsonFeatures = markedDestinations.map(dest => ({
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [dest.lng, dest.lat] },
        properties: { markedBy: dest.markedBy },
      }));

      const newGeojson = {
        type: 'FeatureCollection',
        features: geojsonFeatures,
      };

      const source = mapRef.current.getSource('destination-point');
      if (source) source.setData(newGeojson);
    }
  }, [markedDestinations]);

  useEffect(() => {
    const fetchSearchHistory = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch('http://localhost:5000/api/search/get-search-history', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setSearchHistory(data.searchHistory || []);
        setMarkedDestinations(
          (data.searchHistory || []).map(dest => ({
            ...dest,
            markedBy: userDetails.username,
          }))
        );
      } catch (err) {
        console.error('Error fetching history:', err);
      }
    };

    if (userDetails) fetchSearchHistory();
  }, [userDetails]);

  const handleRecommendedClick = async (placeName) => {
    setDestination(placeName);
    try {
      const { lat, lng } = await geocodeLocation(placeName);
      mapRef.current.flyTo({ center: [lng, lat], zoom: 10 });
      setPendingLocation({ lat, lng, name: placeName });
    } catch (err) {
      console.error('Geocoding failed:', err.message);
      setPendingLocation(null);
    }
  };


  const handleSubmit = async () => {
    try {
      const { lat, lng } = await geocodeLocation(destination);
      mapRef.current.flyTo({ center: [lng, lat], zoom: 10 });
      setPendingLocation({ lat, lng, name: destination });
    } catch (err) {
      console.error('Geocoding failed:', err.message);
      setPendingLocation(null);
    }
  };

  const handleConfirm = async () => {
    if (!pendingLocation || !userDetails) return;
    const { lat, lng, name } = pendingLocation;

    try {
      const newPoint = {
        lat,
        lng,
        name,
        markedBy: userDetails.username,
      };

      // Update map + share with others
      setMarkedDestinations(prev =>
        [newPoint]
      );
      socket.emit('new-destination', newPoint);

      // Save to backend
      const token = localStorage.getItem('token');
      await fetch('http://localhost:5000/api/search/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newPoint),
      });

      setPendingLocation(null);
    } catch (err) {
      console.error('Error saving location:', err.message);
    }
  };

  return (
    <div className="relative h-screen w-screen">
      <div ref={mapContainerRef} className="h-full w-full" />

      <div className="absolute top-3 left-3 max-h-3/4 w-full max-w-xs bg-white/50 backdrop-blur-lg rounded-2xl shadow-lg p-6 flex flex-col gap-4 z-10">
        <div className="flex items-center gap-5 p-3">
          <Profile />
          <div className="text-2xl font-light">{userDetails?.username}</div>
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
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-3xl transition"
        >
          Search Location
        </button>

        {/* <div>
          <button
            onClick={() => setShowRecommendations(!showRecommendations)}
            className="text-sm text-blue-700 underline hover:text-blue-900 transition self-start"
          >
            {showRecommendations ? 'Hide Recommendations' : 'Show Recommendations'}
          </button>
          

        </div> */}

        {pendingLocation && (
          <div className="flex flex-col gap-2 p-3 bg-gray-100 rounded-xl">
            <h3 className="text-sm font-medium">
              Set "{pendingLocation.name}" as your destination?
            </h3>
            <div className="flex gap-2">
              <button
                onClick={handleConfirm}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-3xl transition"
              >
                Confirm
              </button>
              <button
                onClick={() => setPendingLocation(null)}
                className="flex-1 bg-gray-400 hover:bg-gray-500 text-white text-sm px-4 py-2 rounded-3xl transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {searchHistory.length > 0 && (
          <>
            <button
              onClick={() => setShowHistory(prev => !prev)}
              className="text-sm text-blue-700 underline hover:text-blue-900 transition self-start"
            >
              {showHistory ? 'Hide History' : 'Show History'}
            </button>

            {showHistory && (
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-medium text-blue-800">Past Searches</h3>
                <ul className="text-sm font-light ml-3 text-gray-700">
                  {searchHistory.slice(-5).map((item, idx) => (
                    <li key={item._id || idx}>{item.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
      {showRecommendations &&
        <div className="hidden md:block absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-3xl bg-white/60 backdrop-blur-lg rounded-2xl shadow-xl p-4 z-10">
          <Recommended onSelectPlace={handleRecommendedClick} />
        </div>
      }


    </div>
  );
};

export default FindBuddy;
