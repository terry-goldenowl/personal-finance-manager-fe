import React, { useEffect, useState } from "react";
import ReportsService from "../../../services/reports";
import formatCurrency from "../../../utils/currencyFormatter";
import AdjustBudget from "./AdjustBudget";
import ConfirmDeleteModal from "../../../components/modal/ConfirmDeleteModal";
import PlansService from "../../../services/plans";
import { toast } from "react-toastify";

function MonthPlanItem({ monthPlan, onUpdateSuccess, onSeeCategoryPlans }) {
  const [currentTotal, setCurrentTotal] = useState(0);
  const [isAdjusting, setIsAdjusting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const percentage = Math.round((currentTotal / monthPlan.amount) * 100);

  const getTotal = async () => {
    // Return a list of expenses and incomes of months
    const responseData = await ReportsService.getReports({
      year: monthPlan.year,
      report_type: "expenses-incomes",
      // wallet: 2,
    });

    if (responseData.data.reports[monthPlan.month + ""]) {
      setCurrentTotal(responseData.data.reports[monthPlan.month + ""].expenses);
    } else {
      setCurrentTotal(0);
    }
  };

  useEffect(() => {
    getTotal();
  }, []);

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

  return (
    <div
      className={
        "border-blue-400 rounded-xl p-4 bg-blue-200 mb-6 " +
        (monthPlan.month === new Date().getMonth() + 1
          ? "border-2 shadow-xl shadow-blue-200"
          : "border")
      }
    >
      <div className="mb-3 flex justify-between items-center">
        <p className="text-4xl">{monthPlan.month + "/" + monthPlan.year}</p>
        <div className="flex gap-1">
          <button
            className="py-1 px-4 rounded-md bg-blue-500 text-white text-sm hover:bg-blue-600"
            onClick={() => setIsAdjusting(true)}
          >
            Adjust budget
          </button>
          <button
            className="py-1 px-4 rounded-md bg-blue-500 text-white text-sm hover:bg-blue-600"
            onClick={handleClickSeeCategoryPlans}
          >
            See category plans
          </button>
          <button
            className="py-1 px-4 rounded-md bg-red-500 text-white text-sm hover:bg-red-600"
            onClick={() => setIsDeleting(true)}
          >
            Delete
          </button>
        </div>
      </div>
      <div>
        <div className="mb-2 flex justify-between items-end">
          <p className="text-lg">
            Your budget for this month:{" "}
            <span className="font-bold text-2xl">
              {formatCurrency(monthPlan.amount)}
            </span>
          </p>
          <p className="text-sm">
            Budget left until 31 August:{" "}
            <span className="font-bold text-xl">
              {formatCurrency(monthPlan.amount - currentTotal)}
            </span>
          </p>
        </div>
        <div className="flex gap-3 items-center">
          <div className="h-3 bg-blue-50 rounded-full grow shadow-sm">
            <div
              className="h-full bg-blue-500 rounded-full"
              style={{ width: percentage + "%" }}
            ></div>
          </div>
          <p className="text-xl text-blue-500 font-bold">{percentage + "%"}</p>
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
    </div>
  );
}

export default MonthPlanItem;
