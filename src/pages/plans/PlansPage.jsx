import React, { useState } from "react";
import CategoryPlans from "./components/CategoryPlans";
import MonthPlans from "./components/MonthPlans";

function PlansPage() {
  const [viewBy, setViewBy] = useState("months");
  const [monthGiven, setMonthGiven] = useState(null);
  const [yearGiven, setYearGiven] = useState(null);

  const btnStyle = (vb) => {
    if (viewBy === vb)
      return "bg-blue-500 text-white hover:bg-blue-600 font-bold";
    else return "text-blue-600 bg-blue-200";
  };

  const handleSeeCategoryPlans = (month, year) => {
    setMonthGiven(month);
    setYearGiven(year);

    setViewBy("categories");
  };

  const handleClickByCategoryPlans = () => {
    setMonthGiven(null);
    setYearGiven(null);

    setViewBy("categories");
  };

  return (
    <div className="p-8">
      <div className="flex gap-4 mb-4">
        <h2 className="text-4xl">Plans</h2>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-3/5">
          <div className="mb-4 flex justify-center w-full">
            <button
              className={
                "py-2 w-1/2 rounded-l-full hover:font-bold " +
                btnStyle("months")
              }
              onClick={() => setViewBy("months")}
            >
              By month
            </button>
            <button
              className={
                "py-2 w-1/2 rounded-r-full hover:font-bold " +
                btnStyle("categories")
              }
              onClick={handleClickByCategoryPlans}
            >
              By categories
            </button>
          </div>
          <div className="">
            {viewBy === "months" && (
              <MonthPlans onSeeCategoryPlans={handleSeeCategoryPlans} />
            )}
            {viewBy === "categories" && (
              <CategoryPlans _month={monthGiven} _year={yearGiven} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlansPage;
