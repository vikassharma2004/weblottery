"use client";

import React, { useState } from "react";
import { Plus, Trash2, Pencil } from "lucide-react";
import { ADMINCOLORS } from "../constant";
import {
  useAnnouncements,
  useDeleteAnnouncement,
} from "../hooks/auth/AdminMutation";
import SkeletonRow from "./SkeletonRow";

export default function AdminAnnouncementTable({ onCreate, onEdit }) {
  const [filter, setFilter] = useState("inactive");
  const deleteAnnouncement = useDeleteAnnouncement();
  const { data, isLoading } = useAnnouncements(filter);
  const announcemnts = data?.announcements;

  return (
    <div
      className="rounded-xl p-6"
      style={{
        background: ADMINCOLORS.card,
        border: `1px solid ${ADMINCOLORS.border}`,
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {/* Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 rounded-lg"
            style={{
              background: ADMINCOLORS.accent,
              color: "white",
            }}
          >
            <option value="active">Active</option>
            <option value="inactive">InActive</option>
            <option value="all">All</option>
          </select>

          <button
            onClick={onCreate}
            className="flex items-center gap-2 px-4 py-1 rounded-lg font-semibold cursor-pointer"
            style={{ background: ADMINCOLORS.primary, color: "#000" }}
          >
            <Plus size={20} /> create
          </button>
        </div>
      </div>

      {/* Table Wrapper — FIXED OVERFLOW HERE */}
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse min-w-max">
          <thead>
            <tr style={{ background:ADMINCOLORS.rowHighlight,border:ADMINCOLORS.rowHighlightBorder }}>
              <th className="p-3 text-left text-white">Title</th>
              <th className="p-3 text-left text-white">Type</th>
              <th className="p-3 text-left text-white">Status</th>
              <th className="p-3 text-left text-white">Created</th>
              <th className="p-3 text-left text-white">Actions</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
             <>
               <SkeletonRow/>
               <SkeletonRow/>
               <SkeletonRow/>
               </>
            ) : announcemnts?.length === 0 ? (
              <tr>
                <td className="p-5 text-center text-gray-400" colSpan={5}>
                  No announcements found
                </td>
              </tr>
            ) : (
              announcemnts?.map((a, idx) => (
                <tr
                  key={a._id}
                  className="border-b"
                  style={{
                    borderColor: ADMINCOLORS.border,
                    background:
                      idx % 2 === 0 ? ADMINCOLORS.rowEven : ADMINCOLORS.rowOdd,
                  }}
                >
                  <td className="p-3 text-white">{a.title}</td>

                  <td className="p-3">
                    <span
                      className="px-3 py-1 rounded-full text-sm font-semibold"
                      style={{
                        background:
                          a.type === "success"
                            ? "rgba(16, 185, 129, 0.15)" // success
                            : a.type === "danger"
                            ? "rgba(239, 68, 68, 0.15)" // danger
                            : a.type === "warning"
                            ? "rgba(245, 158, 11, 0.18)" // warning
                            : "rgba(59, 130, 246, 0.15)", // banner/info

                        color:
                          a.type === "success"
                            ? "#10B981"
                            : a.type === "danger"
                            ? "#EF4444"
                            : a.type === "warning"
                            ? "#F59E0B"
                            : "#3B82F6",
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
                    <button
                      className="text-blue-400 hover:text-blue-300"
                      onClick={() => onEdit(a)}
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      className="text-red-400 hover:text-red-300 cursor-pointer"
                      onClick={() => deleteAnnouncement.mutate(a._id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
