import React from "react";
import TransactionItem from "./TransactionItem";

function TransactionList({ transactions, onModifySuccess }) {
  return (
    <div
      className="px-12 flex flex-col overflow-y-scroll"
      style={{ height: 600 }}
    >
      <div>
        {transactions.map((transaction, index) => (
          <TransactionItem
            transaction={transaction}
            index={index}
            onModifySuccess={onModifySuccess}
            key={transaction.id}
          />
        ))}
      </div>

      {transactions.length > 12 && (
        <div className="flex justify-center mt-4">
          <button className="rounded-full bg-gray-200 border-2 border-gray-300 px-6 hover:bg-gray-300">
            See more
          </button>
        </div>
      )}
    </div>
  );
}

export default TransactionList;
