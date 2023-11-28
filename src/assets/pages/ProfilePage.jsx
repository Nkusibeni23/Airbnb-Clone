/* eslint-disable react-hooks/rules-of-hooks */
import { useContext, useState } from "react";
import { UserContext } from "../../UserContext";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacePage from "./PlacePage";

export default function ProfilePage() {
  const [toHomepage, setHomepage] = useState(null);
  const { user, ready, setUser } = useContext(UserContext);

  let { subpath } = useParams();
  if (subpath === undefined) {
    subpath = "profile";
  }

  async function logout() {
    await axios.post("/logout");
    setHomepage("/");
    setUser(null);
  }

  if (!ready) {
    return "Loading.....";
  }

  if (ready && !user && !toHomepage) {
    return <Navigate to={"/login"} />;
  }

  if (toHomepage) {
    return <Navigate to={toHomepage} />;
  }

  return (
    <div className="flex items-center justify-center mt-12">
      {subpath === "profile" && (
        <div className="text-center">
          Logged in as {user?.name} {user?.email}
          <br />
          <br />
          <button
            className="flex items-center justify-center gap-1 text-primary font-medium rounded bg-white"
            onClick={logout}
            style={{ maxWidth: "200px", width: "100%", margin: "0 auto" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8"
            >
              <path
                fillRule="evenodd"
                d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z"
                clipRule="evenodd"
              />
            </svg>
            Sign Out
          </button>
        </div>
      )}

      {subpath === "bookings" && <div>Booking</div>}
      {subpath === "places" && <PlacePage />}
    </div>
  );
}
