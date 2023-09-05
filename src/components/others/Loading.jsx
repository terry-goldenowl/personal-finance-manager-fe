import React from "react";
import { MoonLoader } from "react-spinners";

function Loading() {
  return (
    <div className="w-full py-6 flex flex-col justify-center items-center">
      <MoonLoader
        color="#A855F7"
        size={80}
        loading={true}
        aria-label="Loading..."
        speedMultiplier={0.7}
      />
      <p className="text-center mt-3 text-xl font-bold text-purple-500">
        Loading...
      </p>
    </div>
  );
}

export default Loading;
