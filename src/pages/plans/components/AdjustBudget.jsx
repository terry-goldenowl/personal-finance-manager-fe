import React, { useState } from "react";
import Modal from "../../../components/modal/Modal";
import Input from "../../../components/elements/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import handleAmountChange from "../../../utils/handleAmountChange";
import formatCurrency from "../../../utils/currencyFormatter";
import PlansService from "../../../services/plans";
import { toast } from "react-toastify";

function AdjustBudget({ onClose, plan, onUpdateSuccess }) {
  const [amount, setAmount] = useState();
  const [formattedBudget, setFormattedBudget] = useState();
  const [errors, setErrors] = useState(null);

  const handleBudgetChange = (event) => {
    handleAmountChange(
      event.target.value,
      setAmount,
      setFormattedBudget,
      setErrors
    );
  };

  const handleAdjustBudget = async () => {
    if (!errors) {
      let responseData;
      if (!plan.category_id) {
        responseData = await PlansService.updateMonthPlan(
          { ...plan, amount: amount },
          plan.id
        );
      } else {
        responseData = await PlansService.updateCategoryPlan(
          { ...plan, amount: amount },
          plan.id
        );
      }

      if (responseData.status === "success") {
        onClose();
        toast.success("Update plan successfully!");
        onUpdateSuccess();
      } else {
        toast.error("Something went wrong when update plan!");
      }
    }
  };

  return (
    <Modal
      title={"Adjust budget"}
      onClose={onClose}
      onAccept={handleAdjustBudget}
    >
      {plan.category_id && (
        <p className="text-2xl mb-3">
          {plan.category.name + " (" + plan.month + "/" + plan.year + ")"}
        </p>
      )}
      {!plan.category_id && (
        <p className="text-3xl mb-3">{plan.month + "/" + plan.year}</p>
      )}

      <div className="flex justify-between items-center gap-4">
        <Input
          label={"Current budget"}
          name={"current_amount"}
          type={"text"}
          value={formatCurrency(plan.amount)}
          disable={true}
        />
        <FontAwesomeIcon
          icon={faArrowRight}
          className="text-2xl text-purple-500"
        />
        <Input
          label={"New budget"}
          name={"amount"}
          type={"text"}
          onChange={handleBudgetChange}
          errors={errors}
          value={formattedBudget}
          style="text-purple-500"
        />
      </div>
    </Modal>
  );
}

export default AdjustBudget;
