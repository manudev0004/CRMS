import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/reset-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword }),
      });

      const data = await response.json();
      setMessage(data.msg);

      if (response.ok) {
        history.push("/signin"); // Redirect after successful reset
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container mx-auto max-w-md p-8">
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
      <form onSubmit={handleResetPassword}>
        <label className="block mb-2">New Password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded mt-4"
        >
          Reset Password
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
};

export default ResetPassword;
