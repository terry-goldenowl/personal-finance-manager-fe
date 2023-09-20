import React, { useEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useLocation } from "react-router-dom";
import CategoryItem from "./components/CategoryItem";
import Select from "../../components/elements/Select";
import yearsGetter from "../../utils/yearsGetter";
import monthsGetter from "../../utils/monthsGetter";
import ReportsService from "../../services/reports";
import getDaysInMonth from "../../utils/getDaysOfMonth";
import TransactionItem from "./components/TransactionItem";
import Loading from "../../components/others/Loading";
import SelectWallet from "../wallets/components/SelectWallet";
import { useSelector } from "react-redux";

function ReportsPage() {
  const location = useLocation();

  const [month, setMonth] = useState(
    monthsGetter().find(
      (month) =>
        month.id ===
        ((location.state && location.state.month - 1) || new Date().getMonth())
    )
  );
  const [year, setYear] = useState(
    yearsGetter(20).find(
      (year) =>
        year.id ===
        ((location.state && location.state.year) || new Date().getFullYear())
    )
  );
  const [wallet, setWallet] = useState();
  const [transactionType, setTransactionType] = useState("total");
  const [reportType, setReportType] = useState("expenses-incomes");
  const [search, setSearch] = useState();
  const [period, setPeriod] = useState("month");
  const [reports, setReports] = useState();
  const [filledReports, setFilledReports] = useState([]);
  const [chartLabels, setChartLabels] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(null);
  const walletChosen = useSelector((state) => state.wallet.walletChosen);

  // Chqrt configurations
  Chart.register(...registerables);
  Chart.defaults.font.family = "Raleway";
  Chart.defaults.color = "#000000";
  Chart.defaults.font.size = 14;

  // Button styles
  const periodStyle = (_period) => {
    return (
      "grow py-2 text-center rounded-xl font-semibold " +
      (period === _period
        ? "bg-purple-500 text-white"
        : "bg-transparent text-purple-500")
    );
  };

  const transactionTypeStyle = (_transactionType) => {
    return (
      "grow py-1 text-center rounded-xl font-semibold " +
      (transactionType === _transactionType
        ? "bg-purple-500 text-white"
        : "bg-purple-100 text-purple-500")
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

  const getReports = async (params) => {
    setLoading(true);
    const responseData = await ReportsService.getReports(params);

    if (responseData.status === "success") {
      setReports(responseData.data.reports);
    }
    setLoading(false);
  };

  // Fill reports with empty month/day
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

  useEffect(() => {
    let params = {
      year: year.id,
      transaction_type: transactionType,
      report_type: reportType,
      wallet: walletChosen?.id,
    };

    if (period === "month") {
      params = { ...params, month: month.id + 1 };
    }

    getReports(params);

    if (reportType === "expenses-incomes") {
      if (period === "month") {
        // console.log(getDaysInMonth(year, month));
        setChartLabels(getDaysInMonth(year.id, month.id + 1));
      } else {
        setChartLabels([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
      }
    }
  }, [transactionType, reportType, period, month, year, walletChosen]);

  useEffect(() => {
    // console.log(reports);
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
          Object.values(filledReports).map((report) => report.expenses),
        borderRadius: 10,
        backgroundColor: "#09234899",
        //   barThickness: 30,
      };

      const incomesDataset = {
        label: "Total incomes",
        data:
          filledReports &&
          Object.values(filledReports).map((report) => report.incomes),
        borderRadius: 10,
        backgroundColor: "#ffaa2390",
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
    <div className="p-8">
      {/* Header */}
      <div className="flex gap-4 items-center justify-between">
        <h2 className="text-4xl">Reports</h2>
        <SelectWallet />
      </div>

      {/* Content */}
      <div className="flex gap-8">
        {/* Charts */}
        <div className="w-7/12">
          <div className="mb-3">
            <div className="flex justify-end gap-3">
              {period === "month" && (
                <div className="w-1/6">
                  <Select
                    selected={month}
                    setSelected={setMonth}
                    data={monthsGetter()}
                  />
                </div>
              )}
              <div className="w-1/6">
                <Select
                  selected={year}
                  setSelected={setYear}
                  data={yearsGetter(20)}
                />
              </div>
            </div>
          </div>
          {loading && <Loading />}
          <div className="mb-5">
            {!loading && reportType === "expenses-incomes" && (
              <Bar
                height={400}
                width={600}
                data={{
                  labels: chartLabels,
                  datasets: datasets,
                }}
                options={{
                  maintainAspectRatio: false,
                  // scales: {
                  //   x: {
                  //     stacked: true,
                  //   },
                  // },
                }}
              />
            )}
            {!loading && reportType === "categories" && (
              <Doughnut
                height={400}
                width={400}
                options={{
                  maintainAspectRatio: false,
                }}
                data={{
                  labels: Object.values(filledReports).map(
                    (report) => report.name
                  ),
                  datasets: datasets,
                }}
              />
            )}
          </div>
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
        {/* Categories and expenses/incomes (transactions) */}
        <div className="w-5/12">
          <div className="flex border-b border-b-purple-200 items-center">
            <button
              className={reportTypeStyle("expenses-incomes")}
              onClick={() => setReportType("expenses-incomes")}
            >
              By transactions
            </button>
            <button
              className={reportTypeStyle("categories")}
              onClick={() => setReportType("categories")}
            >
              By categories
            </button>

            {/* <div className="flex grow items-center bg-white py-2 px-4 ms-6 rounded-xl my-1 gap-2">
              <input type="text" name="search" className="grow outline-none" />
              <FontAwesomeIcon
                icon={faSearch}
                className="text-gray-400 text-xl"
              />
            </div> */}
          </div>
          {loading && <Loading />}
          {!loading && reports && reportType === "categories" && (
            <div className="mt-4 overflow-y-scroll" style={{ height: 600 }}>
              {Object.values(reports).map((item, index) => {
                return (
                  <CategoryItem
                    key={Math.random()}
                    item={item}
                    index={index}
                    month={period === "month" ? month.id + 1 : null}
                    year={year.id}
                    wallet={1}
                    percentage={
                      totalAmount
                        ? Math.round((item.amount / totalAmount) * 100)
                        : 0
                    }
                  />
                );
              })}
            </div>
          )}
          {!loading && reports && reportType === "expenses-incomes" && (
            <div className="mt-3">
              {Object.keys(reports).map((key, index) => (
                <TransactionItem
                  item={reports[key]}
                  day={period === "month" ? key : null}
                  index={index}
                  month={period === "year" ? key : month.id + 1}
                  year={year.id}
                  wallet={1}
                  key={Math.random()}
                />
              ))}
            </div>
          )}
          {!loading && reports && reports.length === 0 && (
            <p className="text-2xl text-center text-gray-600 py-4">
              No transaction has been made in this period!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReportsPage;
