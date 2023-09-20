import React from "react";
import Sidebar from "./Sidebar";
import Cookies from "js-cookie";
import { Outlet, useNavigate } from "react-router";
import AuthService from "../../services/auth";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import AddWallet from "../../pages/wallets/components/AddWallets";

function Layout() {
  const navigate = useNavigate();

  const { haveDefaultWallet, loadingWallets } = useSelector(
    (state) => state.wallet
  );

  const handleLogout = async () => {
    Cookies.remove("token");
    Cookies.remove("user");

    await AuthService.logout();

    navigate("/login");
  };

  return (
    <div className="bg-gray-100 flex">
      <Sidebar onLogout={handleLogout} />
      {!loadingWallets && haveDefaultWallet && (
        <div className="grow min-h-screen h-fit">
          <Outlet />
        </div>
      )}
      {!loadingWallets && !haveDefaultWallet && <AddWallet isNew />}
      <ToastContainer position="top-center" autoClose="4000" />
    </div>
  );
}

export default Layout;
