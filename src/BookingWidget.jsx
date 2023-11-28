/* eslint-disable no-unused-vars */
import axios from "axios";
import { differenceInCalendarDays } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

/* eslint-disable react/prop-types */
export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setName(user.name);
    }
  }, [user]);

  let numberDays = 0;
  if (checkIn && checkOut) {
    numberDays = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function reserving() {
    const response = await axios.post(
      "/bookings",
      JSON.stringify({
        placeId: place._id,
        checkIn,
        checkOut,
        numberOfGuests,
        name,
        email,
        prices: numberDays * place.prices,
      }),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-white border-2 border-gray-200 p-4 rounded-lg shadow-lg">
      <div className="text-2xl text-center font-medium">
        <label className="font-semibold">Price:</label> ${place.prices} / per
        night
      </div>
      <div className="my-2 border-2 border-gray-200 rounded-lg">
        <div className="flex flex-col md:flex-row sm:flex-row">
          <div className="py-2 px-4 mb-2 md:mb-0">
            <label className="font-semibold text-sm">CHECK-IN</label>
            <input
              className="bg-transparent px-1"
              type="date"
              value={checkIn}
              required
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className="py-2 px-4 border-l border-gray-300">
            <label className="font-semibold text-sm">CHECKOUT</label>
            <input
              className="bg-transparent px-1"
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="py-2 px-4 border-t border-gray-300">
          <label className="font-semibold text-sm">GUESTS</label>
          <input
            className="bg-transparent px-1 border border-gray-400"
            type="number"
            placeholder="Number of Guests"
            required
            value={numberOfGuests}
            onChange={(e) => setNumberOfGuests(e.target.value)}
          />
        </div>
      </div>
      {numberDays > 0 && (
        <div className="py-2 px-4 border-t border-gray-300">
          <label className="font-semibold text-sm">Full Name</label>
          <input
            className="bg-transparent px-1 border border-gray-400"
            type="text"
            placeholder="Enter Your Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="font-semibold text-sm">Email</label>
          <input
            className="bg-transparent px-1 border border-gray-400"
            type="email"
            placeholder="Enter Your Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      )}
      <button
        onClick={reserving}
        className="bg-primary mt-1 w-full py-2 rounded-2xl font-semibold text-white"
      >
        RESERVE &nbsp;{" "}
        {numberDays > 0 && (
          <span>
            ${numberDays * place.prices} | {numberDays}{" "}
            {numberDays > 1 ? "Nights" : "Night"}
          </span>
        )}
      </button>
    </div>
  );
}
