import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces(response.data);
    });
  }, []);

  return (
    <div className="mt-8 gap-x-6 gap-y-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 cursor-pointer p-1">
      {places.length > 0 &&
        places.map((place) => (
          <Link to={"/place/" + place._id} key={place._id} className="mb-2">
            <div className="bg-gray-400 rounded-2xl overflow-hidden">
              {place.photos?.[0] && (
                <img
                  className="rounded-2xl object-cover aspect-square w-full h-full"
                  src={"http://localhost:4000/uploads/" + place.photos[0]}
                  alt="place"
                />
              )}
            </div>
            <h2 className="mt-2 text-md font-semibold truncate">
              {place.address}
            </h2>
            <h3 className="text-xs font-medium text-slate-400">
              {place.title}
            </h3>
            <div className="mt-2">
              <span className="font-bold">${place.prices}</span> night
            </div>
          </Link>
        ))}
    </div>
  );
}
