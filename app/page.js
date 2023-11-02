"use client";

import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";


export default function Home() {

  return (
    <main>
      <div className="flex h-screen">
        <Sidebar />
        <Dashboard />
      </div>
    </main>
  );
}
