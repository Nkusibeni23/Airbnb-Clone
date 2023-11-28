import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function BookingPage() {
  const [booking, setBooking] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    axios.get(`/bookings/`).then((response) => {
      const foundBooking = response.data.find(({ _id }) => _id === id);
      if (foundBooking) {
        setBooking(foundBooking);
      }
    });
  }, [id]);

  if (!booking) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      xw
      <h1>Booking Details</h1>
      <p>Booking ID: {booking._id}</p>
      <p>Place ID: {booking.place}</p>
      <p>Check In: {booking.checkIn}</p>
      <p>Check Out: {booking.checkOut}</p>
      <p>Number of Guests: {booking.numberOfGuests}</p>
      <p>Name: {booking.name}</p>
    </div>
  );
}
