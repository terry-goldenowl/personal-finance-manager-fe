import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import AddCategoryPlan from "../../plans/components/AddCategoryPlan";
import PlansService from "../../../services/plans";
import AdjustBudget from "../../plans/components/AdjustBudget";

function DefaultCategoryItem({ category }) {
  const [isHover, setIsHover] = useState(false);
  const [isAddingPlan, setIsAddingPlan] = useState(false);
  const [isAdjustingPlan, setIsAdjustingPlan] = useState(false);
  const [plan, setPlan] = useState();
  const [loading, setLoading] = useState(false);

  const getPlan = async () => {
    setLoading(true);
    const responseData = await PlansService.getPlans({
      type: "categories",
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      category_id: category.id,
    });
    setTimeout(() => setLoading(false), 200);

    if (responseData.status === "success") {
      if (responseData.data.plans.length > 0)
        setPlan(responseData.data.plans[0]);
      else setPlan(null);
    }
  };

  useEffect(() => {
    if (isHover) {
      getPlan();
    }
  }, [isHover]);

  return (
    <>
      <div
        className="flex flex-col justify-start items-center p-3 rounded-xl hover:shadow-blue-200 hover:shadow-xl relative"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div className="w-24 h-24 overflow-hidden rounded-md shadow-sm mb-2">
          <img
            src={process.env.REACT_APP_API_HOST + category.image}
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
        <p className="font-semibold text-sm text-center">{category.name}</p>
        {isHover && category.type === "expenses" && (
          <motion.div
            className="absolute -bottom-6 z-10"
            initial={{ rotate: -90, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{
              type: "spring",
            }}
          >
            <button
              className="bg-blue-600 text-white py-1 px-4 rounded-xl shadow-sm shadow-blue-300 text-sm"
              onClick={() => {
                !plan ? setIsAddingPlan(true) : setIsAdjustingPlan(true);
                setIsHover(false);
              }}
            >
              {loading && "Loading..."}
              {!loading &&
                (!plan ? "Set plan this month" : "Adjust plan this month")}
            </button>
          </motion.div>
        )}
      </div>
      {isAddingPlan && (
        <AddCategoryPlan
          _month={new Date().getMonth() + 1}
          _year={new Date().getFullYear()}
          onClose={() => setIsAddingPlan(false)}
          category={category}
          onUpdateSuccess={() => getPlan()}
        />
      )}
      {isAdjustingPlan && (
        <AdjustBudget
          plan={plan}
          onClose={() => setIsAdjustingPlan(false)}
          onUpdateSuccess={() => getPlan()}
        />
      )}
    </>
  );
}

export default DefaultCategoryItem;
