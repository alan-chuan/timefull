"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Bucket from "./Bucket";

const Buckets = ({
  selectedDay,
  bucketList,
  setBucketList,
  fetchBuckets,
  target,
  setTarget,
}) => {
  const { data: session, status } = useSession();
  const [input, setInput] = useState("");

  const addNewBucket = async () => {
    const newBucket = {
      email: session?.user?.email,
      date: selectedDay,
      title: input,
    };
    try {
      const response = await fetch("/api/bucket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBucket),
      });
    } catch (error) {
      console.log(error);
    }
    fetchBuckets();
    setBucketList([...bucketList, newBucket]);
    setInput("");
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Add a bucket"
          className="border p-2 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="ml-2 bg-blue-500 text-white p-2 rounded"
          onClick={() => {
            addNewBucket();
          }}
        >
          Add
        </button>
      </div>
      <div>
        {bucketList &&
          bucketList.map((bucket) => (
            <Bucket
              key={bucket._id}
              id={bucket._id}
              title={bucket.title}
              secondsCompleted={bucket.secondsCompleted}
              secondsAllocated={bucket.secondsAllocated}
              target={target}
              setTarget={setTarget}
            />
          ))}
      </div>
    </div>
  );
};
export default Buckets;
