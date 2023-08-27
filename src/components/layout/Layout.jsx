import React from "react";
import Sidebar from "./Sidebar";
import Cookies from "js-cookie";
import { Outlet, useNavigate } from "react-router";
import AuthService from "../../services/auth";

function Layout() {
  console.log(Cookies.get("user"));
  const navigate = useNavigate();

  const handleLogout = async () => {
    Cookies.remove("token");
    Cookies.remove("user");

    await AuthService.logout();

    navigate("/login");
  };

  return (
    <div className="bg-gray-100 flex">
      <Sidebar onLogout={handleLogout} />
      <div className="grow min-h-screen h-fit">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
