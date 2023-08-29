import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { Link, useSearchParams } from "react-router-dom";
import formatCurrency from "../../utils/currencyFormatter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faSearch } from "@fortawesome/free-solid-svg-icons";
import { chartData, expensesByCategoriesData } from "../../utils/sampleData";
import CategoryItem from "./components/CategoryItem";

function ReportsPage() {
  // Chqrt configurations
  Chart.register(...registerables);
  Chart.defaults.font.family = "Raleway";
  Chart.defaults.color = "#000000";
  Chart.defaults.font.size = 14;

  const [searchParams, setSearchParams] = useSearchParams();
  const [typeTime, setTypeTime] = useState("month");
  const [typeChart, setTypeChart] = useState("total");
  const [chosenMonth, setChosenMonth] = useState("");
  const [chosenYear, setChosenYear] = useState(""); // Default year is current year
  const [datasets, setDatasets] = useState([]);
  const [typeList, setTypeList] = useState("categories");
  const [expensesCategoryData, setExpensesCategoryData] = useState(
    expensesByCategoriesData
  );

  // Buttons styles
  const typeTimeActiveStyle =
    "grow py-2 text-center rounded-xl font-semibold bg-purple-500 text-white";
  const typeTimeNormalStyle =
    "grow py-2 text-center rounded-xl font-semibold bg-transparent text-purple-500";
  const typeChartActiveStyle =
    "grow py-1 text-center rounded-xl font-semibold bg-purple-500 text-white";
  const typeChartNormalStyle =
    "grow py-1 text-center rounded-xl font-semibold bg-purple-100 text-purple-500";
  const typeListActiveStyle =
    "py-3 px-6 border-b-4 border-b-purple-500 text-purple-600 font-semibold";
  const typeListNormalStyle =
    "py-3 px-6 border-b-4 border-b-purple-200 hover:font-semibold";

  // Trigger search when search params change
  useEffect(() => {
    console.log(typeTime);
    searchParams.set("time", typeTime);
    searchParams.set("type", typeChart);

    if (typeTime === "month") {
      searchParams.set("month", chosenMonth);
    } else {
      searchParams.delete("month");
    }

    searchParams.set("year", chosenYear);
    setSearchParams(searchParams);
  }, [typeChart, typeTime, chosenMonth, chosenYear]);

  useEffect(() => {
    const expensesDataset = {
      label: "Total expenses",
      data: chartData.map((d) => d.total_expenses),
      borderRadius: 10,
      backgroundColor: "#09234899",
      //   barThickness: 30,
    };
    const incomesDataset = {
      label: "Total incomes",
      data: chartData.map((d) => d.total_incomes),
      borderRadius: 10,
      backgroundColor: "#ffaa2390",
      //   barThickness: 30,
    };

    if (typeChart === "total") {
      setDatasets([expensesDataset, incomesDataset]);
    }

    if (typeChart === "incomes") {
      setDatasets([incomesDataset]);
    }
    if (typeChart === "expenses") {
      setDatasets([expensesDataset]);
    }

    console.log(datasets);
  }, [typeChart]);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex justify-between">
        <h2 className="text-4xl">Reports</h2>
        <div className="flex border-2 border-purple-500 rounded-2xl">
          <button className="py-2 text-center rounded-xl font-semibold bg-purple-500 text-white px-8 hover:bg-purple-600">
            Add expense
          </button>
          <button className="py-2 px-8 rounded-xl font-semibold text-purple-600">
            Add incomes
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex gap-8">
        {/* Charts */}
        <div className="w-1/2">
          <div className="mb-3">
            <form action="" method="get" className="flex justify-end gap-2">
              {typeTime === "month" && (
                <select
                  name="month"
                  id="period"
                  className="py-1 px-4 rounded-xl border border-purple-300 outline-none"
                  value={chosenMonth}
                  onChange={(e) => setChosenMonth(e.target.value)}
                >
                  <option value={""}>Select month</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="2">3</option>
                  <option value="2">4</option>
                  <option value="2">5</option>
                  <option value="2">6</option>
                  <option value="2">7</option>
                </select>
              )}

              <select
                name="year"
                id="period"
                className="py-1 px-4 rounded-xl border border-purple-300 outline-none"
                value={chosenYear}
                onChange={(e) => setChosenYear(e.target.value)}
              >
                <option value={""}>Select year</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
              </select>
            </form>
          </div>

          <div className="mb-5">
            <Bar
              height={400}
              width={600}
              data={{
                labels: chartData.map((d) => "Tháng " + d.month),
                datasets: datasets,
              }}
              options={{
                maintainAspectRatio: false,
              }}
            />
          </div>
          <div>
            <div className="flex gap-2 mb-2 p-2 rounded-xl bg-purple-100">
              <button
                onClick={() => setTypeTime("month")}
                className={
                  typeTime === "month"
                    ? typeTimeActiveStyle
                    : typeTimeNormalStyle
                }
              >
                Month
              </button>
              <button
                onClick={() => setTypeTime("year")}
                className={
                  typeTime === "year"
                    ? typeTimeActiveStyle
                    : typeTimeNormalStyle
                }
              >
                Year
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setTypeChart("total")}
                className={
                  typeChart === "total"
                    ? typeChartActiveStyle
                    : typeChartNormalStyle
                }
              >
                Total
              </button>
              <button
                onClick={() => setTypeChart("incomes")}
                className={
                  typeChart === "incomes"
                    ? typeChartActiveStyle
                    : typeChartNormalStyle
                }
              >
                Incomes
              </button>
              <button
                onClick={() => setTypeChart("expenses")}
                className={
                  typeChart === "expenses"
                    ? typeChartActiveStyle
                    : typeChartNormalStyle
                }
              >
                Expenses
              </button>
            </div>
          </div>
        </div>
        {/* Categories and expenses/incomes (transactions) */}
        <div className="w-1/2">
          <div className="flex border-b border-b-purple-200">
            <button
              className={
                typeList === "categories"
                  ? typeListActiveStyle
                  : typeListNormalStyle
              }
              onClick={() => setTypeList("categories")}
            >
              By categories
            </button>
            <button
              className={
                typeList === "expenses"
                  ? typeListActiveStyle
                  : typeListNormalStyle
              }
              onClick={() => setTypeList("expenses")}
            >
              By expenses/incomes
            </button>

            <div className="flex grow items-center bg-white py-2 px-4 ms-6 rounded-xl my-1 gap-2">
              <input type="text" name="search" className="grow outline-none" />
              <FontAwesomeIcon
                icon={faSearch}
                className="text-gray-400 text-xl"
              />
            </div>
          </div>
          {typeList === "categories" && (
            <div className="mt-4 overflow-y-scroll" style={{ height: 600 }}>
              {expensesByCategoriesData.map((item, index) => {
                return (
                  <CategoryItem key={Math.random()} item={item} index={index} />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReportsPage;
