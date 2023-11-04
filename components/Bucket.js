"use client";

const Bucket = ({ title, secondsCompleted, secondsAllocated }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
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
