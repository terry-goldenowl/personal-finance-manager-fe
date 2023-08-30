import { motion } from "framer-motion";
import React, { useState } from "react";

function DefaultCategoryItem({ category }) {
  const [isHover, setIsHover] = useState(false);

  return (
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
      {isHover && (
        <motion.div
          className="absolute -bottom-6 z-10"
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
    </div>
  );
}

export default DefaultCategoryItem;
