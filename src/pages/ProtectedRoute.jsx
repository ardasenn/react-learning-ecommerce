import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
export const ProtectedRoute = ({ admin, ...rest }) => {
  const { loggedIn, user } = useAuth();

  if (admin && user.role !== "admin") {
    return <Navigate to="/" />;
  }
  return loggedIn ? <Outlet /> : <Navigate to="/signin" />;
};
