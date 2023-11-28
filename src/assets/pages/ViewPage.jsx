/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import BookingWidget from "../../BookingWidget";

export default function ViewPage() {
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const { id } = useParams();

  if (!id) {
    return <Navigate to="/" />;
  }
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) {
    return;
  }
  if (showAllPhotos) {
    return (
      <div className="absolute bg-black text-white inset-0 h-full">
        <h2 className="font-semibold text-2xl mb-3 my-6 mr-28">
          Photos of {place.title}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 gap-2 bg-black">
          <div className="fixed right-4 top-4">
            <button
              onClick={() => setShowAllPhotos(false)}
              className="flex gap-1 py-2 px-4 rounded-2xl font-semibold shadow-md text-black cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                  clipRule="evenodd"
                />
              </svg>
              Close
            </button>
          </div>
          {place.photos?.map((photo) => (
            <div key={photo}>
              <img
                className="aspect-square w-full h-full object-cover rounded-lg"
                src={"http://localhost:4000/uploads/" + photo}
                alt="place"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 mx-auto lg:w-11/12">
      <h1 className="text-xl font-semibold">{place.title}</h1>
      <a
        href={"https://maps.google.com/?q=" + place.address}
        target="_blank"
        className="flex gap-1 my-3 underline text-slate-500 text-sm font-normal items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
            clipRule="evenodd"
          />
        </svg>

        {place.address}
      </a>
      <div className="relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
          <div>
            {place.photos?.[0] && (
              <div>
                <img
                  onClick={() => setShowAllPhotos(true)}
                  className="aspect-square object-cover cursor-pointer"
                  src={"http://localhost:4000/uploads/" + place.photos[0]}
                  alt="place"
                />
              </div>
            )}
          </div>
          <div className="grid  ">
            {place.photos?.[1] && (
              <img
                onClick={() => setShowAllPhotos(true)}
                className="aspect-square object-cover cursor-pointer"
                src={"http://localhost:4000/uploads/" + place.photos[1]}
                alt="place"
              />
            )}
            <div className="overflow-hidden">
              {place.photos?.[2] && (
                <img
                  onClick={() => setShowAllPhotos(true)}
                  className="aspect-square object-cover relative top-2 cursor-pointer"
                  src={"http://localhost:4000/uploads/" + place.photos[2]}
                  alt="place"
                />
              )}
            </div>
          </div>
        </div>

        <div className="absolute bottom-2 right-2">
          <button
            onClick={() => setShowAllPhotos(true)}
            className="flex gap-1 items-center bg-white font-medium rounded-lg border-2 border-black shadow-sm shadow-gray-500 cursor-pointer p-2 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
            >
              <path
                fillRule="evenodd"
                d="M11.622 1.602a.75.75 0 01.756 0l2.25 1.313a.75.75 0 01-.756 1.295L12 3.118 10.128 4.21a.75.75 0 11-.756-1.295l2.25-1.313zM5.898 5.81a.75.75 0 01-.27 1.025l-1.14.665 1.14.665a.75.75 0 11-.756 1.295L3.75 8.806v.944a.75.75 0 01-1.5 0V7.5a.75.75 0 01.372-.648l2.25-1.312a.75.75 0 011.026.27zm12.204 0a.75.75 0 011.026-.27l2.25 1.312a.75.75 0 01.372.648v2.25a.75.75 0 01-1.5 0v-.944l-1.122.654a.75.75 0 11-.756-1.295l1.14-.665-1.14-.665a.75.75 0 01-.27-1.025zm-9 5.25a.75.75 0 011.026-.27L12 11.882l1.872-1.092a.75.75 0 11.756 1.295l-1.878 1.096V15a.75.75 0 01-1.5 0v-1.82l-1.878-1.095a.75.75 0 01-.27-1.025zM3 13.5a.75.75 0 01.75.75v1.82l1.878 1.095a.75.75 0 11-.756 1.295l-2.25-1.312a.75.75 0 01-.372-.648v-2.25A.75.75 0 013 13.5zm18 0a.75.75 0 01.75.75v2.25a.75.75 0 01-.372.648l-2.25 1.312a.75.75 0 11-.756-1.295l1.878-1.096V14.25a.75.75 0 01.75-.75zm-9 5.25a.75.75 0 01.75.75v.944l1.122-.654a.75.75 0 11.756 1.295l-2.25 1.313a.75.75 0 01-.756 0l-2.25-1.313a.75.75 0 11.756-1.295l1.122.654V19.5a.75.75 0 01.75-.75z"
                clipRule="evenodd"
              />
            </svg>
            More Photos
          </button>
        </div>
      </div>

      <div className="mt-8 mb-6 gap-6 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="text-xl font-semibold">Description</h2>
            <p className="text-gray-500">{place.description}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">What this place offers</h2>
            <div className="mt-2">
              {place.perks.map((perk, index) => (
                <div className="text-xl font-light" key={index}>
                  {perk}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <BookingWidget place={place} />
        </div>
      </div>
      <div className="py-6 border-t border-gray-300">
        <div>
          <h2 className="text-xl font-semibold">Extra info</h2>
        </div>
        <div className=" mb-4 mt-2 text-gray-500 leading-5 text-sm">
          {place.extraInfo}
        </div>
      </div>
    </div>
  );
}
