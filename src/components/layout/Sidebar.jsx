import React, { useState } from "react";
import SidebarItem from "./SidebarItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import categories from "../../assets/images/categories.png";
import plan from "../../assets/images/money-bag.png";
import report from "../../assets/images/seo-report.png";
import expenses from "../../assets/images/spending.png";
import avatar from "../../assets/images/profile.png";
import AccountPopup from "./AccountPopup";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import Wallets from "../../pages/wallets/components/Wallets";

function Sidebar({ onLogout }) {
  const [isAccountPopupShown, setIsAccountPopupShown] = useState(false);
  const [isWalletsShown, setIsWalletsShown] = useState(false);

  const handleClickWallets = () => {
    setIsAccountPopupShown(false);
    setIsWalletsShown(true);
  };

  return (
    <div className="sidebar bg-white w-40 px-5 py-5 shadow-lg flex flex-col items-center rounded-tr-3xl rounded-br-3xl h-fit sticky top-0 left-0">
      <div className="mb-6 flex flex-col items-center relative">
        <div className="absolute top-0 right-0">
          <button
            className="bg-gray-100 w-6 h-6 rounded-full flex justify-center items-center hover:bg-gray-200"
            onClick={() => setIsAccountPopupShown(!isAccountPopupShown)}
          >
            <FontAwesomeIcon icon={faEllipsis} />
          </button>
          {isAccountPopupShown && (
            <AccountPopup
              setIsShown={setIsAccountPopupShown}
              onLogout={onLogout}
              onClickWallets={handleClickWallets}
            />
          )}
        </div>

        <div className="rounded-full w-16 h-16 overflow-hidden">
          <img src={avatar} alt="" className="w-full h-full" />
        </div>
        <a href="#">
          <div className="py-0 px-3 bg-yellow-500 -mt-1 text-ellipsis text-white font-bold text-center rounded-sm">
            {JSON.parse(Cookies.get("user")).name}
          </div>
        </a>
      </div>
      <ul className="flex flex-col gap-3">
        <Link to={"/transactions"}>
          <SidebarItem
            name={"Expenses & Incomes"}
            image={expenses}
            link={"#"}
          />
        </Link>
        <Link to={"/plans"}>
          <SidebarItem name={"Plans"} image={plan} link={"#"} />
        </Link>
        <Link to={"/reports"}>
          <SidebarItem name={"Reports"} image={report} link={"#"} />
        </Link>
        <Link to={"/categories"}>
          <SidebarItem name={"Categories"} image={categories} link={"#"} />
        </Link>
      </ul>

      <div className="flex gap-2 items-center mt-4">
        <FontAwesomeIcon icon={faCircleInfo} />
        <a href="#" className="text-sm hover:font-semibold">
          Help?
        </a>
      </div>

      {isWalletsShown && <Wallets onClose={() => setIsWalletsShown(false)} />}
    </div>
  );
}

export default Sidebar;
