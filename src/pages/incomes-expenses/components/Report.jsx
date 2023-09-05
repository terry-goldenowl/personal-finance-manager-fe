import {
  faChevronLeft,
  faChevronRight,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import formatCurrency from "../../../utils/currencyFormatter";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatMonth } from "../../../utils/dateFormatter";
import PlansService from "../../../services/plans";
import AddMonthPlan from "../../plans/components/AddMonthPlan";

function Report({ month, year, decreaseMonth, increaseMonth, report }) {
  const [plan, setPlan] = useState();
  const [isAddingPlan, setIsAddingPlan] = useState(false);

  const getPlan = async () => {
    const responseData = await PlansService.getPlans({
      type: "month",
      month,
      year,
    });

    if (responseData.status === "success") {
      if (responseData.data.plans.length > 0)
        setPlan(responseData.data.plans[0]);
      else setPlan(null);
    }
  };

  useEffect(() => {
    getPlan();
  }, [month, year]);

  let percentageReport;
  if (report) {
    if (report.incomes === 0) {
      percentageReport = 100;
    } else {
      percentageReport = Math.round((report.expenses / report.incomes) * 100);
    }
  }

  let percentagePlan;
  if (report && plan) {
    percentagePlan = Math.round((report.expenses / plan.amount) * 100);
  }

  return (
    <div className="w-5/12 border-r border-r-blue-400 py-2 px-6">
      <div className="flex justify-between items-center mb-4 ">
        <button
          className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-purple-200 active:bg-purple-300"
          onClick={decreaseMonth}
        >
          <FontAwesomeIcon className="text-gray-500" icon={faChevronLeft} />
        </button>
        <div className="flex justify-center items-center gap-3">
          <FontAwesomeIcon icon={faStar} className="text-gray-500" />
          <h2 className="text-center text-4xl">
            {formatMonth(month) + "/" + year}
          </h2>
          <FontAwesomeIcon icon={faStar} className="text-gray-500" />
        </div>
        <button
          className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-purple-200 active:bg-purple-300"
          onClick={increaseMonth}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>

      {report && (
        <>
          <div className="mb-3">
            <p className="text-xl flex justify-between mb-1">
              <span>Total incomes:</span>{" "}
              <span className="text-2xl font-semibold text-green-500">
                {formatCurrency(report.incomes)}
              </span>
            </p>
            <p className="text-xl flex justify-between">
              <span>Total expenses: </span>
              <span className="text-2xl font-semibold text-orange-500">
                {"-" + formatCurrency(report.expenses)}
              </span>
            </p>
          </div>

          <div className="flex flex-col items-center justify-center mb-6">
            <div className="w-72 mb-4">
              <CircularProgressbarWithChildren
                value={percentageReport}
                counterClockwise={true}
                styles={buildStyles({
                  pathColor: "#F97315",
                  trailColor: "#11111111",
                  pathTransitionDuration: 0.5,
                })}
              >
                <img
                  className="w-32 h-32"
                  src="https://png.pngtree.com/png-vector/20190411/ourlarge/pngtree-vector-wallet-icon-png-image_924644.jpg"
                />
                <p className="text-3xl">{percentageReport + "%"}</p>
              </CircularProgressbarWithChildren>
            </div>
            <p className="text-xl">
              Remainder:{" "}
              <span className="font-semibold text-purple-600 text-2xl">
                {formatCurrency(report.incomes - report.expenses)}
              </span>
            </p>
          </div>

          <div className="text-center flex flex-col items-center">
            {!plan && (
              <button
                className="py-2 px-8 rounded-lg bg-transparent text-purple-500 font-semibold hover:bg-white mb-3"
                onClick={() => setIsAddingPlan(true)}
              >
                Set up plan for this month
              </button>
            )}
            {plan && (
              <div className="mb-3 bg-purple-200 rounded-xl py-2 px-4">
                <div className="mb-2 flex justify-between items-end">
                  <p className="text-md text-start">
                    Your budget for this month:{" "}
                    <span className="font-bold text-xl">
                      {formatCurrency(plan.amount)}
                    </span>
                  </p>
                  <p className="text-md text-end">
                    Budget left until 31 August:{" "}
                    <span className="font-bold text-xl">
                      {formatCurrency(plan.amount - report.expenses)}
                    </span>
                  </p>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="h-3 bg-white rounded-full grow shadow-sm">
                    <div
                      className="h-full bg-purple-500 rounded-full"
                      style={{ width: percentagePlan + "%" }}
                    ></div>
                  </div>
                  <p className="text-xl text-purple-500 font-bold">
                    {percentagePlan + "%"}
                  </p>
                </div>
              </div>
            )}
            <button className="py-2 px-8 rounded-lg bg-purple-500 text-white text-sm font-semibold uppercase mb-3 hover:bg-purple-600">
              View report
            </button>
          </div>
        </>
      )}

      {!report && (
        <>
          <p className="text-center text-3xl mt-12 text-gray-400 font-light">
            You didn't make any transactions in this period!
          </p>
        </>
      )}

      {isAddingPlan && (
        <AddMonthPlan
          onClose={() => setIsAddingPlan(false)}
          onAddingSuccess={() => getPlan()}
          _month={month}
          _year={year}
        />
      )}
    </div>
  );
}

export default Report;
