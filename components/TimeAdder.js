"use client";
import { useEffect } from "react";
import React, { useState } from "react";

function TimeAdder({ setSecondsToAdd, handleAdd }) {
  const hourOptions = [0, 1, 2, 3, 4, 5];
  const minuteOptions = [0, 5, 10, 15, 30];
  const [hourIndex, setHourIndex] = useState(0);
  const [minuteIndex, setMinuteIndex] = useState(0);

  useEffect(() => {
    let secondsToAdd =
      hourOptions[hourIndex] * 60 * 60 + minuteOptions[minuteIndex] * 60;
    setSecondsToAdd(secondsToAdd);
  }, [hourIndex, minuteIndex]);

  const incrementHour = () => {
    setHourIndex((hourIndex + 1) % hourOptions.length);
    console.log(hourIndex);
  };

  const decrementHour = () => {
    setHourIndex((hourIndex - 1 + hourOptions.length) % hourOptions.length);
  };

  const incrementMinute = () => {
    setMinuteIndex((minuteIndex + 1) % minuteOptions.length);
  };

  const decrementMinute = () => {
    setMinuteIndex(
      (minuteIndex - 1 + minuteOptions.length) % minuteOptions.length
    );
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-2">
        <button
          onClick={decrementHour}
          className="px-2 py-1 rounded bg-blue-500 text-white"
        >
          -
        </button>
        <span className="text-2xl font-bold">{hourOptions[hourIndex]}</span>
        <button
          onClick={incrementHour}
          className="px-2 py-1 rounded bg-blue-500 text-white"
        >
          +
        </button>
        <span className="text-lg">hours</span>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={decrementMinute}
          className="px-2 py-1 rounded bg-blue-500 text-white"
        >
          -
        </button>
        <span className="text-2xl font-bold">{minuteOptions[minuteIndex]}</span>
        <button
          onClick={incrementMinute}
          className="px-2 py-1 rounded bg-blue-500 text-white"
        >
          +
        </button>
        <span className="text-lg">minutes</span>
      </div>
      <button
        onClick={handleAdd}
        className="px-2 py-1 rounded bg-blue-500 text-white"
      >
        ADD
      </button>
    </div>
  );
}

export default TimeAdder;
