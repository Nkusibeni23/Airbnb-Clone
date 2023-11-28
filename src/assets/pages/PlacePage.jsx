/* eslint-disable react/jsx-key */
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImage from "../../PlaceImage";

export default function PlacePage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);
  return (
    <div className="mt-5">
      <div className="flex items-center justify-center mb-8 text-center font-medium">
        <Link
          className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
          to={"/account/places/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
              clipRule="evenodd"
            />
          </svg>
          Add New Place
        </Link>
      </div>
      <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {places.length > 0 &&
          places.map((place) => (
            <Link
              to={`/account/places/${place._id}`}
              className=" cursor-pointer bg-gray-50 hover:bg-slate-100 duration-100 p-4 rounded-2xl"
              key={place._id}
            >
              <div className="text-center">
                <PlaceImage place={place} />
                <h2 className="text-lg font-semibold">{place.title}</h2>
                <h2 className="text-slate-400 underline text-sm mt-2">
                  {place.address}
                </h2>
                <p className="text-gray-500 text-sm mt-3">
                  {place.description}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
