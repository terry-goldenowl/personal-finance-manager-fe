import React, { useEffect, useState } from "react";
import { plans } from "../../../utils/sampleData";
import CategoryPlanItem from "./CategoryPlanItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import AddCategoryPlan from "./AddCategoryPlan";
import PlansService from "../../../services/plans";
import Select from "../../../components/elements/Select";
import monthsGetter from "../../../utils/monthsGetter";
import Loading from "../../../components/others/Loading";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function CategoryPlans({ _month, _year }) {
  const [isAddingPlan, setIsAddingPlan] = useState(false);
  const [month, setMonth] = useState(
    _month
      ? monthsGetter().find((month) => month.id + 1 === _month)
      : monthsGetter().find((month) => month.id === new Date().getMonth())
  );
  const [year, setYear] = useState();
  const [loading, setLoading] = useState(false);
  const walletChosen = useSelector((state) => state.wallet.walletChosen);
  const [years, setYears] = useState();
  const [plans, setPlans] = useState(null);
  const [loadingYears, setLoadingYears] = useState(false);

  const getYearsBetween = async () => {
    try {
      setLoadingYears(true);
      const responseData = await PlansService.getCategoryPlansYears({
        wallet_id: walletChosen.id,
      });

      if (responseData.status === "success") {
        const yearsBetween = responseData.data.years.map((y) => {
          return { id: y, name: y };
        });

        setYears(yearsBetween);

        const currentYear = yearsBetween.find(
          (y) => y.id === new Date().getFullYear()
        );

        setYear(currentYear || yearsBetween[0]);
      }
      setLoadingYears(false);
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  const getCategoryPlans = async () => {
    console.log(1111);
    try {
      setLoading(true);
      const responseData = await PlansService.getCategoryPlans({
        year: year.id,
        month: month.id + 1,
        wallet_id: walletChosen?.id,
        with_report: true,
      });

      setPlans(responseData.data.plans);
      setLoading(false);
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  useEffect(() => {
    if (walletChosen && year && month) {
      getCategoryPlans();
    }
  }, [month, year, walletChosen]);

  useEffect(() => {
    setLoadingYears(true);
    if (walletChosen) getYearsBetween();
  }, [walletChosen]);

  return (
    <div>
      <div className="flex lg:justify-end justify-center sm:gap-3 gap-2">
        <div className="lg:w-1/6 sm:w-1/3 w-1/2">
          <Select
            selected={month}
            setSelected={setMonth}
            data={monthsGetter()}
          />
        </div>
        <div className="lg:w-1/6 sm:w-1/3 w-1/2">
          <Select
            selected={year}
            setSelected={setYear}
            data={years}
            loading={loadingYears}
          />
        </div>
      </div>
      <div className="border-2 border-blue-400 rounded-xl sm:p-6 p-3 bg-blue-200 shadow-xl shadow-blue-200">
        <div className="mb-3">
          <p className="text-3xl uppercase lg:text-start sm:text-center">
            {!loading && year && month.name + " " + year.name}
          </p>
        </div>
        <div className="mb-3">
          {loading && <Loading />}
          {!loading &&
            plans &&
            plans.length > 0 &&
            plans.map((categoryPlan) => (
              <CategoryPlanItem
                categoryPlan={categoryPlan}
                key={categoryPlan.id}
                onUpdateSuccess={() => {
                  getYearsBetween();
                  getCategoryPlans();
                }}
              />
            ))}
          {!loading && plans && plans.length === 0 && (
            <p className="text-lg">
              No category plan has been set for this month!
            </p>
          )}
        </div>
        <div className="flex lg:justify-end justify-center">
          <button
            className="flex items-center gap-2 rounded-md bg-blue-700 text-white py-1 px-4 hover:bg-blue-800"
            onClick={() => setIsAddingPlan(true)}
          >
            <FontAwesomeIcon icon={faPlusCircle} />
            Add new
          </button>
        </div>
      </div>
      {isAddingPlan && (
        <AddCategoryPlan
          onClose={() => setIsAddingPlan(false)}
          onUpdateSuccess={() => {
            getYearsBetween();
            getCategoryPlans();
          }}
          _month={month.id + 1}
          _year={year.id}
        />
      )}
    </div>
  );
}

export default CategoryPlans;
