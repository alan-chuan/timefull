"use client";

import { useEffect } from "react";

const Bucket = ({
  id,
  title,
  secondsCompleted,
  secondsAllocated,
  target,
  setTarget,
}) => {
  const bucketStyle = `py-2 px-4 m-2 text-center  ${
    target == id ? "bg-blue-400 animate-pulse" : "bg-gray-200"
  }`;

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-4 cursor-pointer ${bucketStyle}`}
      onClick={() => {
        setTarget(id);
      }}
    >
      <h2 className="text-xl font-semibold mb-2">{name}</h2>
      <div className="flex justify-between">
        <p>{title}</p>
        <p>Completed: {secondsCompleted} seconds</p>
        <p>Allocated: {secondsAllocated} seconds</p>
      </div>
    </div>
  );
};

export default Bucket;
