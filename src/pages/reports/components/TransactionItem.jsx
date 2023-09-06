import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import formatCurrency from "../../../utils/currencyFormatter";
import { format } from "date-fns";
import { shorten } from "../../../utils/stringFormatter";
import TransactionsService from "../../../services/transactions";

function TransactionItem({ item, index, day, month, year, wallet }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [transactions, setTransactions] = useState(null);
  const [loading, setLoading] = useState(false);

  const getTransactions = async () => {
    setLoading(true);

    let params = {
      month,
      year,
      wallet,
      day,
    };

    if (day) params = { ...params, day };

    const responseData = await TransactionsService.getTransactions(params);
    setLoading(false);

    if (responseData.status === "success") {
      setTransactions(responseData.data.transactions);
    }
  };

  useEffect(() => {
    if (showDropdown && !transactions) {
      getTransactions();
    }
  }, [showDropdown]);

  return (
    <div>
      <div
        key={Math.random()}
        className={`flex gap-3 p-3 items-center rounded-lg hover:bg-purple-200 cursor-pointer ${
          index % 2 === 0 ? "bg-gray-200" : ""
        }`}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        {day && (
          <p className="text-md me-10 w-1/3">
            {day + "/" + month + "/" + year}
          </p>
        )}
        {!day && <p className="text-md me-10 w-1/3">{month + "/" + year}</p>}

        <p className="w-1/3 text-lg font-bold text-red-500">
          {"-" + formatCurrency(item.expenses)}
        </p>
        <p className="w-1/3 text-lg font-bold text-green-500">
          {"+" + formatCurrency(item.incomes)}
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
      {showDropdown && (
        <div>
          {loading && <p className="text-center py-1">Loading...</p>}
          {!loading &&
            transactions &&
            transactions.map((transaction) => (
              <div className="flex my-1 mx-6 gap-3 border-b border-b-purple-300">
                <p className="w-1/5">
                  {format(new Date(transaction.date), "dd/MM/yyyy")}
                </p>
                <p className="grow">{shorten(transaction.title, 50)}</p>
                <p
                  className={
                    "w-1/5 text-end " +
                    (transaction.category.type === "expenses"
                      ? "text-red-500"
                      : "text-green-500")
                  }
                >
                  {transaction.category.type === "expenses" ? "-" : "+"}
                  {formatCurrency(transaction.amount)}
                </p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default TransactionItem;
