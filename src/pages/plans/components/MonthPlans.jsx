import React, { useEffect, useState } from "react";
import AddMonthPlan from "./AddMonthPlan";
import PlansService from "../../../services/plans";
import MonthPlanItem from "./MonthPlanItem";
import yearsGetter from "../../../utils/yearsGetter";
import Select from "../../../components/elements/Select";
import Loading from "../../../components/others/Loading";
import ReportsService from "../../../services/reports";

function MonthPlans({ onSeeCategoryPlans }) {
  const [isAddingPlan, setIsAddingPlan] = useState(false);
  const [monthPlans, setMonthPlans] = useState([]);
  const [year, setYear] = useState(
    yearsGetter(20).find((year) => year.id === new Date().getFullYear())
  );
  const [loading, setLoading] = useState(false);

  const getMonthPlans = async () => {
    setLoading(true);
    const responseData = await PlansService.getPlans({
      type: "month",
      year: year.id,
    });

    let responsePlans = responseData.data.plans;
    responsePlans = await Promise.all(
      responsePlans.map(async (plan) => {
        const responseReportData = await ReportsService.getReports({
          year: plan.year,
          report_type: "expenses-incomes",
          wallet: 1,
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
  }, [year]);

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
