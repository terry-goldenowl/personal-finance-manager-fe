import React from "react";
import Sidebar from "./Sidebar";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

function Layout() {
  console.log(Cookies.get("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");

    navigate("/login");
  };

  return (
    <div className="bg-gray-100 h-screen">
      <Sidebar onLogout={handleLogout} />
    </div>
  );
}

export default Layout;
