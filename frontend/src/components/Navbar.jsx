import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

const Navbar = () => {
  const { user, logout } = useContext(UserContext);

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src="crms.png" alt="logo" className="h-6 w-6 mr-2" />
          <Link to="/">
            <span className="text-lg font-bold">CRMS</span>
          </Link>
        </div>

        <div className="flex space-x-6 text-gray-700">
          <Link to="/projects">
            <span className="hover:underline">Projects</span>
          </Link>
          <Link to="/api">
            <span className="hover:underline">APIs & Services</span>
          </Link>
          <Link to="/billing">
            <span className="hover:underline">Billing</span>
          </Link>
          <Link to="/marketplace">
            <span className="hover:underline">Marketplace</span>
          </Link>
        </div>

        <div>
          {user ? (
            <>
              <span className="mr-4">Hello, {user.username}</span>
              <button
                onClick={logout}
                className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/signin"
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
