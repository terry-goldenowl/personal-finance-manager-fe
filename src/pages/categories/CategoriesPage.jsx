import React, { useEffect, useState } from "react";
import CategoriesService from "../../services/categories";
import DefaultCategories from "./components/DefaultCategories";
import UserCategories from "./components/UserCategories";
import AddCategories from "./components/AddCategories";
import { toast } from "react-toastify";

function CategoriesPage() {
  const [defaultCategories, setDefaultCategories] = useState([]);
  const [userCategories, setUserCategories] = useState([]);
  const [isAddingCategory, setisAddingCategory] = useState(false);

  const getDefaultCategories = async () => {
    const data = await CategoriesService.getCategories({
      default: true,
    });

    setDefaultCategories(data.data.categories);
  };
  const getUserCategories = async () => {
    const data = await CategoriesService.getCategories({
      default: false,
    });

    setUserCategories(data.data.categories);
  };

  useEffect(() => {
    getDefaultCategories();
    getUserCategories();
  }, []);

  const handleUpdateSuccess = async (action) => {
    setisAddingCategory(false);
    getUserCategories();

    toast.success("Category is " + action + "d successfully", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 4000,
    });
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex justify-between">
        <div className="flex gap-4">
          <h2 className="text-4xl">Categories</h2>
        </div>
        <div
          className="flex border-2 border-purple-500 rounded-2xl relative"
          id="add-transactions-container"
        >
          <button
            className="py-2 text-center rounded-xl font-semibold bg-purple-500 text-white px-8 hover:bg-purple-600"
            id="add-expense-btn"
            onClick={() => setisAddingCategory(true)}
          >
            Create new categories
          </button>
        </div>
      </div>

      <div className="flex gap-8">
        {/* DEFAULT CATEGORIES */}
        <DefaultCategories categories={defaultCategories} />

        {/* USER'S CATEGORIES */}
        {userCategories && (
          <UserCategories
            categories={userCategories}
            onUpdateSuccess={handleUpdateSuccess}
          />
        )}
      </div>

      {isAddingCategory && (
        <AddCategories
          onClose={() => setisAddingCategory(false)}
          onAddSuccess={handleUpdateSuccess}
        />
      )}
    </div>
  );
}

export default CategoriesPage;
