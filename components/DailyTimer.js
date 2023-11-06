"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const DailyTimer = ({
  selectedDay,
  secondsRemaining,
  setSecondsRemaining,
  target,
  setTarget,
  buttonSelected,
  setButtonSelected,
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
  const selected = ` ${
    target == "DailyTimer" ? "bg-blue-400 animate-pulse" : "bg-gray-200"
  }`;

  const buttonStyle = ` ${
    buttonSelected ? "bg-blue-400 animate-pulse" : "bg-gray-200"
  }`;

  // hidden if target is bucket (id length > 20)
  const hidden = `${target.length > 20 ? "" : "hidden"}`;

  return (
    secondsRemaining && (
      <div
        className={`bg-white rounded-lg shadow-md p-4 cursor-pointer py-2 px-4 m-2 text-center ${selected}`}
        onClick={(e) => {
          e.stopPropagation();
          setTarget("DailyTimer");
        }}
      >
        <p>{secondsRemaining}</p>
        <button
          className={`bg-white rounded-lg shadow-md p-4 cursor-pointer py-2 px-4 m-2 ${buttonStyle} ${hidden}`}
          onClick={(e) => {
            setButtonSelected(!buttonSelected);
            e.stopPropagation();
          }}
        >
          Start
        </button>
      </div>
    )
  );
};

export default DailyTimer;
