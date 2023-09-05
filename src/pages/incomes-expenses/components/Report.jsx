import {
  faChevronLeft,
  faChevronRight,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import formatCurrency from "../../../utils/currencyFormatter";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatMonth } from "../../../utils/dateFormatter";

function Report({ month, year, decreaseMonth, increaseMonth, report }) {
  let percentage;
  if (report) {
    if (report.incomes === 0) {
      percentage = 100;
    } else {
      percentage = (report.expenses / report.incomes) * 100;
    }
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
                value={percentage}
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
                <p className="text-3xl">{Math.floor(percentage) + "%"}</p>
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
            <button className="py-2 px-8 rounded-lg bg-purple-500 text-white text-sm font-semibold uppercase mb-3 hover:bg-purple-600">
              View report
            </button>

            <button className="py-2 px-8 rounded-lg bg-transparent text-purple-500 font-semibold hover:bg-white">
              Set up plan for this month
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
    </div>
  );
}

export default Report;
