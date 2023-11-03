"use client";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useState, useEffect } from "react";
import TodoList from "./TodoList";

const Calendar = ({ selectedDay, setSelectedDay }) => {
  return (
    <div className="flex-1 w-1/4 flex flex-col bg-gray-200 p-4">
      <div className="flex-col h-1/2 max-w-1/4 overflow-x-auto overflow-y-auto justify-center items-center bg-white rounded shadow">
        <DayPicker
          selectedDays={selectedDay}
          onDayClick={(day) => {
            setSelectedDay(day.toLocaleDateString());
          }}
        />
        <div className="flex justify-center items-center">
          {selectedDay && <p>Selected Date: {selectedDay}</p>}
        </div>
      </div>
      {selectedDay && <TodoList selectedDay={selectedDay} />}
    </div>
  );
};
export default Calendar;
