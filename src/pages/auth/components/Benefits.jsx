import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function Benefits({ setShownBenefits }) {
  const benefits = [
    "Income and Expense Tracking",
    "Expense Categorizations",
    "Expense Planing",
    "Financial Goal Setting",
    "Financial Analysis",
    "Debt and Loan Management",
  ];

  return (
    <div>
      <h2 className="text-purple-500 text-3xl text-center">Benefits</h2>
      <div className="grid grid-cols-2 grid-flow-row gap-3 mt-4">
        {benefits.map((benefit) => (
          <div
            className="p-3 bg-purple-200 rounded-xl text-xl text-center flex justify-center items-center hover:bg-purple-300"
            key={Math.random()}
          >
            {benefit}
          </div>
        ))}
      </div>
      <button
        className="bg-purple-600 text-white py-2 w-full rounded-lg mt-12 text-xl hover:bg-purple-700"
        onClick={() => setShownBenefits(false)}
      >
        <FontAwesomeIcon icon={faArrowLeft} className="me-3" />
        <span>Back</span>
      </button>
    </div>
  );
}

export default Benefits;
