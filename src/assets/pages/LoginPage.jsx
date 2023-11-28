import axios from "axios";
import { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(e) {
    e.preventDefault();

    try {
      const { data } = await axios.post("/login", {
        email,
        password,
      });

      setUser(data);
      alert("Login Successful");
      setRedirect(true);
    } catch (e) {
      alert("Login Failed. Please try again");
    }
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="tex-4xl text-center mb-4">
          <strong>Login</strong>
        </h1>
        <form className="max-w-sm mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="text"
            placeholder="Your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="font-medium">
            LOGIN
          </button>
          <div className="text-center mt-2 py-2 text-gray-500">
            Do have an account yet?{" "}
            <Link className="underline text-black" to="/register">
              <strong>Register</strong>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
