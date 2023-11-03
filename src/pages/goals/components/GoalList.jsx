import React from "react";
import GoalItem from "./GoalItem";
import Loading from "../../../components/others/Loading";

function GoalList({ goals, status, setStatus, onUpdateSuccess, loading }) {
  const statusType = (_status) => {
    return (
      "py-2 px-2 sm:px-8 border-b-4 sm:text-md text-sm whitespace-nowrap " +
      (status === _status
        ? "border-b-purple-500 text-purple-600 font-semibold bg-purple-100 "
        : "border-b-purple-200 hover:font-semibold hover:border-b-purple-300")
    );
  };

  return (
    <div>
      <div className="mb-4">
        <div className="flex border-b border-b-purple-200 lg:justify-start justify-center">
          <button className={statusType(1)} onClick={() => setStatus(1)}>
            Not started
          </button>
          <button className={statusType(2)} onClick={() => setStatus(2)}>
            In progress
          </button>
          <button className={statusType(3)} onClick={() => setStatus(3)}>
            Finished
          </button>
          <button className={statusType(4)} onClick={() => setStatus(4)}>
            Not completed
          </button>
        </div>
      </div>
      <div className="">
        {!loading && goals.length > 0 && (
          <div className="grid xl:grid-cols-2 gap-4 grid-cols-1">
            {goals.map((goal) => (
              <GoalItem
                goal={goal}
                key={goal.id}
                status={status}
                onUpdateSuccess={onUpdateSuccess}
              />
            ))}
          </div>
        )}
        {!loading && goals.length === 0 && (
          <p className="text-center text-xl mt-8 text-gray-500">
            No goals found!
          </p>
        )}
        {loading && <Loading />}
      </div>
    </div>
  );
}

export default GoalList;
