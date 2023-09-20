import React, { useState } from "react";
import IconButton from "../../../components/elements/IconButton";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { Popover } from "@headlessui/react";
import ConfirmDeleteModal from "../../../components/modal/ConfirmDeleteModal";
import InfoModal from "../../../components/modal/InfoModal";
import WalletsService from "../../../services/wallets";
import { toast } from "react-toastify";
import AddWallet from "./AddWallets";

function WalletItem({ wallet, onUpdateSuccess }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleDelete = async () => {
    const responseData = await WalletsService.deleteWallet(wallet.id);

    if (responseData.status === "success") {
      setIsDeleting(false);
      onUpdateSuccess("delete");
    } else {
      toast.error(responseData.error);
    }
  };

  return (
    <motion.div
      key={wallet.id}
      className="rounded-xl py-2 px-2 bg-blue-500 mb-1 flex gap-3 items-center hover:bg-blue-600"
      whileHover={{
        scale: 1.05,
        rotate: 3 * Math.random() > 0.5 ? 1 : -1,
      }}
    >
      <div className="w-14 h-14 rounded-full flex items-center justify-center overflow-hidden shadow-md bg-white">
        <img
          src={process.env.REACT_APP_API_HOST + wallet.image}
          alt=""
          className="object-contain"
        />
      </div>
      <p className="text-lg text-white grow">{wallet.name}</p>
      <div className="w-1/5 flex justify-end relative">
        <Popover className={"flex justify-center"}>
          <Popover.Button>
            <IconButton icon={faEllipsis} size="small" />
          </Popover.Button>

          <Popover.Panel className="absolute z-10 -top-8 shadow-lg">
            <div className="flex overflow-hidden">
              <button
                className="py-1 px-4 rounded-l-md bg-gray-100 hover:bg-purple-200"
                onClick={() => setIsUpdating(true)}
              >
                Update
              </button>
              <button
                className="py-1 px-4 rounded-r-md bg-gray-100 hover:bg-red-200"
                onClick={() => setIsDeleting(true)}
              >
                Delete
              </button>
            </div>
          </Popover.Panel>
        </Popover>
      </div>

      {isDeleting && wallet.default == false && (
        <ConfirmDeleteModal
          message={
            "Are you sure to delete this wallet? This will also delete ALL TRANSACTIONS and PLANS related to it! "
          }
          onClose={() => setIsDeleting(false)}
          onAccept={handleDelete}
        />
      )}

      {isDeleting && wallet.default == true && (
        <InfoModal
          title="Warning"
          message={
            "You can not delete default wallet! Please change default wallet to another wallet."
          }
          onClose={() => setIsDeleting(false)}
        />
      )}

      {isUpdating && (
        <AddWallet
          onAddSuccess={onUpdateSuccess}
          onClose={() => setIsUpdating(false)}
          wallet={wallet}
        />
      )}
    </motion.div>
  );
}

export default WalletItem;
