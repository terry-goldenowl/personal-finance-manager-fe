import React from "react";
import Sidebar from "./Sidebar";
import Cookies from "js-cookie";
import { Outlet, useNavigate } from "react-router";
import AuthService from "../../services/auth";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import AddWallet from "../../pages/wallets/components/AddWallets";
import { walletActions } from "../../stores/wallets";
import { authActions } from "../../stores/auth";

function Layout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { haveDefaultWallet, loadingWallets } = useSelector(
    (state) => state.wallet
  );

  const handleLogout = async () => {
    try {
      await AuthService.logout();

      dispatch(authActions.logout());
      dispatch(walletActions.resetWallets());

      navigate("/login");
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col lg:flex-row sm:flex-col">
      <Sidebar onLogout={handleLogout} />
      {!loadingWallets && haveDefaultWallet && (
        <div className="grow min-h-screen h-fit">
          <Outlet />
        </div>
      )}
      {!loadingWallets && !haveDefaultWallet && <AddWallet isNew />}
    </div>
  );
}

export default Layout;
