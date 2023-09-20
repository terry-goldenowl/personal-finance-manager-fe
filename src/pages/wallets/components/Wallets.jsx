import React, { useEffect, useState } from "react";
import ModalWithNothing from "../../../components/modal/ModalWithNothing";
import WalletsService from "../../../services/wallets";
import IconButton from "../../../components/elements/IconButton";
import { faEllipsis, faPlus } from "@fortawesome/free-solid-svg-icons";
import AddWallet from "./AddWallets";
import Loading from "../../../components/others/Loading";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Popover } from "@headlessui/react";
import ConfirmDeleteModal from "../../../components/modal/ConfirmDeleteModal";
import WalletItem from "./WalletItem";

function Wallets({ onClose }) {
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const getWallets = async () => {
    setLoading(true);
    const responseData = await WalletsService.getWallets();
    setLoading(false);

    setWallets(responseData.data.wallets);
  };

  useEffect(() => {
    getWallets();
  }, []);

  const handleAddSuccess = (action) => {
    toast.success("Wallet " + action + " successfully!");
    getWallets();
  };

  return (
    <ModalWithNothing onClose={onClose} width={"w-1/4"}>
      <div className="flex items-start justify-center p-5 border-b border-solid border-slate-200 rounded-t max-h-screen">
        <h3 className="text-2xl text-center">Your wallets</h3>
      </div>
      <div className="relative px-6 py-4 flex-auto">
        <div className="mb-3">
          {loading && <Loading />}
          {!loading &&
            wallets.map((wallet) => (
              <WalletItem wallet={wallet} onUpdateSuccess={handleAddSuccess} />
            ))}
        </div>
        <div className="flex justify-end">
          <IconButton
            icon={faPlus}
            bgColor="bg-blue-600"
            textColor="text-white"
            textColorHover="text-white"
            onClick={() => setIsAdding(true)}
          />
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
      {isAdding && (
        <AddWallet
          onClose={() => setIsAdding(false)}
          onAddSuccess={handleAddSuccess}
        />
      )}
    </ModalWithNothing>
  );
}

export default Wallets;
