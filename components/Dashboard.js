"use client";
import { useEffect, useState } from "react";
import DailyTimer from "./DailyTimer";
import { useSession } from "next-auth/react";
import TimeAdder from "./TimeAdder";
import Topbar from "./Topbar";
import Buckets from "./Buckets";

const Dashboard = ({ selectedDay }) => {
  const { data: session, status } = useSession();
  const [target, setTarget] = useState("");
  const [secondsToAdd, setSecondsToAdd] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState();
  const [bucketList, setBucketList] = useState([]);
  const [buttonSelected, setButtonSelected] = useState(false);

  useEffect(() => {
    if (session?.user?.email && selectedDay) {
      fetchBuckets();
    }
  }, [selectedDay]);

  useEffect(() => {
    let intervalId;

    if (buttonSelected && bucketList) {
      intervalId = setInterval(() => {
        handleAdd("tick");
      }, 1000); // Log every 1000 ms (1 second)
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [buttonSelected]);

  const fetchBuckets = async () => {
    const queryString = `email=${session?.user?.email}&date=${selectedDay}`;
    try {
      const response = await fetch(`/api/bucket?${queryString}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const { buckets } = await response.json();
        setBucketList(buckets);
        console.log(buckets);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = (type) => {
    if (target == "DailyTimer") {
      setSecondsRemaining(secondsRemaining + secondsToAdd);
    } else if (target.length > 20) {
      if (type == "tick") {
        setSecondsRemaining((secondsRemaining) => secondsRemaining - 1);
        updateBucketTime(target);
      } else {
        updateBucketTime(target, secondsToAdd);
      }
    }
  };

  const handleReduce = (type) => {
    if (target == "DailyTimer") {
      setSecondsRemaining(secondsRemaining - secondsToAdd);
    } else if (target.length > 20) {
      updateBucketTime(target, -secondsToAdd);
    }
  };

  const updateBucketTime = (bucketId, seconds = 1) => {
    setBucketList((prevBucketList) => {
      return prevBucketList.map((bucket) => {
        if (bucket._id == bucketId) {
          console.log(bucket._id == bucketId);
          let updatedBucket;
          if (Math.abs(seconds) > 1) {
            const newSecondsAllocated = bucket.secondsAllocated + seconds;
            if (newSecondsAllocated < 0) {
              return bucket;
            }
            updatedBucket = {
              ...bucket,
              secondsAllocated: newSecondsAllocated,
            };
          } else {
            const newSecondsCompleted = bucket.secondsCompleted + seconds;
            if (bucket.secondsCompleted + seconds > bucket.secondsAllocated) {
              return bucket;
            }
            console.log(newSecondsCompleted);
            updatedBucket = {
              ...bucket,
              secondsCompleted: newSecondsCompleted,
            };
          }
          console.log(updatedBucket);
          return updatedBucket;
        } else {
          return bucket;
        }
      });
    });
  };

  return (
    <div
      className="flex-3 w-3/4 bg-gray-300 p-4"
      onClick={(e) => {
        console.log("BG");
        setTarget("");
      }}
    >
      <Topbar />
      <TimeAdder
        setSecondsToAdd={setSecondsToAdd}
        handleAdd={handleAdd}
        handleReduce={handleReduce}
      />
      <DailyTimer
        selectedDay={selectedDay}
        secondsRemaining={secondsRemaining}
        setSecondsRemaining={setSecondsRemaining}
        secondsToAdd={secondsToAdd}
        target={target}
        setTarget={setTarget}
        buttonSelected={buttonSelected}
        setButtonSelected={setButtonSelected}
      />
      {bucketList && (
        <Buckets
          bucketList={bucketList}
          setBucketList={setBucketList}
          selectedDay={selectedDay}
          fetchBuckets={fetchBuckets}
          target={target}
          setTarget={setTarget}
        />
      )}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleTick();
        }}
      >
        HandleTick
      </button>
    </div>
  );
};

export default Dashboard;
