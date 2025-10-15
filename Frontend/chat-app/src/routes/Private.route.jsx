import React, { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { Outlet, useNavigate } from "react-router-dom";

export const PrivateRoute = () => {
  const { user, loading } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);
  if (loading) {
    return <div>Loading...</div>; // or a spinner
  }

  return user ? <Outlet /> : null;
};
