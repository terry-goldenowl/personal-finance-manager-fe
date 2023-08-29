import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import React, { useState } from "react";

function IconButton({ icon, onClick }) {
  const [isHover, setIsHover] = useState(false);
  return (
    <motion.button
      className="flex items-center justify-center bg-white rounded-full w-10 h-10 shadow-md"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      whileHover={{ scale: 1.2, rotate: -10 }}
      onClick={onClick}
    >
      <FontAwesomeIcon
        icon={icon}
        className={isHover ? "text-blue-600" : "text-gray-600"}
      />
    </motion.button>
  );
}

export default IconButton;
