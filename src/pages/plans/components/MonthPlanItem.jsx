import React, { useEffect, useState } from "react";
import ReportsService from "../../../services/reports";
import formatCurrency from "../../../utils/currencyFormatter";
import AdjustBudget from "./AdjustBudget";
import ConfirmDeleteModal from "../../../components/modal/ConfirmDeleteModal";
import PlansService from "../../../services/plans";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import getMonthName from "../../../utils/getMonthName";

function MonthPlanItem({ monthPlan, onUpdateSuccess, onSeeCategoryPlans }) {
  const [isAdjusting, setIsAdjusting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [percentage, setPercentage] = useState();

  const handleClickSeeCategoryPlans = () => {
    onSeeCategoryPlans(monthPlan.month, monthPlan.year);
  };

  const handleDeletePlan = async () => {
    const responseData = await PlansService.deleteMonthPlan(monthPlan.id);
    if (responseData.status === "success") {
      setIsDeleting(false);
      toast.success("Delete plan successfully!");
      onUpdateSuccess();
    } else {
      toast.error(responseData.error);
    }
  };

  useEffect(() => {
    if (monthPlan.actual) {
      setPercentage(Math.round((monthPlan.actual / monthPlan.amount) * 100));
    } else {
      setPercentage(0);
    }
  }, [monthPlan]);

  return (
    <motion.div
      className={
        "border-blue-400 rounded-xl p-4 bg-blue-200 mb-6 " +
        (monthPlan.month === new Date().getMonth() + 1
          ? "border-2 shadow-xl shadow-blue-200"
          : "border")
      }
      whileHover={{
        scale: 1.05,
      }}
    >
      <div className="mb-3 flex justify-between items-center md:flex-row flex-col gap-2">
        <p className="text-3xl uppercase">
          {getMonthName(monthPlan.month - 1)}{" "}
          <span className="text-xl">{monthPlan.year}</span>
        </p>
        <div className="flex gap-1">
          <button
            className="py-1 px-4 rounded-md bg-blue-500 text-white text-xs uppercase font-bold hover:bg-blue-600"
            onClick={() => setIsAdjusting(true)}
          >
            Adjust budget
          </button>
          <button
            className="py-1 px-4 rounded-md bg-blue-500 text-white text-xs uppercase font-bold hover:bg-blue-600"
            onClick={handleClickSeeCategoryPlans}
          >
            See category plans
          </button>
          <button
            className="py-1 px-4 rounded-md bg-red-500 text-white text-xs uppercase font-bold hover:bg-red-600"
            onClick={() => setIsDeleting(true)}
          >
            Delete
          </button>
        </div>
      </div>
      <div>
        <div className="mb-2 flex justify-between items-start">
          <div className="sm:text-lg text-sm w-1/2">
            <p>Your budget for this month: </p>
            <p className="font-bold text-2xl text-green-600">
              {formatCurrency(monthPlan.amount)}
            </p>
          </div>
          {percentage <= 100 && (
            <div className="text-sm text-end w-1/2">
              <p>
                Budget left until the end of {getMonthName(monthPlan.month - 1)}
                :{" "}
              </p>
              <p className="font-bold text-xl">
                {formatCurrency(monthPlan.amount - monthPlan.actual)}
              </p>
            </div>
          )}
          {percentage > 100 && (
            <div className="text-sm text-red-600 font-bold text-end w-1/2">
              <p>You have overspent your budget of: </p>
              <p className="text-xl">
                {formatCurrency((monthPlan.amount - monthPlan.actual) * -1)}
              </p>
            </div>
          )}
        </div>
        <div className="flex gap-3 items-center">
          <div className="h-3 bg-blue-50 rounded-full grow shadow-sm">
            <div
              className={
                "h-full rounded-full " +
                (percentage > 100
                  ? "bg-red-600"
                  : percentage > 50
                  ? "bg-blue-600"
                  : "bg-blue-400")
              }
              style={{ width: (percentage > 100 ? 100 : percentage) + "%" }}
            ></div>
          </div>
          <p
            className={`text-xl ${
              percentage <= 100 ? "text-blue-600" : "text-red-600"
            } font-bold`}
          >
            {percentage + "%"}
          </p>
        </div>
      </div>

      {isAdjusting && (
        <AdjustBudget
          onClose={() => setIsAdjusting(false)}
          plan={monthPlan}
          onUpdateSuccess={onUpdateSuccess}
        />
      )}

      {isDeleting && (
        <ConfirmDeleteModal
          message={
            "Are you sure to delete this plan? This action can not be undone!"
          }
          onAccept={handleDeletePlan}
          onClose={() => setIsDeleting(false)}
        />
      )}
    </motion.div>
  );
}

export default MonthPlanItem;
