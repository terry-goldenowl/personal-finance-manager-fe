import React, { useEffect, useState } from "react";
import ModalWithNothing from "../../../components/modal/ModalWithNothing";
import WalletsService from "../../../services/wallets";

function Wallets({ onClose }) {
  const [wallets, setWallets] = useState([]);
  const getWallets = async () => {
    const responseData = await WalletsService.getWallets();

    setWallets(responseData.data.wallets);
  };

  useEffect(() => {
    getWallets();
  }, []);

  return (
    <ModalWithNothing onClose={onClose}>
      <div className="flex items-start justify-center p-5 border-b border-solid border-slate-200 rounded-t max-h-screen">
        <h3 className="text-2xl text-center">Your wallets</h3>
      </div>
      <div className="relative px-6 py-4 flex-auto">
        <div>
          {wallets.map((wallet) => (
            <div>{wallet.name}</div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-end px-6 py-4 border-t border-solid border-slate-200 rounded-b">
        <button
          className="text-gray-500 background-transparent font-bold uppercase py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={onClose}
        >
          Cancle
        </button>
      </div>
    </ModalWithNothing>
  );
}

export default Wallets;
