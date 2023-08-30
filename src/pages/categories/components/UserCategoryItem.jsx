import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import React, { useState } from "react";
import IconButton from "../../../components/elements/IconButton";
import AddCategories from "./AddCategories";
import ConfirmDeleteModal from "../../../components/modal/ConfirmDeleteModal";
import CategoriesService from "../../../services/categories";

function UserCategoryItem({ category, onUpdateSuccess }) {
  const [isHover, setIsHover] = useState(false);
  const [isUpdatingCategory, setisUpdatingCategory] = useState(false);
  const [isDeletingCategory, setisDeletingCategory] = useState(false);

  const handleDeleteCategory = async () => {
    // Send request
    const data = await CategoriesService.deleteCategory(category.id);
    if (data.status === "success") {
      setisDeletingCategory(false);
      onUpdateSuccess("delete");
    }
  };

  return (
    <div
      className="mb-2 p-2 bg-blue-200 rounded-xl bg-gradient-to-r from-blue-300 to-white flex gap-3"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="w-16 h-16 overflow-hidden rounded-md shadow-sm">
        <img
          src={process.env.REACT_APP_API_HOST + category.image}
          alt=""
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex items-center">
        <p className="text-md font-semibold">{category.name}</p>
      </div>

      <div className="flex justify-end grow items-center gap-1">
        {isHover && (
          <motion.div
            initial={{ rotate: -90, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{
              type: "spring",
            }}
          >
            <button className="bg-blue-600 text-white py-1 px-4 rounded-xl shadow-sm shadow-blue-300 text-sm">
              Set plan this month
            </button>
          </motion.div>
        )}
        <IconButton
          icon={faPen}
          onClick={() => {
            setisUpdatingCategory(true);
            setIsHover(false);
          }}
        />
        <IconButton
          icon={faTrash}
          onClick={() => {
            setisDeletingCategory(true);
            setIsHover(false);
          }}
        />
      </div>

      {isUpdatingCategory && (
        <AddCategories
          onClose={() => setisUpdatingCategory(false)}
          onAddSuccess={(action) => {
            onUpdateSuccess(action);
            setisUpdatingCategory(false);
          }}
          category={category}
        />
      )}
      {isDeletingCategory && (
        <ConfirmDeleteModal
          message={
            "Deleting this cateogry will also delete all transactions belongs to it! Are you sure to delete this category?"
          }
          onAccept={handleDeleteCategory}
          onClose={() => setisDeletingCategory(false)}
        />
      )}
    </div>
  );
}

export default UserCategoryItem;
