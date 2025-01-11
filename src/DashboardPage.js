// src/DashboardPage.js
import React from "react";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user from localStorage
    navigate("/login"); // Redirect to login page
  };

  return (
    <div>
      <h2>Welcome to the Dashboard!</h2>
      <button onClick={handleLogout} style={{ padding: "10px", backgroundColor: "red", color: "white" }}>
        Logout
      </button>
    </div>
  );
};

export default DashboardPage;
