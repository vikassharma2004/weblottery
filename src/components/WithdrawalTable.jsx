"use client";

import React, { useState, useCallback } from "react";
import SkeletonRow from "./SkeletonRow";
import {
  ChevronUp,
  ChevronDown,
  X,
  XCircle,
  Clock,
  CheckCircle,
} from "lucide-react";
import { ADMINCOLORS } from "../constant";
import { useWithdraws } from "../hooks/auth/AdminMutation";

const statusOptions = [
  "pending",
  "approved",
  "Processing",
  "completed",
  "cancelled",
];

export function WithdrawalTable() {

  // URL PARAMS
  const [searchParams, setSearchParams] = useState(
    new URLSearchParams(window.location.search)
  );

  
  const page = Number(searchParams.get("page") || 1);
  const status = searchParams.get("status") || "";
  const withdrawId = searchParams.get("withdrawId") || "";
  const email = searchParams.get("email") || "";
  const startDate = searchParams.get("startDate") || "";
  const endDate = searchParams.get("endDate") || "";
   const [withdrawIdInput, setWithdrawIdInput] = useState(withdrawId);
  const [emailInput, setEmailInput] = useState(email);

// DEBOUNCE EFFECT FOR withdrawId
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      updateFilter("withdrawId", withdrawIdInput);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [withdrawIdInput]);

  // DEBOUNCE EFFECT FOR email
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      updateFilter("email", emailInput);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [emailInput]);
  // SORTING
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "desc",
  });

  // FETCH FROM BACKEND
  const { data, isLoading, isFetching } = useWithdraws({
    page,
    limit: 20,
    status,
    withdrawId,
    email,
    startDate,
    endDate,
  });

  const withdraws = data?.withdraws || [];
  const totalPages = data?.totalPages || 1;

  // UPDATE URL
  const updateURL = (params) => {
    const query = params.toString();
    window.history.replaceState(null, "", `?${query}`);
    setSearchParams(params);
  };

  const updateFilter = useCallback(
    (key, value) => {
      const params = new URLSearchParams(searchParams);
      value ? params.set(key, value) : params.delete(key);
      params.set("page", "1"); // whenever filter changes → reset page
      updateURL(params);
    },
    [searchParams]
  );

  const clearFilters = () => {
    updateURL(new URLSearchParams());
  };

  // SORTING (local)
  const sorted = [...withdraws].sort((a, b) => {
    const aVal = a[sortConfig.key];
    const bVal = b[sortConfig.key];

    if (sortConfig.key === "amount") {
      return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
    }

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

  // BADGES + ICONS
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
      {/* ================= FILTERS ================= */}
      <div
        style={{
          background: ADMINCOLORS.card,
          border: `1px solid ${ADMINCOLORS.border}`,
          borderRadius: 8,
          padding: 24,
          marginBottom: 24,
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* withdrawId */}
          <div>
            <label
              className="block text-sm font-bold mb-2"
              style={{ color: ADMINCOLORS.foreground }}
            >
              Withdraw ID
            </label>
            <input
              type="text"
              value={withdrawIdInput}
              onChange={(e) => setWithdrawIdInput(e.target.value)}
              className="w-full px-3 py-2 rounded-lg"
              style={{
                background: ADMINCOLORS.accent,
                border: `1px solid ${ADMINCOLORS.border}`,
                color: ADMINCOLORS.foreground,
              }}
              placeholder="Search by ID"
            />
          </div>

          {/* email */}
          <div>
            <label
              className="block text-sm font-bold mb-2"
              style={{ color: ADMINCOLORS.foreground }}
            >
              Email
            </label>
            <input
              type="text"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="w-full px-3 py-2 rounded-lg"
              style={{
                background: ADMINCOLORS.accent,
                border: `1px solid ${ADMINCOLORS.border}`,
                color: ADMINCOLORS.foreground,
              }}
              placeholder="Search email"
            />
          </div>

          {/* status */}
          <div>
            <label
              className="block text-sm font-bold mb-2"
              style={{ color: ADMINCOLORS.foreground }}
            >
              Status
            </label>

            <select
              value={status}
              onChange={(e) => updateFilter("status", e.target.value)}
              className="w-full px-3 py-2 rounded-lg"
              style={{
                background: ADMINCOLORS.accent,
                border: `1px solid ${ADMINCOLORS.border}`,
                color: ADMINCOLORS.foreground,
              }}
            >
              <option value="">All</option>
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

      {/* ================= TABLE ================= */}
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
              <tr style={{ background:ADMINCOLORS.rowHighlight,border:ADMINCOLORS.rowHighlightBorder }}>
                {[
                  { label: "Name", key: "name" },
                  { label: "Email", key: "email" },
                  { label: "Amount", key: "amount" },
                  { label: "Status", key: "status" },
                  { label: "Withdraw ID", key: "withdrawId" },
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
    sorted.map((req) => (
      <tr
        key={req._id}
        style={{ borderBottom: `1px solid ${ADMINCOLORS.border}` }}
      >
        <td style={{ padding: 16 }} className="text-white">
          {req.name}
        </td>

        <td style={{ padding: 16 }} className="text-white">
          {req.email}
        </td>

        <td style={{ padding: 16, fontWeight: 600 }} className="text-[#F1F5F9]">
          ${req.amount}
        </td>

        <td style={{ padding: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {statusIcon[req.status]}
            <span
              style={{
                background: badgeColor[req.status].bg,
                color: badgeColor[req.status].color,
                padding: "4px 10px",
                borderRadius: 9999,
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              {req.status}
            </span>
          </div>
        </td>

        <td style={{ padding: 16 }} className="text-white">
          {req.withdrawId}
        </td>

        <td style={{ padding: 16, color: ADMINCOLORS.muted }}>
          {new Date(req.createdAt).toLocaleDateString()}
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
        colSpan={7}
        style={{
          padding: 48,
          textAlign: "center",
          color: ADMINCOLORS.muted,
        }}
      >
        No withdrawal requests found
      </td>
    </tr>
  )}
</tbody>

          </table>
        </div>
        {/* ================= SUMMARY BOXES ================= */}
        <div
          style={{
            marginTop: 24,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
          }}
        >
          {/* Total Requests */}
          <div
            style={{
              background: ADMINCOLORS.card,
              border: `1px solid ${ADMINCOLORS.border}`,
              padding: 20,
              borderRadius: 8,
            }}
          >
            <p style={{ fontSize: 14, color: ADMINCOLORS.muted }}>
              Total Requests
            </p>
            <h2
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: ADMINCOLORS.foreground,
                marginTop: 4,
              }}
            >
              {data?.total || 0}
            </h2>
          </div>

          {/* Total Withdraw Amount */}
          <div
            style={{
              background: ADMINCOLORS.card,
              border: `1px solid ${ADMINCOLORS.border}`,
              padding: 20,
              borderRadius: 8,
            }}
          >
            <p style={{ fontSize: 14, color: ADMINCOLORS.muted }}>
              Total Withdraw Amount
            </p>
            <h2
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: ADMINCOLORS.primary,
                marginTop: 4,
              }}
            >
              ₹
              {withdraws
                .filter((w) => w.status === "pending")
                .reduce((sum, w) => sum + (w.amount || 0), 0)
                .toLocaleString()}
            </h2>
          </div>
        </div>

        {/* ================= PAGINATION ================= */}
        <div
          style={{
            padding: 16,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `1px solid ${ADMINCOLORS.border}`,
          }}
        >
          <button
            disabled={page <= 1}
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              params.set("page", String(page - 1));
              updateURL(params);
            }}
            style={{
              padding: "8px 14px",
              background: page <= 1 ? ADMINCOLORS.muted : ADMINCOLORS.primary,
              color: ADMINCOLORS.sidebar,
              borderRadius: 6,
              cursor: page <= 1 ? "not-allowed" : "pointer",
            }}
          >
            Previous
          </button>

          <span style={{ color: ADMINCOLORS.foreground, fontSize: 14 }}>
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page >= totalPages}
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              params.set("page", String(page + 1));
              updateURL(params);
            }}
            style={{
              padding: "8px 14px",
              background:
                page >= totalPages ? ADMINCOLORS.muted : ADMINCOLORS.primary,
              color: ADMINCOLORS.sidebar,
              borderRadius: 6,
              cursor: page >= totalPages ? "not-allowed" : "pointer",
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
