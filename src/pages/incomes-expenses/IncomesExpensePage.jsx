import React, { useEffect, useState } from "react";
import TransactionsService from "../../services/transactions";
import ReportsService from "../../services/reports";
import AddTransaction from "./components/AddTransaction";
import Report from "./components/Report";
import RecentTransactions from "./components/RecentTransactions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SelectWallet from "../wallets/components/SelectWallet";
import { useSelector } from "react-redux";

function IncomesExpensePage() {
  const [transactions, setTransactions] = useState([]);
  const [report, setReport] = useState({ incomes: 0, expenses: 0 });
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [search, setSearch] = useState("");
  const [isAddingTx, setIsAddingTx] = useState(false);
  const [typeAddTx, setTypeAddTx] = useState("expense");
  const [loading, setLoading] = useState(false);
  const [day, setDay] = useState(null);

  const walletChosen = useSelector((state) => state.wallet.walletChosen);

  const increaseMonth = () => {
    if (year >= new Date().getFullYear() && month > new Date().getMonth()) {
      return;
    }

    if (month === 12) {
      setMonth(1);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const decreaseMonth = () => {
    if (month === 1) {
      setMonth(12);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const handleSearchChange = (event) => {
    setTimeout(() => setSearch(event.target.value), 300);
  };

  const handleDateChange = (_day) => {
    setDay(_day);
  };

  const getTransactions = async () => {
    setLoading(true);

    let params = {
      month,
      year,
      wallet: walletChosen?.id,
    };

    if (day) {
      params = { ...params, day };
    }

    if (search.length > 0) {
      params = { ...params, search };
    }

    const responseData = await TransactionsService.getTransactions(params);
    setLoading(false);

    setTransactions(responseData.data.transactions);
  };

  const getReport = async () => {
    // Return a list of expenses and incomes of months
    const responseData = await ReportsService.getReports({
      year,
      wallet: walletChosen?.id,
    });
    setReport(responseData.data.reports[month + ""]);
  };

  const handleClickAddTx = (type) => {
    setIsAddingTx(true);
    setTypeAddTx(type);
  };

  const handleModifySuccess = (action) => {
    getTransactions();
    getReport();

    toast.success("Transaction is " + action + "d successfully", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 4000,
    });
  };

  useEffect(() => {
    getTransactions();
    getReport();
  }, [month, year, walletChosen]);

  useEffect(() => {
    getTransactions();
  }, [search, day]);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex justify-between">
        <div className="flex gap-4 items-center">
          <h2 className="text-4xl">Incomes & Expenses</h2>
          <SelectWallet />
        </div>
        <div
          className="flex border-2 border-purple-500 rounded-2xl relative"
          id="add-transactions-container"
        >
          {/* <div
            className="absolute h-full w-1/2 rounded-xl bg-purple-500"
            id="hovering-block"
          ></div> */}
          <button
            className="py-2 text-center rounded-xl font-semibold bg-purple-500 text-white px-8 hover:bg-purple-600"
            id="add-expense-btn"
            onClick={() => handleClickAddTx("expenses")}
          >
            Add expense
          </button>
          <button
            className="py-2 px-8 rounded-xl font-semibold text-purple-600"
            id="add-income-btn"
            onClick={() => handleClickAddTx("incomes")}
          >
            Add incomes
          </button>
        </div>
      </div>

      <div className="flex gap-8">
        <Report
          month={month}
          year={year}
          increaseMonth={increaseMonth}
          decreaseMonth={decreaseMonth}
          report={report}
        />

        <RecentTransactions
          transactions={transactions}
          onModifySuccess={handleModifySuccess}
          onSearch={handleSearchChange}
          loading={loading}
          onDateChange={handleDateChange}
        />
      </div>

      {isAddingTx && (
        <AddTransaction
          isAdding={isAddingTx}
          setIsAdding={setIsAddingTx}
          type={typeAddTx}
          onAddingSuccess={handleModifySuccess}
        />
      )}
    </div>
  );
}

export default IncomesExpensePage;
