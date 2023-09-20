import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router";
import WalletsService from "../../services/wallets";
import { walletActions } from "../../stores/wallets";
import { useDispatch } from "react-redux";

function ProtectedRoute() {
  const dispatch = useDispatch();
  // Check if token exists in cookies
  if (!Cookies.get("token")) {
    return <Navigate to={"/login"} />;
  }

  const getWallets = async () => {
    dispatch(walletActions.setLoadingWallet(true));
    const walletResponse = await WalletsService.getWallets();
    dispatch(
      walletActions.setHaveDefaultWallet(walletResponse.data.wallets.length > 0)
    );
    dispatch(walletActions.setLoadingWallet(false));
  };

  getWallets();

  return <Outlet />;
}

export default ProtectedRoute;
