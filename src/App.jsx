import { Routes, Route } from "react-router-dom";
import "./App.css";
import IndexPage from "./assets/pages/IndexPage";
import LoginPage from "./assets/pages/LoginPage";
import Layout from "./Layout";
import RegisterPage from "./assets/pages/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./UserContext";

import ProfilePage from "./assets/pages/ProfilePage";
import PlacePage from "./assets/pages/PlacePage";
import PlacesFormPage from "./assets/pages/PlacesFormPage";
import ViewPage from "./assets/pages/ViewPage";
import BookingsPage from "./assets/pages/BookingsPage";
import BookingPage from "./assets/pages/BookingPage";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<ProfilePage />} />
          {/* <Route path="/account/bookings" element={<AccountPage />} />
          <Route path="/account/places" element={<AccountPage />} /> */}
          <Route path="/account/places" element={<PlacePage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
          <Route path="/place/:id" element={<ViewPage />} />
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route path="/account/bookings/:id" element={<BookingPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
