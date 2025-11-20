"use client";

import React, { useState, useCallback } from "react";
import {
  ChevronUp,
  ChevronDown,
  X,
  XCircle,
  Clock,
  CheckCircle,
} from "lucide-react";
import { ADMINCOLORS } from "../constant";
import { useReports } from "../hooks/auth/AdminMutation";
import SkeletonRow from "./SkeletonRow";
const statusOptions = ["pending", "in_progress", "resolved", "rejected"];
// 🔥 Skeleton component

export function ReportTable() {
  const [searchParams, setSearchParams] = useState(
    new URLSearchParams(window.location.search)
  );
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "desc",
  });

  // READ VALUES FROM URL
  const currentStatus = searchParams.get("status") || "all";

  // BACKEND FETCH USING TANSTACK
  const { data, isLoading, isFetching } = useReports({
    page: 1,
    limit: 20,
    issueType: "all",
    status: currentStatus,
  });

  const reports = data?.reports || [];

  // --- URL UPDATE ---
  const updateURL = (params) => {
    const q = params.toString();
    window.history.replaceState(null, "", `?${q}`);
    setSearchParams(params);
  };

  const updateFilter = useCallback(
    (key, value) => {
      const params = new URLSearchParams(searchParams);
      value && value !== "all" ? params.set(key, value) : params.delete(key);
      updateURL(params);
    },
    [searchParams]
  );

  const clearFilters = () => updateURL(new URLSearchParams());

  // SORTING (local, simple)
  const sorted = [...reports].sort((a, b) => {
    const aVal = a[sortConfig.key];
    const bVal = b[sortConfig.key];

    if (sortConfig.key === "createdAt") {
      return sortConfig.direction === "asc"
        ? new Date(aVal) - new Date(bVal)
        : new Date(bVal) - new Date(aVal);
    }

    return sortConfig.direction === "asc"
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const statusIcon = {
    pending: <Clock size={18} style={{ color: "#FBBF24" }} />,
    in_progress: <Clock size={18} style={{ color: "#3B82F6" }} />,
    resolved: <CheckCircle size={18} style={{ color: "#10B981" }} />,
    rejected: <XCircle size={18} style={{ color: ADMINCOLORS.destructive }} />,
  };

  const badgeColor = {
    pending: { bg: "#FBBF2433", color: "#FBBF24" },
    in_progress: { bg: "#3B82F633", color: "#3B82F6" },
    resolved: { bg: "#10B98133", color: "#10B981" },
    rejected: { bg: "#EF444433", color: ADMINCOLORS.destructive },
  };

  return (
    <div>
      {/* FILTERS */}
      <div
        style={{
          background: ADMINCOLORS.card,
          border: `1px solid ${ADMINCOLORS.border}`,
          borderRadius: 8,
          padding: 24,
          marginBottom: 24,
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Status */}
          <div>
            <label
              className="block text-sm font-bold mb-2"
              style={{ color: ADMINCOLORS.foreground }}
            >
              Status
            </label>

            <select
              value={currentStatus === "all" ? "" : currentStatus}
              onChange={(e) => updateFilter("status", e.target.value)}
              className="w-full px-3 py-2 rounded-lg"
              style={{
                background: ADMINCOLORS.accent,
                border: `1px solid ${ADMINCOLORS.border}`,
                color: ADMINCOLORS.foreground,
              }}
            >
              <option value="">All Status</option>
              {statusOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Clear */}
          <div className="flex items-end">
            <button
              onClick={clearFilters}
              className="w-full px-4 py-2 rounded-lg flex items-center justify-center gap-2"
              style={{
                background: ADMINCOLORS.muted,
                color: ADMINCOLORS.sidebar,
              }}
            >
              <X size={16} />
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* TABLE */}

      <div
        style={{
          background: ADMINCOLORS.card,
          border: `1px solid ${ADMINCOLORS.border}`,
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%" }}>
            <thead>
              <tr style={{ background: ADMINCOLORS.accent }}>
                {[
                  { label: "Email", key: "email" },
                  { label: "Status", key: "status" },
                  { label: "Issue Type", key: "issueType" },
                  { label: "Created", key: "createdAt" },
                  { label: "Actions" },
                ].map((col) => (
                  <th
                    key={col.key}
                    style={{
                      padding: "16px",
                      textAlign: "left",
                      color: ADMINCOLORS.foreground,
                    }}
                  >
                    {col.key ? (
                      <button
                        onClick={() => handleSort(col.key)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          color: ADMINCOLORS.foreground,
                        }}
                      >
                        {col.label}
                        {sortConfig.key === col.key &&
                          (sortConfig.direction === "asc" ? (
                            <ChevronUp size={16} />
                          ) : (
                            <ChevronDown size={16} />
                          ))}
                      </button>
                    ) : (
                      col.label
                    )}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <>
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                </>
              ) : sorted.length > 0 ? (
                sorted.map((r) => (
                  <tr
                    key={r.id}
                    style={{ borderBottom: `1px solid ${ADMINCOLORS.border}` }}
                  >
                    <td style={{ padding: 16 }} className="text-white">
                      {r.email}
                    </td>
                    <td style={{ padding: 16 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        {statusIcon[r.status]}
                        <span
                          style={{
                            background: badgeColor[r.status].bg,
                            color: badgeColor[r.status].color,
                            padding: "4px 10px",
                            borderRadius: 9999,
                            fontSize: 12,
                            fontWeight: 600,
                          }}
                        >
                          {r.status}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: 16 }} className="text-white">
                      {r.issueType}
                    </td>
                    <td style={{ padding: 16, color: ADMINCOLORS.muted }}>
                      {new Date(r.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: 16 }}>
                      <button
                        style={{
                          padding: "6px 12px",
                          background: ADMINCOLORS.primary,
                          color: ADMINCOLORS.sidebar,
                          borderRadius: 6,
                          fontSize: 14,
                          fontWeight: 600,
                        }}
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    style={{
                      padding: 48,
                      textAlign: "center",
                      color: ADMINCOLORS.muted,
                    }}
                  >
                    No reports found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
