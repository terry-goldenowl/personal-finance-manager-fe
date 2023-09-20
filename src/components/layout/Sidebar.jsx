import React, { useMemo, useState } from "react";
import SidebarItem from "./SidebarItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import categories from "../../assets/images/categories.png";
import plan from "../../assets/images/money-bag.png";
import report from "../../assets/images/seo-report.png";
import expenses from "../../assets/images/spending.png";
import avatar from "../../assets/images/profile.png";
import users from "../../assets/images/teamwork.png";
import AccountPopup from "./AccountPopup";
import { Link, NavLink } from "react-router-dom";
import Wallets from "../../pages/wallets/components/Wallets";
import Profile from "../../pages/profile/components/Profile";
import { useSelector } from "react-redux";
import "../../styles/sidebar.css";

function Sidebar({ onLogout }) {
  const [isAccountPopupShown, setIsAccountPopupShown] = useState(false);
  const [isWalletsShown, setIsWalletsShown] = useState(false);
  const [isProfileShown, setIsProfileShown] = useState(false);

  const { user, roles } = useSelector((state) => state.auth);

  const sidebarItems = useMemo(() => {
    if (roles.includes("user")) {
      return [
        {
          id: 1,
          name: "Transactions",
          image: expenses,
          link: "/transactions",
        },
        {
          id: 2,
          name: "Plans",
          image: plan,
          link: "/plans",
        },
        {
          id: 3,
          name: "Reports",
          image: report,
          link: "/reports",
        },
        {
          id: 4,
          name: "Categories",
          image: categories,
          link: "/categories",
        },
      ];
    } else {
      return [
        {
          id: 5,
          name: "Dashboard",
          image: expenses,
          link: "/admin",
        },
        {
          id: 6,
          name: "Users",
          image: users,
          link: "/admin/users",
        },
        {
          id: 7,
          name: "Default categories",
          image: categories,
          link: "/admin/categories",
        },
      ];
    }
  }, [user]);

  const handleClickWallets = () => {
    setIsAccountPopupShown(false);
    setIsWalletsShown(true);
  };

  const handleClickProfile = () => {
    setIsAccountPopupShown(false);
    setIsProfileShown(true);
  };

  return (
    <div className="sidebar w-screen bg-white lg:w-40 px-5 py-5 shadow-lg flex lg:flex-col flex-row sm:justify-center justify-start gap-5 items-center lg:rounded-br-3xl h-fit sticky top-0 left-0 z-30 bg-opacity-90">
      <div className="lg:mb-6 mb-0 flex flex-col items-center relative">
        <div className="absolute top-0 right-0">
          <AccountPopup
            setIsShown={setIsAccountPopupShown}
            onLogout={onLogout}
            onClickWallets={handleClickWallets}
            onClickProfile={handleClickProfile}
          />
        </div>

        <div className="rounded-full lg:w-16 lg:h-16 w-12 h-12 overflow-hidden">
          <img
            src={
              user.photo ? process.env.REACT_APP_API_HOST + user.photo : avatar
            }
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
        {/* <a href="#">
          <div className="py-0 px-3 bg-blue-500 -mt-1 text-ellipsis text-white font-bold text-center rounded-xl">
            {user.name}
          </div>
        </a> */}
      </div>
      <ul
        className="flex lg:flex-col flex-row sm:gap-3 gap-0 overflow-x-scroll"
        id="sidebar"
      >
        {sidebarItems.map((item) => (
          <SidebarItem item={item} key={item.id}/>
        ))}
      </ul>

      <div className="gap-2 items-center mt-4 hidden lg:flex">
        <FontAwesomeIcon icon={faCircleInfo} />
        <a href="#" className="text-sm hover:font-semibold">
          Help?
        </a>
      </div>

      {isWalletsShown && <Wallets onClose={() => setIsWalletsShown(false)} />}
      {isProfileShown && <Profile onClose={() => setIsProfileShown(false)} />}
    </div>
  );
}

export default Sidebar;
