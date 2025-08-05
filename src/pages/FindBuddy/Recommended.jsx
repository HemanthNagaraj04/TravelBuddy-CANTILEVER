// inside Recommended.jsx

import { Recommendations } from "./RecommendedOptions";


const Recommended = ({onSelectPlace}) => (
  <div className="grid grid-cols-5 gap-4">
    {Recommendations.map((place, idx) => (
      <div key={idx} className="flex flex-col items-center gap-1 bg-white rounded-xl p-3 shadow hover:scale-105">
        <img src={place.img} alt={place.name} className="w-45 h-35 rounded-md object-cover" />
        <p className="font-medium text-md text-blue-500">{place.name}</p>
        <button onClick={() => onSelectPlace(place.name)}
          className="bg-blue-600 hover:bg-blue-800 text-white  rounded-3xl transition cursor-pointer text-sm px-2 py-1"
        >
          Set Visit
        </button>
      </div>
    ))}
  </div>
);
export default Recommended