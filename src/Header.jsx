/* eslint-disable react-hooks/exhaustive-deps */
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext";
import { useContext, useEffect, useState, useRef } from "react";

export default function Header() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [show, setShow] = useState(true);
  const [viewform, setViewForm] = useState(false);
  const wrapperRef = useRef(null);
  const { user, ready, setUser } = useContext(UserContext);
  const [toHomepage, setHomepage] = useState(null);

  // Load the 'show' state from localStorage on component mount
  useEffect(() => {
    const storedShow = localStorage.getItem("show");
    // Use storedShow if it exists, otherwise set it to false
    setShow(storedShow ? JSON.parse(storedShow) : true);
    if (storedShow) {
      setShow(JSON.parse(storedShow));
    }
  }, []);

  // Save the 'show' state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("show", JSON.stringify(show));
  }, [show]);

  function handleShow(e) {
    e.preventDefault();
    setShow(!show);
  }

  function handleViewForm(e) {
    e.preventDefault();
    setViewForm(!viewform);
  }

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      // Click outside the entire Header component, close viewform
      setViewForm(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef, handleClickOutside]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 590);
    };

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isVisible = prevScrollPos > currentScrollPos;

      setPrevScrollPos(currentScrollPos);
      setVisible(isVisible || currentScrollPos < 100);
    };

    handleResize();
    handleScroll();

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  //   async function logout() {
  //     await axios.post("/logout");
  //     setHomepage("/");
  //     setUser(null);
  //   }

  //   if (!ready) {
  //     return "Loading.....";
  //   }

  //   if (ready && !user && !toHomepage) {
  //     return <Navigate to={"/login"} />;
  //   }

  //   if (toHomepage) {
  //     return <Navigate to={toHomepage} />;
  //   }

  return (
    <>
      {isSmallScreen ? (
        <>
          <div className="grid relative w-full items-center px-6">
            <form className="flex cursor-pointer">
              <input
                type="text"
                className="h-12 border border-gray-400"
                placeholder="Anywhere....."
              />
              <span className="flex items-center">
                <button className="bg-primary h-12 flex items-center text-white p-4 rounded-full cursor-pointer">
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
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </button>
              </span>
            </form>
          </div>
          <footer
            className={`flex items-center px-14 bottom-0 left-0 right-0 h-20 bg-white border-t border-gray-500 fixed cursor-pointer w-full justify-between ${
              !visible ? "hidden" : ""
            }`}
          >
            <Link to={user ? "/account" : "/login"}>
              <div className="bg-gray-500 text-white p-1 mt-1 rounded-full overflow-hidden cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-8 h-8 relative top-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              {!!user && (
                <div className="text-center text-xs font-medium">
                  {user.name}
                </div>
              )}
            </Link>
            <Link>
              <div className=" text-center px-4 text-gray-500 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-9 h-9"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
                <div className="text-sm">Wishlists</div>
              </div>
            </Link>
          </footer>
        </>
      ) : (
        <header className="p-4 flex justify-between" ref={wrapperRef}>
          <Link to={"/"} className="flex items-center gap- text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 -rotate-90"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
            <span className="font-bold text-xl hidden lg:inline">airbnb</span>
          </Link>
          {show && (
            <div
              className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300 cursor-pointer"
              onClick={handleShow}
            >
              <div className="py-1 text-sm text-center font-medium">
                Anywhere
              </div>
              <div className="border-l border-gray-300"></div>
              <div className="py-1 text-sm text-center font-medium">
                Any week
              </div>
              <div className="border-l border-gray-300"></div>
              <div className="py-1 text-sm text-center font-medium">
                Add guests
              </div>
              <button className="bg-primary text-white p-2 rounded-full">
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
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
            </div>
          )}
          {!show && (
            <div className="w-80 md:w-96 0 mx-auto items-center justify-center">
              <form className="flex">
                <input
                  type="text"
                  placeholder="Search Destination..."
                  className="border border-gray-300 rounded-full py-2 px-4 h-10"
                />
                <button
                  className="bg-primary text-white border border-gray-300 rounded-full px-3"
                  onClick={handleShow}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </button>
              </form>
            </div>
          )}
          <Link
            to={user ? "/account" : "/login"}
            className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300"
            onClick={handleViewForm}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            <div className="bg-gray-500 text-white p-1 rounded-full overflow-hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 relative top-1"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            {!!user && <div>{user.name}</div>}
          </Link>
          {viewform && (
            <div className="absolute shadow-slate-500 shadow-md rounded-lg w-32 bg-white right-9 top-24 cursor-pointer">
              <div className="p-5 text-start">
                {!user ? (
                  <>
                    <Link to="/login" className="font-semibold text-sm">
                      Log in
                    </Link>
                    <hr className="my-2 border-gray-300" />
                    <Link
                      to="/register"
                      className="hover:font-semibold duration-100 text-sm"
                    >
                      Sign up
                    </Link>
                    <hr className="my-2 border-gray-300" />
                    <div className="hover:font-semibold duration-100 text-sm">
                      Help Center
                    </div>
                  </>
                ) : (
                  <Link to={user ? "/account" : "/login"}>
                    <Link
                      to={"/account"}
                      className="text-sm hover:font-semibold duration-100"
                    >
                      Account
                    </Link>
                    <hr className="my-2 border-gray-300" />
                    <Link
                      to={"/account/bookings"}
                      className="hover:font-semibold duration-100 text-sm"
                    >
                      Notification
                    </Link>
                    <hr className="my-2 border-gray-300" />
                    <Link
                      to={"/account/places"}
                      className="hover:font-semibold duration-100 text-sm"
                    >
                      Air Home
                    </Link>
                    <hr className="my-2 border-gray-300" />
                    <Link className="hover:font-semibold duration-100 text-sm">
                      Help Center
                    </Link>
                    <hr className="my-2 border-gray-300" />
                    <Link
                      //   onClick={logout}
                      className="flex gap-1 text-primary hover:font-semibold duration-100 text-sm"
                    >
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
                          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                        />
                      </svg>
                      Sign Out
                    </Link>
                  </Link>
                )}
              </div>
            </div>
          )}
        </header>
      )}
    </>
  );
}
