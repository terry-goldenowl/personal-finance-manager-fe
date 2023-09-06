import React, { useEffect, useState } from "react";
import formatCurrency from "../../../utils/currencyFormatter";
import { motion } from "framer-motion";
import ReportsService from "../../../services/reports";
import IconButton from "../../../components/elements/IconButton";
import { faRemove, faTrash } from "@fortawesome/free-solid-svg-icons";
import ConfirmDeleteModal from "../../../components/modal/ConfirmDeleteModal";
import PlansService from "../../../services/plans";
import { toast } from "react-toastify";

function CategoryPlanItem({ categoryPlan, onUpdateSuccess }) {
  const [isHovering, setIsHovering] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (categoryPlan.currentTotal) {
      setPercentage((categoryPlan.currentTotal / categoryPlan.amount) * 100);
    }
  }, [categoryPlan]);

  const handleClickDelete = () => {
    setIsDeleting(true);
    setIsHovering(false);
  };

  const handleDelete = async () => {
    const responseData = await PlansService.deleteCategoryPlan(categoryPlan.id);

    if (responseData.status === "success") {
      toast.success("Delete category plan successfully!");
      setIsDeleting(false);
      onUpdateSuccess();
    } else {
      toast.error("Some thing went wrong when delete category plan!");
    }
  };

  return (
    <>
      <div
        className="flex gap-3 items-center mb-1 py-1 px-4 rounded-xl hover:bg-white hover:bg-opacity-80 relative"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden">
          <img
            src={process.env.REACT_APP_API_HOST + categoryPlan.category.image}
            alt=""
            className="object-cover"
          />
        </div>
        <div className="w-1/4 overflow-hidden">
          <p className={isHovering ? "font-bold" : ""}>
            {categoryPlan.category.name}
          </p>
        </div>
        <div className="h-2 bg-blue-50 rounded-full grow shadow-sm overflow-hidden">
          <div
            className="h-full bg-blue-700 rounded-full"
            style={{
              width: percentage > 100 ? 100 : percentage + "%",
            }}
          ></div>
        </div>
        <div className="w-10">
          <p className="text-lg text-orange-500 font-bold">
            {Math.round(percentage) + "%"}
          </p>
        </div>
        {isHovering && (
          <motion.div
            initial={{ translateY: 0, opacity: 0 }}
            animate={{ translateY: 10, opacity: 1 }}
            transition={{ type: "spring" }}
            className="absolute bg-white px-6 py-3 rounded-xl bottom-12 right-36 shadow-md w-60"
          >
            <div className="flex justify-between mb-1">
              <p>Plan: </p>
              <p className="font-bold">
                {formatCurrency(categoryPlan.amount)}
              </p>{" "}
            </div>
            <div className="flex justify-between mb-1">
              <p>Actual: </p>

              <p className="font-bold">
                {formatCurrency(categoryPlan.currentTotal)}
              </p>
            </div>
            <hr className="h-0.5 bg-gray-300 mb-2" />
            <div className="flex justify-between mb-1">
              <p>Remaining: </p>

              <p className="font-bold text-blue-600">
                {formatCurrency(
                  categoryPlan.amount - categoryPlan.currentTotal
                )}
              </p>
            </div>
            <div className="flex justify-end">
              <IconButton icon={faTrash} onClick={handleClickDelete} />
            </div>
          </motion.div>
        )}
      </div>
      {isDeleting && (
        <ConfirmDeleteModal
          message={
            "Are you sure to delete this category plan? This action can no be undone!"
          }
          onAccept={handleDelete}
          onClose={() => setIsDeleting(false)}
        />
      )}
    </>
  );
}

export default CategoryPlanItem;
