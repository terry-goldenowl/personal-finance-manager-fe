import React, { useEffect, useState } from "react";
import { categoryPlans } from "../../../utils/sampleData";
import CategoryPlanItem from "./CategoryPlanItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import AddCategoryPlan from "./AddCategoryPlan";
import PlansService from "../../../services/plans";
import Select from "../../../components/elements/Select";
import monthsGetter from "../../../utils/monthsGetter";
import yearsGetter from "../../../utils/yearsGetter";
import Loading from "../../../components/others/Loading";

function CategoryPlans({ _month, _year }) {
  const [isAddingPlan, setIsAddingPlan] = useState(false);
  const [categoryPlans, setCategoryPlans] = useState([]);
  const [month, setMonth] = useState(
    _month
      ? monthsGetter().find((month) => month.id + 1 === _month)
      : monthsGetter().find((month) => month.id === new Date().getMonth())
  );
  const [year, setYear] = useState(
    _year
      ? { id: _year, name: _year }
      : yearsGetter(20).find((year) => year.id === new Date().getFullYear())
  );
  const [loading, setLoading] = useState(false);

  const getCategoryPlans = async () => {
    setLoading(true);
    const responseData = await PlansService.getPlans({
      type: "category",
      year: year.id,
      month: month.id + 1,
    });

    setLoading(false);
    setCategoryPlans(responseData.data.plans);
  };

  useEffect(() => {
    getCategoryPlans();
  }, [month, year]);

  const handleUpdateSuccess = () => {
    getCategoryPlans();
  };

  return (
    <div>
      <div className="flex justify-end gap-3">
        <div className="w-1/6">
          <Select
            selected={year}
            setSelected={setYear}
            data={yearsGetter(20)}
          />
        </div>
        <div className="w-1/6">
          <Select
            selected={month}
            setSelected={setMonth}
            data={monthsGetter()}
          />
        </div>
      </div>
      <div className="border-2 border-blue-400 rounded-xl p-6 bg-blue-200 shadow-xl shadow-blue-200">
        <div className="mb-3">
          <p className="text-4xl">{month.name + " " + year.name}</p>
        </div>
        <div className="mb-3">
          {loading && <Loading />}
          {!loading &&
            categoryPlans.length > 0 &&
            categoryPlans.map((categoryPlan) => (
              <CategoryPlanItem
                categoryPlan={categoryPlan}
                key={categoryPlan.id}
                onUpdateSuccess={() => getCategoryPlans()}
              />
            ))}
          {!loading && categoryPlans.length === 0 && (
            <p className="text-lg">
              No category plan has been set for this month!
            </p>
          )}
        </div>
        <div className="flex justify-end">
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
          onUpdateSuccess={handleUpdateSuccess}
          _month={_month}
          _year={_year}
        />
      )}
    </div>
  );
}

export default CategoryPlans;
