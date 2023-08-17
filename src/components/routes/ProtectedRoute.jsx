import Cookies from "js-cookie";
import React from "react";
import { Navigate, Outlet } from "react-router";

function ProtectedRoute() {
  // Check if token exists in cookies
  if (!Cookies.get("token")) {
    return <Navigate to={"/login"} />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
