import React from "react";
import TransactionList from "./TransactionList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function RecentTransactions({
  transactions,
  handleModifySuccess,
  handleSearch,
}) {
  return (
    <div className="w-7/12">
      <div className="flex border-b border-b-purple-200 justify-between mb-6">
        <button className="py-2 px-6 border-b-4 border-b-purple-500 text-purple-600 font-semibold">
          Recent transactions
        </button>

        <div className="flex items-center bg-white py-2 px-4 ms-6 rounded-xl my-1 gap-2 shadow-sm">
          <input
            type="text"
            name="search"
            className="outline-none w-64"
            onChange={handleSearch}
          />
          <FontAwesomeIcon icon={faSearch} className="text-gray-400 text-xl" />
        </div>
      </div>

      <TransactionList
        transactions={transactions}
        onModifySuccess={handleModifySuccess}
      />
    </div>
  );
}

export default RecentTransactions;
