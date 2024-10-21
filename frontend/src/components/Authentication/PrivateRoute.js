import React from "react";
import { Navigate } from "react-router-dom";

// A wrapper for private routes
const PrivateRoute = ({ children }) => {
  // Check if the user is authenticated (e.g., by checking localStorage)
  const storedUser = localStorage.getItem("User_Data");

  // If no user data found, redirect to login page
  if (!storedUser) {
    return <Navigate to="/" />;
  }

  // If the user is authenticated, render the children (dashboard or other protected pages)
  return children;
};

export default PrivateRoute;
