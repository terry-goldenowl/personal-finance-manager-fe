import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWallets, walletActions } from "../../../stores/wallets";
import SelectWithImage from "../../../components/elements/SelectWithImage";

function SelectWallet() {
  const dispatch = useDispatch();
  const { wallets, walletChosen } = useSelector((state) => state.wallet);

  return (
    <SelectWithImage
      data={wallets}
      selected={walletChosen}
      setSelected={(wallet) => dispatch(walletActions.setWalletChosen(wallet))}
    />
  );
}

export default SelectWallet;
