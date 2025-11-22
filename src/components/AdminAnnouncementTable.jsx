"use client";

import React from "react";
import { Plus, Trash2, Pencil } from "lucide-react";
import { ADMINCOLORS } from "../constant";

// ---------- DUMMY DATA ----------
const dummyAnnouncements = [
  {
    _id: "1",
    title: "Account Verification",
    message: "Verify your KYC",
    type: "danger",
    isActive: true,
    createdAt: "2025-01-12",
  },
  {
    _id: "1",
    title: "Account Verification",
    message: "Verify your KYC",
    type: "Banner",
    isActive: true,
    createdAt: "2025-01-12",
  },
  {
    _id: "2",
    title: "UPI Payment Enabled",
    message: "UPI is live",
    type: "success",
    isActive: true,
    createdAt: "2025-01-10",
  },
];

export default function AdminAnnouncementTable({ onCreate, onEdit }) {
  return (
    <div
      className="rounded-xl p-6"
      style={{
        background: ADMINCOLORS.card,
        border: `1px solid ${ADMINCOLORS.border}`,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1
          className="text-xl font-semibold"
          style={{ color: ADMINCOLORS.foreground }}
        >
          Announcements
        </h1>

        <button
          onClick={onCreate}
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold cursor-pointer"
          style={{ background: ADMINCOLORS.primary, color: "#000" }}
        >
          <Plus size={18} /> Create Announcement
        </button>
      </div>

      {/* Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr style={{ background: ADMINCOLORS.accent }}>
            <th className="p-3 text-left text-white">Title</th>
            <th className="p-3 text-left text-white">Type</th>
            <th className="p-3 text-left text-white">Status</th>
            <th className="p-3 text-left text-white">Created</th>
            <th className="p-3 text-left text-white">Actions</th>
          </tr>
        </thead>

        <tbody>
          {dummyAnnouncements.map((a, idx) => (
            <tr
              key={a._id}
              className="border-b"
              style={{
                borderColor: ADMINCOLORS.border,
                background:
                  idx % 2 === 0
                    ? ADMINCOLORS.rowEven
                    : ADMINCOLORS.rowOdd,
              }}
            >
              <td className="p-3 text-white">{a.title}</td>
              <td className="p-3">
                <span
                  className="px-3 py-1 rounded-full text-sm font-semibold"
                  style={{
                    background:
                      a.type === "success"
                        ? "#10B98133"
                        : a.type === "danger"
                        ? "#EF444433"
                        : "#FBBF2433",
                    color:
                      a.type === "success"
                        ? "#10B981"
                        : a.type === "danger"
                        ? "#EF4444"
                        : "#FBBF24",
                  }}
                >
                  {a.type}
                </span>
              </td>

              <td className="p-3 text-white">
                {a.isActive ? "Active" : "Inactive"}
              </td>

              <td className="p-3 text-gray-400">
                {new Date(a.createdAt).toLocaleDateString()}
              </td>

              <td className="p-3 flex items-center gap-4">
                {/* EDIT */}
                <button
                  className="text-blue-400 hover:text-blue-300"
                  onClick={() => onEdit(a)} // << SEND DATA TO BUILDER
                >
                  <Pencil size={18} />
                </button>

                {/* DELETE */}
                <button className="text-red-400 hover:text-red-300">
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
