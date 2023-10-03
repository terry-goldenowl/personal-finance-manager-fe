import React from "react";
import UserCategoryList from "./UserCategoryList";
import Loading from "../../../components/others/Loading";

function UserCategories({ categories, onUpdateSuccess, loading }) {
  return (
    <div className="lg:w-2/5 w-full py-3">
      <div className="mb-4 border-l-8 border-l-blue-500 ps-4 py-1 bg-blue-200 rounded-lg">
        <h3 className="text-2xl">Your categories</h3>
      </div>

      <div className="mb-3">
        <h4 className="text-xl font-bold text-blue-500">Expenses</h4>

        {loading && <Loading />}
        {!loading &&
          categories.filter((category) => category.type === "expenses").length >
            0 && (
            <UserCategoryList
              categories={categories.filter(
                (category) => category.type === "expenses"
              )}
              onUpdateSuccess={onUpdateSuccess}
            />
          )}
        {!loading &&
          categories.filter((category) => category.type === "expenses")
            .length === 0 && (
            <p className="text-md text-gray-600 text-center py-3">
              You didn&apos;t create any category!
            </p>
          )}
      </div>
      <div>
        <h4 className="text-xl font-bold text-blue-500">Incomes</h4>

        {loading && <Loading />}
        {!loading &&
          categories.filter((category) => category.type === "incomes").length >
            0 && (
            <UserCategoryList
              categories={categories.filter(
                (category) => category.type === "incomes"
              )}
              onUpdateSuccess={onUpdateSuccess}
            />
          )}
        {!loading &&
          categories.filter((category) => category.type === "incomes")
            .length === 0 && (
            <p className="text-md text-gray-600 text-center py-3">
              You didn&apos;t create any category!
            </p>
          )}
      </div>
    </div>
  );
}

export default UserCategories;
