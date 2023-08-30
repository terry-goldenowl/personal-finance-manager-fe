import React from "react";
import DefaultCategoryItem from "./DefaultCategoryItem";

function DefaultCategoryList({ categories }) {
  return (
    <div className="grid grid-cols-4 gap-x-2 gap-y-4 p-3">
      {categories &&
        categories.map((category) => (
          <DefaultCategoryItem category={category} key={category.id} />
        ))}
    </div>
  );
}

export default DefaultCategoryList;
