"use client";
import { useEffect, useState } from "react";
import DailyTimer from "./DailyTimer";
import { useSession } from "next-auth/react";
import TimeAdder from "./TimeAdder";
import Topbar from "./Topbar";

const Dashboard = ({ selectedDay }) => {
  const { data: session, status } = useSession();
  const [target, setTarget] = useState("DailyTimer");
  const [secondsToAdd, setSecondsToAdd] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState();
  const [buckets, setBuckets] = useState([]);
  
  const handleAdd = () => {
    if (target == "DailyTimer") {
      setSecondsRemaining(secondsRemaining + secondsToAdd);
    }
  };

  const handleReduce = () => {
    setSecondsRemaining(secondsRemaining - 1);
  };

  return (
    <div className="flex-3 w-3/4 bg-gray-300 p-4">
      <Topbar />
      <TimeAdder setSecondsToAdd={setSecondsToAdd} handleAdd={handleAdd} />
      <DailyTimer
        selectedDay={selectedDay}
        secondsRemaining={secondsRemaining}
        setSecondsRemaining={setSecondsRemaining}
        secondsToAdd={secondsToAdd}
        handleReduce={handleReduce}
        target={target}
      />
    </div>
  );
};

export default Dashboard;
