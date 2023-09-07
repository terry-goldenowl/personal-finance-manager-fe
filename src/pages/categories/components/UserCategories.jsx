import React from "react";
import UserCategoryList from "./UserCategoryList";
import Loading from "../../../components/others/Loading";

function UserCategories({ categories, onUpdateSuccess, loading }) {
  return (
    <div className="w-2/5 py-3">
      <div className="mb-4 border-l-4 border-l-blue-500 ps-4 py-1 bg-blue-200">
        <h3 className="text-2xl">Your categories</h3>
      </div>

      <div className="mb-3">
        <h4 className="text-xl font-bold text-blue-500">Expenses</h4>

        {loading && <Loading />}
        {!loading && (
          <UserCategoryList
            categories={categories.filter(
              (category) => category.type === "expenses"
            )}
            onUpdateSuccess={onUpdateSuccess}
          />
        )}
      </div>
      <div>
        <h4 className="text-xl font-bold text-blue-500">Incomes</h4>

        {loading && <Loading />}
        {!loading && (
          <UserCategoryList
            categories={categories.filter(
              (category) => category.type === "incomes"
            )}
            onUpdateSuccess={onUpdateSuccess}
          />
        )}
      </div>
    </div>
  );
}

export default UserCategories;
