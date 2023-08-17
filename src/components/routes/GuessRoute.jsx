import Cookies from "js-cookie";
import React from "react";
import { Navigate, Outlet } from "react-router";

function GuessRoute() {
  // Check if token exists in cookies
  if (Cookies.get("token")) {
    return <Navigate to={"/"} />;
  }

  return <Outlet />;
}

export default GuessRoute;
