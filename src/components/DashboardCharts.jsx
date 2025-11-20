"use client";

import React from "react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

import { Card } from "../components/Card";
import { ADMINCOLORS, hexToRgba } from "../constant";
import { useAnalytics } from "../hooks/auth/AdminMutation"; // <= using API

export function DashboardCharts() {
  const { data, isLoading } = useAnalytics();

  const withdrawalData = data?.withdrawalData || [];
  const usersData = data?.usersData || [];
  const paymentsData = data?.paymentsData || [];
  const recentTransactions = data?.recentTransactions || [];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="p-6 animate-pulse h-[320px] bg-opacity-20" 
            style={{ background: ADMINCOLORS.card, border: `1px solid ${ADMINCOLORS.border}` }}>
            <div className="h-full w-full bg-gray-700 rounded-lg opacity-30"></div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* ================= WITHDRAWAL TRENDS ================= */}
      <Card className="p-6">
        <h3 style={{ color: ADMINCOLORS.foreground, fontSize: 18, fontWeight: 600, marginBottom: 12 }}>
          Withdrawal Trends
        </h3>

        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={withdrawalData}>
              <CartesianGrid strokeDasharray="3 3" stroke={hexToRgba(ADMINCOLORS.border, 0.5)} />
              <XAxis dataKey="month" stroke={ADMINCOLORS.muted} />
              <YAxis stroke={ADMINCOLORS.muted} />
              <Tooltip
                contentStyle={{
                  backgroundColor: ADMINCOLORS.card,
                  border: `1px solid ${ADMINCOLORS.border}`,
                  color: ADMINCOLORS.foreground,
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="amount" stroke={ADMINCOLORS.accent} strokeWidth={2} name="Amount (₹)" />
              <Line type="monotone" dataKey="count" stroke={ADMINCOLORS.primary} strokeWidth={2} name="Requests" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* ================= USERS GROWTH ================= */}
      <Card className="p-6">
        <h3 style={{ color: ADMINCOLORS.foreground, fontSize: 18, fontWeight: 600, marginBottom: 12 }}>
          User Growth
        </h3>

        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={usersData}>
              <CartesianGrid strokeDasharray="3 3" stroke={hexToRgba(ADMINCOLORS.border, 0.5)} />
              <XAxis dataKey="month" stroke={ADMINCOLORS.muted} />
              <YAxis stroke={ADMINCOLORS.muted} />
              <Tooltip contentStyle={{ backgroundColor: ADMINCOLORS.card, border: `1px solid ${ADMINCOLORS.border}` }} />
              <Legend />
              <Bar dataKey="new" fill={ADMINCOLORS.accent} name="New Users" />
              <Bar dataKey="active" fill={ADMINCOLORS.primary} name="Active Users" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* ================= PAYMENT STATUS PIE ================= */}
      <Card className="p-6">
        <h3 style={{ color: ADMINCOLORS.foreground, fontSize: 18, fontWeight: 600, marginBottom: 12 }}>
          Payment Status Distribution
        </h3>

        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={paymentsData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
                dataKey="value"
              >
                {paymentsData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>

              <Tooltip
              className="text-white"
                contentStyle={{
                  backgroundColor: ADMINCOLORS.card,
                  border: `1px solid ${ADMINCOLORS.border}`,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* ================= RECENT TRANSACTIONS ================= */}
      <Card className="p-6">
        <h3 style={{ color: ADMINCOLORS.foreground, fontSize: 18, fontWeight: 600, marginBottom: 12 }}>
          Recent Payments
        </h3>

        <div className="space-y-4">
          {recentTransactions.length === 0 && (
            <p style={{ color: ADMINCOLORS.muted }}>No recent payments</p>
          )}

          {recentTransactions.map((payment, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-lg"
              style={{ backgroundColor: hexToRgba(ADMINCOLORS.muted, 0.06) }}
            >
              <div>
                <p style={{ color: ADMINCOLORS.foreground, fontWeight: 600 }} className="text-white">{payment.userId?.email}</p>
                <p style={{ color: ADMINCOLORS.muted, fontSize: 12 }} className="text-white">{payment.createdAt}</p>
              </div>

              <div className="text-right">
                <p style={{ color: ADMINCOLORS.foreground, fontWeight: 700 }}>₹{payment.amount}</p>
                <p
                  style={{
                    color:
                      payment.status === "Completed"
                        ? "#10B981"
                        : payment.status === "Failed"
                        ? "#EF4444"
                        : "#F59E0B",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  {payment.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
