import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const SignIn = () => {
  const [username, setUsername] = useState(""); // This will be the email
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const handleSignIn = async (e) => {
    e.preventDefault();
  
    console.log("Attempting to sign in with:", { email: username, password }); // Log the sent data
  
    try {
      const response = await fetch("http://localhost:5000/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: username, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("Sign-in successful:", data);
        history.push("/dashboard"); // Redirect on success
      } else {
        setError(data.msg || "An error occurred during sign-in.");
      }
    } catch (err) {
      console.error("Sign-in error:", err);
      setError("An unexpected error occurred.");
    }
  };
  

  return (
    <div className="bg-gray-200 p-8 rounded-[38px] shadow-lg w-full max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back !</h2>
      <form onSubmit={handleSignIn}>
        <div className="mb-4">
          <label className="block text-sm mb-2" htmlFor="username">
            Username (Email)
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter your email"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Capture email
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Capture password
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Log in
        </button>
        <div className="mt-4 text-center">
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Forgot Password?
          </a>
        </div>
        <div className="mt-4 text-center">
          <Link
            to="/signup"
            className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200"
          >
            Create an account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
