import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser(e) {
    e.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      alert("Registration Successful. Now you can log in");
    } catch (e) {
      alert("Registration Failed. Please try again");
    }
  }

  //  YGclDuHYmWVU1MN7

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="tex-4xl text-center mb-4">
          <b>Register</b>
          <p className="text-gray-300 font-light">
            Nice to meet you! Enter your details to register.
          </p>
        </h1>
        <form className="max-w-sm mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="**********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="font-medium">
            SIGN UP
          </button>
          <div className="text-center mt-2 py-2 text-gray-500">
            Already have an account?{" "}
            <Link className="underline text-black" to="/login">
              <strong>Login</strong>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
