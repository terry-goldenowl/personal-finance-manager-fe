import React, { useEffect, useState } from "react";
import TransactionList from "./TransactionList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../../components/others/Loading";
import Input from "../../../components/elements/Input";
import { format } from "date-fns";

function RecentTransactions({
  transactions,
  onModifySuccess,
  onSearch,
  loading,
  onDateChange,
}) {
  const [date, setDate] = useState(new Date());
  const [isAll, setIsAll] = useState(true);

  const handleDateChange = (event) => {
    setDate(event.target.value);
    onDateChange(new Date(event.target.value).getDate());
  };

  useEffect(() => {
    if (isAll) {
      onDateChange(null);
    } else {
      setDate(new Date());
      onDateChange(new Date().getDate());
    }
  }, [isAll]);

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
            onChange={onSearch}
          />
          <FontAwesomeIcon icon={faSearch} className="text-gray-400 text-xl" />
        </div>
      </div>
      <div className="flex justify-center items-center mb-3 gap-2">
        <button
          className={
            "py-1 rounded-lg px-5 " +
            (isAll ? "bg-purple-500 text-white font-bold" : "bg-gray-200")
          }
          onClick={() => setIsAll(true)}
        >
          All
        </button>
        <button
          className={
            "py-1 rounded-lg px-3 " +
            (!isAll ? "bg-purple-500 text-white font-bold" : "bg-gray-200")
          }
          onClick={() => setIsAll(false)}
        >
          Custom date
        </button>
        {!isAll && (
          <Input
            type={"date"}
            name={"date"}
            size="small"
            value={format(new Date(date), "yyyy-MM-dd")}
            onChange={handleDateChange}
            mb=""
            required
          />
        )}
      </div>

      {loading && <Loading />}
      {!loading && transactions.length > 0 && (
        <TransactionList
          transactions={transactions}
          onModifySuccess={onModifySuccess}
        />
      )}
      {!loading && transactions.length === 0 && (
        <p className="text-center py-3 text-gray-600">No result!</p>
      )}
    </div>
  );
}

export default RecentTransactions;
