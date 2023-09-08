import React, { useEffect, useState } from "react";
import AddMonthPlan from "./AddMonthPlan";
import PlansService from "../../../services/plans";
import MonthPlanItem from "./MonthPlanItem";
import yearsGetter from "../../../utils/yearsGetter";
import Select from "../../../components/elements/Select";
import Loading from "../../../components/others/Loading";
import ReportsService from "../../../services/reports";
import { useSelector } from "react-redux";

function MonthPlans({ onSeeCategoryPlans }) {
  const [isAddingPlan, setIsAddingPlan] = useState(false);
  const [monthPlans, setMonthPlans] = useState([]);
  const [year, setYear] = useState(
    yearsGetter(20).find((year) => year.id === new Date().getFullYear())
  );
  const [loading, setLoading] = useState(false);
  const walletChosen = useSelector((state) => state.wallet.walletChosen);

  const getMonthPlans = async () => {
    setLoading(true);
    const responseData = await PlansService.getPlans({
      type: "month",
      year: year.id,
      wallet_id: walletChosen?.id,
    });

    let responsePlans = responseData.data.plans;

    responsePlans = await Promise.all(
      responsePlans.map(async (plan) => {
        const responseReportData = await ReportsService.getReports({
          year: plan.year,
          report_type: "expenses-incomes",
          wallet_id: walletChosen.id,
        });

        const monthReport = responseReportData.data.reports[plan.month + ""];
        return {
          ...plan,
          currentTotal: monthReport ? monthReport.expenses : 0,
        };
      })
    );

    setLoading(false);

    setMonthPlans(responsePlans);
  };

  useEffect(() => {
    getMonthPlans();
  }, [year, walletChosen]);

  return (
    <div>
      <div className="mb-3 flex justify-end items-start gap-2">
        <div className="w-32">
          <Select
            selected={year}
            setSelected={setYear}
            data={yearsGetter(20)}
          />
        </div>
        <button
          className="rounded-md bg-blue-500 text-white px-6 py-1.5 hover:bg-blue-600"
          onClick={() => setIsAddingPlan(true)}
        >
          Create plan
        </button>
      </div>
      <div>
        {loading && <Loading />}
        {!loading &&
          monthPlans.map((monthPlan) => (
            <MonthPlanItem
              monthPlan={monthPlan}
              key={monthPlan.id}
              onUpdateSuccess={() => getMonthPlans()}
              onSeeCategoryPlans={onSeeCategoryPlans}
            />
          ))}
        {!loading && monthPlans.length === 0 && (
          <p className="text-2xl text-center text-gray-600 py-4">
            No plan has been set in the period!
          </p>
        )}
      </div>

      {isAddingPlan && (
        <AddMonthPlan
          onClose={() => setIsAddingPlan(false)}
          onAddingSuccess={() => getMonthPlans()}
        />
      )}
    </div>
  );
}

export default MonthPlans;
