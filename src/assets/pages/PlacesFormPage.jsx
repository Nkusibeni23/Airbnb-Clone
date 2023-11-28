import { useEffect, useState } from "react";
import Perks from "../../Perks";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";

export default function PlacesFormPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [photos, setPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [prices, setPrice] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (id) {
      axios.get(`/places/${id}`).then((response) => {
        const {
          title,
          address,
          photos,
          description,
          perks,
          extraInfo,
          checkIn,
          checkOut,
          maxGuests,
          prices,
        } = response.data;
        setTitle(title);
        setAddress(address);
        setPhotos(photos);
        setDescription(description);
        setPerks(perks);
        setExtraInfo(extraInfo);
        setCheckIn(checkIn);
        setCheckOut(checkOut);
        setMaxGuests(maxGuests);
        setPrice(prices);
      });
    }
  }, [id]);

  function inputHeader(text) {
    return <h2 className="text-lg font-medium mt-4">{text}</h2>;
  }
  function inputDescription(text) {
    return <p className="text-gray-400 text-sm">{text}</p>;
  }
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  const addPhotoByLink = async (e) => {
    e.preventDefault();
    try {
      const { data: filename } = await axios.post("/upload-by-link", {
        link: photoLink,
      });

      setPhotos((prev) => [...prev, filename]);
      setPhotoLink("");
    } catch (error) {
      console.error("Error uploading photo:", error);
    }
  };

  const uploadPhoto = (e) => {
    const files = e.target.files;
    const data = new FormData();

    if (!files || files.length === 0) {
      alert("Please select a file to upload.");
      return;
    }

    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }

    axios
      .post("/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filenames } = response;
        setPhotos((prev) => [...prev, ...filenames]);
      });
  };

  const savePlace = async (e) => {
    e.preventDefault();

    const placeData = {
      title,
      address,
      photos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      prices,
    };

    console.log("Received ID:", id); // Check if id is defined

    try {
      if (id) {
        // Update place
        await axios.put(`/places/${id}`, placeData);
      } else {
        // Create new place
        await axios.post("/places", placeData);
      }

      setRedirect(true);
    } catch (error) {
      console.error("Error saving place:", error);
    }
  };

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  function removePhoto(e, filename) {
    e.preventDefault();
    setPhotos([...photos.filter((photo) => photo !== filename)]);
  }
  function selectAsMainPhoto(e, filename) {
    e.preventDefault();
    const addedPhotosWithoutSelected = photos.filter(
      (photo) => photo !== filename
    );
    const newAddedPhotos = [filename, ...addedPhotosWithoutSelected];
    setPhotos(newAddedPhotos);
  }
  return (
    <div className="px-4 mt-6">
      <form onSubmit={(e) => e.preventDefault()}>
        {" "}
        {preInput(
          "Title",
          "Title for your place, should be short and catchy as in advertisement"
        )}
        <input
          type="text"
          placeholder="Title. for example: My lovely apartment"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        {preInput("Address", "Address to this place")}
        <input
          type="text"
          placeholder="Address. for example: 123 Main St. Kigali, Rwanda"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        {preInput("Photos", "More equal Better")}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder={"Add using a link ....jpg"}
            value={photoLink}
            onChange={(e) => setPhotoLink(e.target.value)}
          />
          <button
            type="button"
            onClick={addPhotoByLink}
            className="bg-gray-300 font-medium px-4 py-2 sm:py-1 rounded-xl text-gray-500"
          >
            Add&nbsp;Photo
          </button>
        </div>
        <div className="mt-2 gap-2 grid grid-cols-3 md:grid-col-4 lg:grid-cols-6 ">
          {photos.length > 0 &&
            photos.map((link, index) => (
              <div key={`${index}-${link}`} className="flex relative">
                <img
                  className="rounded-lg w-full object-cover"
                  src={`http://localhost:4000/uploads/${link}`}
                  alt="place"
                />
                <button
                  onClick={(e) => removePhoto(e, link)}
                  className="absolute bottom-1 right-1 cursor-pointer bg-black bg-opacity-50 text-white rounded-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  onClick={(e) => selectAsMainPhoto(e, link)}
                  className="absolute bottom-1 left-1 bg-opacity-10 cursor-pointer text-white"
                >
                  {link === photos[0] && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  {link !== photos[0] && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            ))}

          <label className="flex gap-1 items-center justify-center border bg-transparent rounded-xl p-8 text-2xl font-medium text-gray-500 cursor-pointer">
            <input
              type="file"
              multiple
              className="hidden"
              onChange={uploadPhoto}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6 6 0 00-5.98 6.496A5.25 5.25 0 006.75 20.25H18a4.5 4.5 0 002.206-8.423 3.75 3.75 0 00-4.133-4.303A6.001 6.001 0 0010.5 3.75zm2.03 5.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72v4.94a.75.75 0 001.5 0v-4.94l1.72 1.72a.75.75 0 101.06-1.06l-3-3z"
                clipRule="evenodd"
              />
            </svg>
            Upload
          </label>
        </div>
        {preInput("Description", "Description of the place")}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        {preInput("Perks", "Select all the perks of your place")}
        <div className="grid grid-cols-2 mt-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selected={perks} onChange={setPerks} />
        </div>
        {preInput(
          "Extra info",
          " Add any additional details, example: house rules, etc,..."
        )}
        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />
        {preInput(
          "Check in & Out times",
          "Add check in and out times, remember to have some time window for cleaning the room between guests"
        )}
        <div className="grid gap-2 sm:grid-cols-3">
          <div>
            <h3 className="text-medium font-medium mt-4">Check in time</h3>
            <input
              type="text"
              placeholder="14:00pm"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              required
            />
          </div>
          <div>
            <h3 className="text-medium font-medium mt-4">Check out time</h3>
            <input
              type="text"
              placeholder="11:00am"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              required
            />
          </div>
          <div>
            <h3 className="text-medium font-medium mt-4">Number of guests</h3>
            <input
              type="number"
              placeholder="Max of Guests"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
              required
            />
          </div>
        </div>
        {preInput("Price", "Price per night")}
        <input
          type="number"
          value={prices}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price for single night"
          required
        />
        <button
          onClick={savePlace}
          className="bg-primary text-white rounded-xl w-full my-4 p-3 mt-4 font-medium"
        >
          SAVE
        </button>
      </form>
    </div>
  );
}
