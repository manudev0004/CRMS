import React, { useState } from "react";

const Signup = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    jobTitle: "",
    companyName: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  // State for error or success messages
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!formData.termsAccepted) {
      setError("You must agree to the terms of service");
      return;
    }


    setError("");

    try {

      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Signup successful! You can now log in.");
        setFormData({
          email: "",
          username: "",
          jobTitle: "",
          companyName: "",
          password: "",
          confirmPassword: "",
          termsAccepted: false,
        });
      } else {
        setError(data.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white-800">
      <div className="bg-gray-200 p-8 rounded-[32px] shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Start your free trial
        </h2>
        <p className="text-sm text-center mb-6">
          30 days of free access to all features. No credit card required.
        </p>
        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
        {success && <p className="text-green-600 mb-4 text-center">{success}</p>}
        <form onSubmit={handleSubmit}>
          {/* Email input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          {/* Full Name input */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          {/* Job Title input */}
          <div className="mb-4">
            <label
              htmlFor="jobTitle"
              className="block text-sm font-medium text-gray-700"
            >
              Job Title
            </label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          {/* Company Name input */}
          <div className="mb-4">
            <label
              htmlFor="companyName"
              className="block text-sm font-medium text-gray-700"
            >
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          {/* Password input */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          {/* Confirm Password input */}
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          {/* Terms of service checkbox */}
          <div className="mb-6 flex items-center">
            <input
              type="checkbox"
              id="terms"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              required
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
              I agree to the terms of service and privacy policy.
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Start my free trial
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
