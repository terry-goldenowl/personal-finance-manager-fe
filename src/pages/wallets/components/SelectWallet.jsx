import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { walletActions } from "../../../stores/wallets";
import SelectWithImage from "../../../components/elements/SelectWithImage";
import WalletsService from "../../../services/wallets";

function SelectWallet() {
  const [wallets, setWallets] = useState([]);
  const dispatch = useDispatch();
  const walletChosen = useSelector((state) => state.wallet.walletChosen);

  const getWallets = async () => {
    const data = await WalletsService.getWallets();
    setWallets(data.data.wallets);

    if (!walletChosen) {
      dispatch(
        walletActions.setWalletChosen(
          data.data.wallets.find((wallet) => wallet.default == 1)
        )
      );
    }
  };

  useEffect(() => {
    getWallets();
  }, []);

  return (
    <SelectWithImage
      data={wallets}
      selected={walletChosen}
      setSelected={(wallet) => dispatch(walletActions.setWalletChosen(wallet))}
    />
  );
}

export default SelectWallet;
