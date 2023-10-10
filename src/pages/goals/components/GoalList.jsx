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
          <button
            className={statusType("not-started")}
            onClick={() => setStatus("not-started")}
          >
            Not started
          </button>
          <button
            className={statusType("in-progress")}
            onClick={() => setStatus("in-progress")}
          >
            In progress
          </button>
          <button
            className={statusType("finished")}
            onClick={() => setStatus("finished")}
          >
            Finished
          </button>
          <button
            className={statusType("not-completed")}
            onClick={() => setStatus("not-completed")}
          >
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
