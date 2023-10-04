import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import monthsGetter from "../../utils/monthsGetter";
import ReportsService from "../../services/reports";
import getDaysInMonth from "../../utils/getDaysOfMonth";
import SelectWallet from "../wallets/components/SelectWallet";
import { useSelector } from "react-redux";
import Transactions from "./components/Transactions";
import Charts from "./components/Charts";
import Loading from "../../components/others/Loading";
import Select from "../../components/elements/Select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-regular-svg-icons";
import { motion } from "framer-motion";
import TransactionsService from "../../services/transactions";
import { toast } from "react-toastify";

function ReportsPage() {
  const location = useLocation();

  const [month, setMonth] = useState(
    monthsGetter().find(
      (month) =>
        month.id ===
        ((location.state && location.state.month - 1) || new Date().getMonth())
    )
  );

  const [transactionType, setTransactionType] = useState("total");
  const [reportType, setReportType] = useState("expenses-incomes");
  const [period, setPeriod] = useState("month");
  const [reports, setReports] = useState();
  const [filledReports, setFilledReports] = useState([]);
  const [chartLabels, setChartLabels] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(null);
  const walletChosen = useSelector((state) => state.wallet.walletChosen);
  const [years, setYears] = useState([]);
  const [year, setYear] = useState();
  const [loadingYears, setLoadingYears] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const getYearsBetween = async () => {
    try {
      setLoadingYears(true);
      const responseData = await TransactionsService.getTransactionsYears({
        wallet_id: walletChosen?.id,
      });

      if (responseData.status === "success") {
        const yearsBetween = responseData.data.years.map((y) => {
          return { id: y, name: y };
        });

        setYears(yearsBetween);

        const currentYear = yearsBetween.find(
          (y) => y.id === new Date().getFullYear()
        );

        setYear(currentYear || yearsBetween[0]);
      }
    } catch (e) {
      toast.error(e.response.data.message);
    }
    setLoadingYears(false);
  };

  const getReports = async (params) => {
    try {
      setLoading(true);
      const responseData = await ReportsService.getReports(params);

      if (responseData.status === "success") {
        setReports(responseData.data.reports);
      }
    } catch (e) {
      toast.error(e.response.data.message);
    }
    setLoading(false);
  };

  const fillReports = (labels) => {
    if (filledReports) {
      const names = Object.keys(reports);

      labels.forEach((label) => {
        if (!names.includes(label + "")) {
          setFilledReports((prev) => {
            return { ...prev, [label + ""]: { expenses: 0, incomes: 0 } };
          });
        }
      });
    }
  };

  const periodStyle = (_period) => {
    return (
      "grow py-2 text-center rounded-xl font-semibold " +
      (period === _period
        ? "bg-purple-500 text-white"
        : "bg-transparent text-purple-500 hover:bg-purple-200")
    );
  };

  const transactionTypeStyle = (_transactionType) => {
    return (
      "grow py-1 text-center rounded-xl font-semibold " +
      (transactionType === _transactionType
        ? "bg-purple-500 text-white"
        : "bg-purple-100 text-purple-500 hover:bg-purple-200")
    );
  };

  const reportTypeStyle = (_reportType) => {
    return (
      "py-3 px-6 border-b-4 " +
      (reportType === _reportType
        ? "border-b-purple-500 text-purple-600 font-semibold"
        : "border-b-purple-200 hover:font-semibold")
    );
  };

  const handleExportExcel = async () => {
    try {
      setIsExporting(true);
      const response = await ReportsService.saveExport({
        month: month.id + 1,
        year: year.id,
      });

      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "transactions.xlsx";
      link.click();

      window.URL.revokeObjectURL(url);
    } catch (e) {
      toast.error("Something went wrong when export excel!");
    }
    setIsExporting(false);
  };

  useEffect(() => {
    setLoading(true);
    if (walletChosen && year) {
      let params = {
        year: year?.id,
        transaction_type: transactionType,
        report_type: reportType,
        wallet: walletChosen.id,
      };

      if (period === "month") {
        params = { ...params, month: month.id + 1 };
      }
      getReports(params);
    }

    if (reportType === "expenses-incomes") {
      if (period === "month") {
        setChartLabels(getDaysInMonth(year?.id, month.id + 1));
      } else {
        setChartLabels([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
      }
    }
  }, [transactionType, reportType, period, month, year, walletChosen]);

  useEffect(() => {
    setLoadingYears(true);
    if (walletChosen) {
      getYearsBetween();
    }
  }, [walletChosen]);

  useEffect(() => {
    if (reports) {
      setFilledReports(reports);
      if (reportType === "expenses-incomes") {
        fillReports(chartLabels);
      }
    }
  }, [reports, chartLabels]);

  useEffect(() => {
    if (reportType === "expenses-incomes") {
      const expensesDataset = {
        label: "Total expenses",
        data:
          filledReports &&
          Object.values(filledReports).map((report) =>
            period === "year" && transactionType === "total"
              ? report.expenses * -1
              : report.expenses
          ),
        borderRadius: 10,
        backgroundColor: "#EA580Baa",

        //   barThickness: 30,
      };

      const incomesDataset = {
        label: "Total incomes",
        data:
          filledReports &&
          Object.values(filledReports).map((report) => report.incomes),
        borderRadius: 10,
        backgroundColor: "#16A34Aaa",
        //   barThickness: 30,
      };

      if (transactionType === "total") {
        setDatasets([incomesDataset, expensesDataset]);
      }

      if (transactionType === "incomes") {
        setDatasets([incomesDataset]);
      }
      if (transactionType === "expenses") {
        setDatasets([expensesDataset]);
      }
    } else {
      setDatasets([
        {
          data: Object.values(filledReports).map((report) => report.amount),
        },
      ]);

      setTotalAmount(
        Object.values(filledReports).reduce(
          (prev, curr) => prev + curr.amount,
          0
        )
      );
    }
  }, [transactionType, filledReports]);

  return (
    <div className="lg:p-8 sm:p-14 p-3">
      {/* Header */}
      <div className="flex gap-4 items-center justify-between mb-4">
        <h2 className="sm:text-4xl text-3xl">Reports</h2>
        <div className="w-40">
          <SelectWallet />
        </div>
      </div>

      {/* Content */}
      <div className="flex gap-8 lg:flex-row flex-col">
        <div className="lg:w-1/2 xl:w-7/12 w-full sm:p-4 p-2 rounded-2xl bg-white">
          <div className="mb-3">
            <div className="flex justify-end gap-3">
              {period === "month" && (
                <div className="lg:w-1/6 sm:w-1/3 w-1/2">
                  <Select
                    selected={month}
                    setSelected={setMonth}
                    data={monthsGetter()}
                  />
                </div>
              )}
              <div className="lg:w-1/6 sm:w-1/3 w-1/2">
                <Select
                  selected={year}
                  setSelected={setYear}
                  data={years}
                  loading={loadingYears}
                />
              </div>
            </div>
          </div>

          {loading && <Loading />}

          <Charts
            {...{
              loading,
              reportType,
              chartLabels,
              datasets,
              filledReports,
              period,
            }}
          />

          <div>
            <div className="flex gap-2 mb-2 p-2 rounded-xl bg-purple-100">
              <button
                onClick={() => setPeriod("month")}
                className={periodStyle("month")}
              >
                Month
              </button>
              <button
                onClick={() => setPeriod("year")}
                className={periodStyle("year")}
              >
                Year
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setTransactionType("total")}
                className={transactionTypeStyle("total")}
              >
                Total
              </button>
              <button
                onClick={() => setTransactionType("incomes")}
                className={transactionTypeStyle("incomes")}
              >
                Incomes
              </button>
              <button
                onClick={() => setTransactionType("expenses")}
                className={transactionTypeStyle("expenses")}
              >
                Expenses
              </button>
            </div>
          </div>
        </div>

        <div className="xl:w-5/12 lg:w-1/2 w-full">
          <div className="flex border-b border-b-purple-200 items-center lg:justify-start justify-center">
            <button
              className={reportTypeStyle("expenses-incomes")}
              onClick={() => setReportType("expenses-incomes")}
            >
              {period === "month" ? "By days" : "By months"}
            </button>
            <button
              className={reportTypeStyle("categories")}
              onClick={() => setReportType("categories")}
            >
              By categories
            </button>
          </div>
          <Transactions
            {...{
              month,
              year,
              reports,
              period,
              loading,
              totalAmount,
              reportType,
            }}
          />
          {month && year && walletChosen && (
            <motion.button
              className={
                "bg-green-600 text-white hover:bg-green-700 py-2 px-8 rounded-lg shadow-xl lg:fixed static w-full lg:w-fit flex justify-center lg:bottom-4 lg:right-4 xl:bottom-10 xl:right-10 gap-1 items-center mt-6 lg:mt-0 " +
                ((!reports || (reports && reports.length === 0)) &&
                  "disabled:opacity-90")
              }
              onClick={handleExportExcel}
              disabled={!reports || (reports && reports.length === 0)}
            >
              <FontAwesomeIcon icon={faFileExcel} />{" "}
              <p>{isExporting ? "Exporting..." : "Export as excel"}</p>
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReportsPage;
