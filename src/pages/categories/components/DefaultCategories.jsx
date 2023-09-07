import React from "react";
import DefaultCategoryList from "./DefaultCategoryList";
import Loading from "../../../components/others/Loading";

function DefaultCategories({ categories, loading }) {
  return (
    <div className="border-r border-r-purple-400 py-3 w-3/5">
      <div className="mb-4 border-l-4 border-l-purple-500 ps-4 py-1 bg-purple-200">
        <h3 className="text-2xl">Default categories</h3>
      </div>

      <div className="mb-3">
        <h4 className="text-xl font-bold text-purple-500">Expenses</h4>

        {loading && <Loading />}
        {!loading && (
          <DefaultCategoryList
            categories={categories.filter(
              (category) => category.type === "expenses"
            )}
          />
        )}
      </div>
      <div>
        <h4 className="text-xl font-bold text-purple-500">Incomes</h4>

        {loading && <Loading />}
        {!loading && (
          <DefaultCategoryList
            categories={categories.filter(
              (category) => category.type === "incomes"
            )}
          />
        )}
      </div>
    </div>
  );
}

export default DefaultCategories;
