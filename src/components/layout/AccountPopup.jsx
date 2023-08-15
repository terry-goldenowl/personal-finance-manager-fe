import React from "react";
import Popover from "../modal/Popover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faWallet } from "@fortawesome/free-solid-svg-icons";

function AccountPopup({ setIsShown }) {
  return (
    <Popover setIsShown={setIsShown} top={0} left={40}>
      <div className="flex flex-col gap-2">
        <button className="bg-blue-100 py-2 w-52 rounded-md whitespace-nowrap hover:bg-blue-200 hover:font-semibold">
          <FontAwesomeIcon
            icon={faUser}
            className="text-xl me-2 text-blue-400"
          />
          View profile
        </button>
        <button className="bg-blue-100 py-2 w-52 rounded-md whitespace-nowrap hover:bg-blue-200 hover:font-semibold">
          <FontAwesomeIcon
            icon={faWallet}
            className="text-xl me-2 text-blue-400"
          />
          Your wallets
        </button>
        <button className="bg-blue-100 py-2 w-52 rounded-md whitespace-nowrap hover:bg-blue-200 hover:font-semibold uppercase text-red-400">
          Log out
        </button>
      </div>
    </Popover>
  );
}

export default AccountPopup;
