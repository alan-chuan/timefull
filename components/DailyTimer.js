"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const DailyTimer = ({
  selectedDay,
  secondsToAdd,
  secondsRemaining,
  setSecondsRemaining,
  handleReduce,
}) => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (selectedDay) {
      fetchTimeRemaining();
    }
  }, [selectedDay]);

  useEffect(() => {
    updateDailyTime(secondsRemaining);
  }, [secondsRemaining]);

  const fetchTimeRemaining = async () => {
    console.log(selectedDay);
    const data = { email: session?.user?.email, date: selectedDay };
    try {
      let response = await fetch(`/api/time`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const { secondsRemaining } = await response.json();
        console.log(secondsRemaining);
        setSecondsRemaining(secondsRemaining);
      }
      console.log("setting");
    } catch (error) {
      console.log(error);
    }
  };

  const updateDailyTime = async (secondsRemaining) => {
    const data = {
      email: session?.user?.email,
      date: selectedDay,
      secondsRemaining: secondsRemaining,
    };
    // setSecondsRemaining(secondsRemaining);
    const response = await fetch("/api/time", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  };
  return (
    secondsRemaining && (
      <div>
        <p>{secondsRemaining}</p>
        <button onClick={handleReduce}>Reduce</button>
      </div>
    )
  );
};

export default DailyTimer;
