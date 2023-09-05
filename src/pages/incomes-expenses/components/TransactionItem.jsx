import React, { useState } from "react";
import formatCurrency from "../../../utils/currencyFormatter";
import { shorten } from "../../../utils/stringFormatter";
import AddTransaction from "./AddTransaction";
import ConfirmDeleteModal from "../../../components/modal/ConfirmDeleteModal";
import TransactionsService from "../../../services/transactions";
import { toast } from "react-toastify";

function TransactionItem({ transaction, index, onModifySuccess }) {
  const [isViewingDetail, setIsViewingDetail] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteTransaction = async () => {
    const data = await TransactionsService.deleteTransaction(transaction.id);
    console.log(data);

    if (data.status === "success") {
      setIsDeleting(false);
      setIsViewingDetail(false);
      onModifySuccess('delete');
    }
  };

  return (
    <>
      <div
        className={
          "flex gap-3 p-2 pe-6 items-center rounded-lg hover:bg-purple-200 cursor-pointer " +
          (index % 2 === 0 ? "bg-gray-200" : "")
        }
        onClick={() => setIsViewingDetail(true)}
      >
        <div className="w-16 h-16 overflow-hidden rounded-md shadow-sm">
          <img
            src={process.env.REACT_APP_API_HOST + transaction.category.image}
            alt=""
            className="object-cover w-full h-full"
          />
        </div>

        <div className="grow">
          <p className="text-md font-semibold">{transaction.title}</p>
          <p className="text-sm text-gray-500">
            {shorten(transaction.description, 50)}
          </p>
        </div>

        <div className="flex flex-col justify-center">
          <p
            className={
              "text-lg text-end font-semibold " +
              (transaction.category.type === "incomes"
                ? "text-green-600"
                : "text-orange-600")
            }
          >
            {(transaction.category.type === "incomes" ? "+" : "-") +
              formatCurrency(transaction.amount)}
          </p>
          <p className="text-sm text-end">{transaction.date}</p>
        </div>
      </div>

      {isViewingDetail && (
        <AddTransaction
          setIsAdding={setIsViewingDetail}
          transaction={transaction}
          type={transaction.type}
          isDeleting={isDeleting}
          setIsDeleting={setIsDeleting}
          onAddingSuccess={onModifySuccess}
        />
      )}

      {/* CONFIRM DELETION */}
      {isDeleting && (
        <ConfirmDeleteModal
          onAccept={handleDeleteTransaction}
          onClose={() => {
            setIsDeleting(false);
          }}
          message={
            "Are you sure to delete this transaction? This action can not be undone!"
          }
        />
      )}
    </>
  );
}

export default TransactionItem;
