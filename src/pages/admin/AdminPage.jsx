import React, { useEffect, useMemo, useState } from "react";
import UsersServices from "../../services/users";
import usersImg from "../../assets/images/teamwork.png";
import transactionsImg from "../../assets/images/transaction.png";
import categoriesImg from "../../assets/images/categories.png";
import TransactionsService from "../../services/transactions";
import { Line } from "react-chartjs-2";
import ReportsService from "../../services/reports";
import { Chart, registerables } from "chart.js";
import { motion } from "framer-motion";
import CategoriesService from "../../services/categories";
import { toast } from "react-toastify";

const options = {
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: "Quantity",
      },
    },
    x: {
      title: {
        display: true,
        text: "Month",
      },
    },
  },
  maintainAspectRatio: false,
  cubicInterpolationMode: "monotone",
};

function AdminPage() {
  const [transactionsCounts, setTransactionsCounts] = useState();
  const [usersCounts, setUsersCounts] = useState();
  const [defaultCategoriesCount, setDefaultCategoriesCount] = useState();
  const [userQuantityPerMonth, setUserQuantityPerMonth] = useState([]);
  const [transactionQuantityPerMonth, setTransactionQuantityPerMonth] =
    useState([]);

  const getCounts = async () => {
    try {
      let responseData = await UsersServices.getCounts();

      if (responseData.status === "success") {
        setUsersCounts(responseData.data);
      }

      responseData = await TransactionsService.getCounts();

      if (responseData.status === "success") {
        setTransactionsCounts(responseData.data);
      }

      responseData = await CategoriesService.getDefaultCount();

      if (responseData.status === "success") {
        setDefaultCategoriesCount(responseData.data.count);
      }
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  const getUserQuantityPerMonth = async () => {
    try {
      const responseData = await ReportsService.getUserQuantityPerMonth({
        year: new Date().getFullYear(),
      });

      console.log(responseData);

      if (responseData.status === "success") {
        setUserQuantityPerMonth(responseData.data.quantities);
      }
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  const getTransactionQuantityPerMonth = async () => {
    try {
      const responseData = await ReportsService.getTransactionQuantityPerMonth({
        year: new Date().getFullYear(),
      });

      if (responseData.status === "success") {
        setTransactionQuantityPerMonth(responseData.data.quantities);
      }
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  const statistics = useMemo(
    () => [
      {
        name: "Users",
        count: usersCounts?.count,
        currentMonthCount: usersCounts?.currentMonthCount,
        color: "text-green-600",
        bgColor: "from-green-400 to-green-200",
        image: usersImg,
      },
      {
        name: "Transactions",
        count: transactionsCounts?.count,
        currentMonthCount: transactionsCounts?.currentMonthCount,
        color: "text-blue-600",
        bgColor: "from-blue-400 to-blue-200",
        image: transactionsImg,
      },
      {
        name: "Default Categories",
        count: defaultCategoriesCount,
        currentMonthCount: undefined,
        color: "text-orange-600",
        bgColor: "from-orange-400 to-orange-200",
        image: categoriesImg,
      },
    ],
    [transactionsCounts, usersCounts, defaultCategoriesCount]
  );

  Chart.register(...registerables);
  Chart.defaults.font.family = "Quicksand";
  Chart.defaults.color = "#000000";
  Chart.defaults.font.size = 14;

  const userQuantityData = useMemo(() => {
    return {
      labels: Object.keys(userQuantityPerMonth),
      datasets: [
        {
          label: "User quantity",
          data: Object.values(userQuantityPerMonth),
          fill: false,
          borderColor: "#1DA44C",
        },
      ],
    };
  }, [userQuantityPerMonth]);

  const transactionQuantityData = useMemo(() => {
    return {
      labels: Object.keys(transactionQuantityPerMonth),
      datasets: [
        {
          label: "Transaction quantity",
          data: Object.values(transactionQuantityPerMonth),
          fill: false,
          borderColor: "#2463EB",
        },
      ],
    };
  }, [transactionQuantityPerMonth]);

  useEffect(() => {
    getCounts();
    getUserQuantityPerMonth();
    getTransactionQuantityPerMonth();
  }, []);

  return (
    <div className="lg:p-8 sm:p-14 p-3">
      <div className="flex gap-4 items-center">
        <h2 className="sm:text-4xl text-3xl">Dash board</h2>
      </div>
      <div>
        <div className="mt-8 flex gap-4 md:flex-row flex-col">
          {statistics &&
            statistics.map((statistic) => (
              <motion.div
                key={Math.random() * 100}
                className={`p-4 rounded-2xl xl:w-1/4 md:w-1/3 w-full flex justify-between items-center shadow-md bg-gradient-to-tr ${statistic.bgColor}`}
                whileHover={{ scale: 1.05 }}
              >
                <div>
                  <p className={`text-3xl font-bold ${statistic.color}`}>
                    {statistic.count}
                  </p>
                  <p
                    className={`text-md uppercase ${statistic.color} font-bold`}
                  >
                    {statistic.name}
                  </p>
                  {statistic.currentMonthCount && (
                    <p>
                      This month: <span>{statistic.currentMonthCount}</span>
                    </p>
                  )}
                </div>
                <div>
                  <img src={statistic.image} alt="" className="w-16 h-16" />
                </div>
              </motion.div>
            ))}
        </div>
      </div>
      <div className="flex lg:gap-4 gap-8 mt-6 max-w-full lg:flex-row flex-col">
        <div className="lg:w-1/2 w-full h-96 p-4 rounded-2xl bg-white relative shadow-md">
          <Line data={userQuantityData} options={options} />
          <div className="flex justify-center items-center absolute -bottom-5 w-full">
            <p className="italic py-1 px-4 bg-green-500 text-white rounded-xl shadow-sm text-sm uppercase font-bold">
              User quantities per month
            </p>
          </div>
        </div>
        <div className="lg:w-1/2 w-full h-96 p-4 rounded-2xl bg-white relative shadow-md">
          <Line data={transactionQuantityData} options={options} />
          <div className="flex justify-center items-center absolute -bottom-5 w-full">
            <p className="italic py-1 px-4 bg-blue-500 text-white rounded-xl shadow-sm text-sm uppercase font-bold">
              Transaction quantities per month
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
