import React from "react";

function SidebarItem({ name, image, link }) {
  return (
    <li className="bg-blue-50 py-3 px-7 rounded-2xl cursor-pointer">
      <a href={link}>
        <div className="flex flex-col items-center">
          <div className="rounded-full w-20 h-20 bg-blue-100 hover:bg-blue-200 p-5">
            <img
              src={image}
              alt=""
              className="w-full h-full hover:relative hover:scale-125 hover:rotate-3 transition-all"
            />
          </div>
          <p className="text-sm font-semibold text-center">{name}</p>
        </div>
      </a>
    </li>
  );
}

export default SidebarItem;
