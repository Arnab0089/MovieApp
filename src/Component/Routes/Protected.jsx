import React from "react";
import { useAuth } from "../../context/useAuth";
import { Navigate } from "react-router-dom";

export default function Protected({ children }) {
  const { user } = useAuth();
  return <>{user ? children : <Navigate to="/" />}</>;
}
