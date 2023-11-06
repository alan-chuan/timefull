"use client";
import { useEffect } from "react";
import React, { useState } from "react";

function TimeAdder({ setSecondsToAdd, handleAdd, handleReduce }) {
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
    <div className="flex flex-col">
      <div className="flex flex-row justify-center space-y-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              decrementHour();
            }}
            className="px-2 py-1 rounded bg-blue-500 text-white"
          >
            -
          </button>
          <span className="text-2xl font-bold">{hourOptions[hourIndex]}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              incrementHour();
            }}
            className="px-2 py-1 rounded bg-blue-500 text-white"
          >
            +
          </button>
          <span className="text-lg">hours</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              decrementMinute();
            }}
            className="px-2 py-1 rounded bg-blue-500 text-white"
          >
            -
          </button>
          <span className="text-2xl font-bold">
            {minuteOptions[minuteIndex]}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              incrementMinute();
            }}
            className="px-2 py-1 rounded bg-blue-500 text-white"
          >
            +
          </button>
          <span className="text-lg">minutes</span>
        </div>
      </div>
      <div className="flex flex-row justify-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleAdd();
          }}
          className="px-2 py-1 rounded bg-blue-500 text-white"
        >
          ADD
        </button>
        <button
          className="px-2 py-1 rounded bg-blue-500 text-white"
          onClick={(e) => {
            e.stopPropagation();
            handleReduce();
          }}
        >
          REDUCE
        </button>
      </div>
    </div>
  );
}

export default TimeAdder;
