'use client';

import React from "react";
import { StatsCards } from "../../components/StatsCards";
import { DashboardCharts } from "../../components/DashboardCharts";
import { ADMINCOLORS } from "../../constant";
export default function Dashboard() {
  return (
    <main
      style={{
        flex: 1,
        height: "100%",
        width: "100%",
        overflow: "auto",
       
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1400,
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: 24, marginTop: 0 }}>
          <h1
            
            className="text-5xl font-medium text-[#1E1E1E]"
          >
            Dashboard
          </h1>

          <p style={{ color: ADMINCOLORS.muted, marginTop: 6 }}>
            Overview of your admin metrics and activities
          </p>
        </div>

        {/* Stats + Charts */}
        <StatsCards />
        <DashboardCharts />
      </div>
    </main>
  );
}
