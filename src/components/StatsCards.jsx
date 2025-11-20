'use client';

import React from "react";
import { TrendingUp, Users, IndianRupee, CreditCard } from "lucide-react";
import { Card } from "../components/Card";
import { ADMINCOLORS, hexToRgba } from "../constant";
import { useStats } from "../hooks/auth/AdminMutation";  // <-- your stats hook

export function StatsCards() {
  const { data: stats, isLoading, isError } = useStats();

  // Loading State – simple, clean skeleton
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="p-6 animate-pulse">
            <div className="h-6 w-6 mb-4 rounded bg-gray-700" />
            <div className="h-3 w-24 mb-3 rounded bg-gray-700" />
            <div className="h-6 w-32 rounded bg-gray-700" />
          </Card>
        ))}
      </div>
    );
  }

  if (isError || !stats) {
    return (
      <p className="text-center text-red-500">Failed to load stats</p>
    );
  }

  // Format numbers + INR sign
  const formatINR = (num) =>
    `₹${Number(num || 0).toLocaleString("en-IN")}`;

  const cards = [
    {
      title: "Total Withdrawals",
      value: formatINR(stats.totalWithdrawals),
      icon: <IndianRupee className="w-6 h-6" />,
    },
    {
      title: "Active Users",
      value: stats.activeUsers,
      icon: <Users className="w-6 h-6" />,
    },
    {
      title: "Pending Requests",
      value: stats.pendingRequests,
      icon: <CreditCard className="w-6 h-6" />,
    },
    {
      title: "Payments Processed",
      value: formatINR(stats.paymentsProcessed),
      icon: <TrendingUp className="w-6 h-6" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((stat, i) => (
        <Card key={i} className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div
              style={{
                padding: 10,
                borderRadius: 8,
                backgroundColor: hexToRgba(ADMINCOLORS.accent, 0.12),
                color: ADMINCOLORS.accent,
              }}
            >
              {React.cloneElement(stat.icon, {
                style: { color: ADMINCOLORS.primary, width: 20, height: 20 },
              })}
            </div>
          </div>

          <h3
            className="text-sm font-medium"
            style={{ color: ADMINCOLORS.muted, marginBottom: 6 }}
          >
            {stat.title}
          </h3>

          <p
            className="text-2xl font-bold"
            style={{ color: ADMINCOLORS.foreground }}
          >
            {stat.value}
          </p>
        </Card>
      ))}
    </div>
  );
}
