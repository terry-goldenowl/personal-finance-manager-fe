import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import formatCurrency from "../../../utils/currencyFormatter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CategoryItem({ item, index }) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div>
      <div
        key={Math.random()}
        className={`flex gap-3 p-2 items-center rounded-lg hover:bg-purple-200 cursor-pointer ${
          index % 2 === 0 ? "bg-gray-200" : ""
        }`}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <div className="w-14 h-14 flex justify-center items-center overflow-hidden rounded-md">
          <img src={item.image} alt="" className="shrink-0 h-" />
        </div>
        <p className="w-1/3">{item.name}</p>
        <p className="font-semibold text-purple-600 w-1/6">
          {item.percentage + "%"}
        </p>
        <p
          className={`font-semibold ${
            item.type === "incomes" ? "text-green-600" : "text-red-600"
          } w-1/5`}
        >
          {`${item.type === "incomes" ? "+" : "-"}  ${formatCurrency(
            item.amount
          )}`}
        </p>
        <div className="grow flex justify-end pe-4">
          <FontAwesomeIcon
            icon={faChevronRight}
            className={`text-gray-500 ${
              showDropdown ? "rotate-90" : "rotate-0"
            }`}
          />
        </div>
      </div>
      {/* Show dropdown menu - expenses of categories*/}
      <div></div>
    </div>
  );
}

export default CategoryItem;
