import React, { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { Outlet, useNavigate } from "react-router-dom";

export const PublicRoute = () => {
  const { user, loading } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate("/home");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return !user ? <Outlet /> : null;
};
