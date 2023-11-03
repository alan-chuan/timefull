"use client";

import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";
import { useState, useEffect } from "react";

export default function Home() {
  const [selectedDay, setSelectedDay] = useState();
  useEffect(() => {
    const today = new Date().toLocaleDateString();
    setSelectedDay(today);
  }, []);

  return (
    <main>
      <div className="flex h-screen">
        <Sidebar selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
        <Dashboard selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      </div>
    </main>
  );
}
