import React from "react";
import people from "../../assets/images/people.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function NotAllowed() {
  const roles = useSelector((state) => state.auth.roles);
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="mb-6">
        <img src={people} alt="" className="h-60" />
      </div>
      <p className="text-2xl mb-3 text-center">
        You are not allowed to perform this action!
      </p>
      <div>
        <button className="py-1 px-4 bg-purple-500 hover:bg-purple-600 text-white rounded-xl">
          <Link to={roles.includes("admin") ? "/admin" : "/transactions"}>
            Back to home
          </Link>
        </button>
      </div>
    </div>
  );
}

export default NotAllowed;
