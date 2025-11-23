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
  Eye,
  Loader,
  Loader2,
} from "lucide-react";
import { ADMINCOLORS } from "../constant";
import {
  useWithdraws,
  useWithdrawById,
  useProcessWithdrawRequest,
} from "../hooks/auth/AdminMutation";

const statusOptions = ["approved", "rejected"];

const statusButtonLabels = {
  approved: "Approve Withdrawal",

  cancelled: "Reject Withdrawal",
};
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

  // Review modal state
  const [selectedStatus, setSelectedStatus] = useState("");
const [rejectReason, setRejectReason] = useState("");

  const [selectedId, setSelectedId] = useState(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const { data: selectedWithdraw, isLoading: isLoadingSingle } =
    useWithdrawById(selectedId);

  const updateStatusMutation = useProcessWithdrawRequest();

  const openReview = (id) => {
    setSelectedId(id);
    setIsReviewOpen(true);
  };

  const closeReview = () => {
    setSelectedId(null);
    setIsReviewOpen(false);
  };

  React.useEffect(() => {
  if (selectedWithdraw) {
    setSelectedStatus(selectedWithdraw.status || "");
    setRejectReason("");
  }
}, [selectedWithdraw]);
  // Debounce ID
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      updateFilter("withdrawId", withdrawIdInput);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [withdrawIdInput]);

  // Debounce email
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      updateFilter("email", emailInput);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [emailInput]);

  // SORT
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "desc",
  });

  const { data, isLoading } = useWithdraws({
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

  const updateURL = (params) => {
    const query = params.toString();
    window.history.replaceState(null, "", `?${query}`);
    setSearchParams(params);
  };

  const updateFilter = useCallback(
    (key, value) => {
      const params = new URLSearchParams(searchParams);
      value ? params.set(key, value) : params.delete(key);
      params.set("page", "1");
      updateURL(params);
    },
    [searchParams]
  );

  const clearFilters = () => {
    updateURL(new URLSearchParams());
  };

  // SORT LOGIC
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

  // BADGE + ICONS
  const statusIcon = {
    pending: <Clock size={18} style={{ color: "#FBBF24" }} />,
    Processing: <Clock size={18} style={{ color: "#3B82F6" }} />,
    approved: <CheckCircle size={18} style={{ color: "#22C55E" }} />,
    completed: <CheckCircle size={18} style={{ color: "#10B981" }} />,
    cancelled: <XCircle size={18} style={{ color: ADMINCOLORS.destructive }} />,
  };

  return (
    <div>
      {/* FILTER SECTION */}
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
              <tr
                style={{
                  background: ADMINCOLORS.rowHighlight,
                  border: ADMINCOLORS.rowHighlightBorder,
                }}
              >
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
                [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
              ) : sorted.length > 0 ? (
                sorted.map((req) => (
                  <tr
                    key={req._id}
                    style={{ borderBottom: `1px solid ${ADMINCOLORS.border}` }}
                  >
                    <td style={{ padding: 16 }} className="text-white">
                      {req?.user.name}
                    </td>

                    <td style={{ padding: 16 }} className="text-white">
                      {req?.user.email}
                    </td>

                    <td
                      style={{ padding: 16, fontWeight: 600 }}
                      className="text-[#F1F5F9]"
                    >
                      ₹{req.amount}
                    </td>

                    <td style={{ padding: 16 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        {statusIcon[req.status]}
                        <span style={{ color: ADMINCOLORS.foreground }}>
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
                        onClick={() => openReview(req._id)}
                        style={{
                          padding: "6px 12px",
                          background: ADMINCOLORS.primary,
                          color: ADMINCOLORS.sidebar,
                          borderRadius: 6,
                          fontSize: 14,
                          fontWeight: 600,
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <Eye size={16} />
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

        {/* PAGINATION */}
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

      {/* ====================== REVIEW MODAL ====================== */}
     {/* ====================== REVIEW MODAL ====================== */}
{isReviewOpen && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.6)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    }}
  >
    <div
      style={{
        width: "450px",
        background: ADMINCOLORS.card,
        padding: 24,
        borderRadius: 12,
        border: `1px solid ${ADMINCOLORS.border}`,
      }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold" style={{ color: "white" }}>
          Review Withdrawal
        </h2>
        <button onClick={closeReview}>
          <X size={20} style={{ color: "white", cursor: "pointer" }} />
        </button>
      </div>

      {/* LOADING */}
      {isLoadingSingle ? (
        <Loader2 className="w-5 h-5 animate-spin text-white" />
      ) : !selectedWithdraw ? (
        <p style={{ color: "white" }}>No data found</p>
      ) : (
        <>
          {/* USER */}
          <div style={{ marginBottom: 16 }}>
            <p style={{ color: "#9CA3AF" }}>User</p>
            <p style={{ color: "white", fontWeight: 600 }}>
              {selectedWithdraw.requestedBy?.name} (
              {selectedWithdraw.requestedBy?.email})
            </p>
          </div>

          {/* AMOUNT */}
          <div style={{ marginBottom: 16 }}>
            <p style={{ color: "#9CA3AF" }}>Amount</p>
            <p style={{ color: "white", fontWeight: 600 }}>
              ₹{selectedWithdraw.amount}
            </p>
          </div>

          {/* WITHDRAW ID */}
          <div style={{ marginBottom: 16 }}>
            <p style={{ color: "#9CA3AF" }}>Withdraw ID</p>
            <p style={{ color: "white" }}>{selectedWithdraw.withdrawId}</p>
          </div>

          {/* STATUS SELECT */}
          <div style={{ marginBottom: 16 }}>
            <p style={{ color: "#9CA3AF" }}>Status</p>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 rounded-lg"
              style={{
                background: ADMINCOLORS.accent,
                border: `1px solid ${ADMINCOLORS.border}`,
                color: ADMINCOLORS.foreground,
              }}
            >
              <option value="">Select status</option>
              {statusOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* SHOW REASON INPUT WHEN REJECTED */}
          {selectedStatus === "rejected" && (
            <div style={{ marginBottom: 16 }}>
              <p style={{ color: "#9CA3AF" }}>Reason</p>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Enter reason for rejection"
                rows={4}
                className="w-full px-3 py-2 rounded-lg"
                style={{
                  background: ADMINCOLORS.accent,
                  border: `1px solid ${ADMINCOLORS.border}`,
                  color: ADMINCOLORS.foreground,
                }}
              />
            </div>
          )}

          {/* UPDATE BUTTON */}
          <button
            onClick={() => {
              if (!selectedStatus) return alert("Select a status first.");

              if (selectedStatus === "rejected" && !rejectReason.trim()) {
                return alert("Rejection reason is required.");
              }

              updateStatusMutation.mutate({
                id: selectedId,
                status: selectedStatus,
                note: rejectReason || null,
              });
              closeReview();
            }}
            className="w-full mt-2 py-2 rounded-lg"
            style={{
              background: ADMINCOLORS.primary,
              color: ADMINCOLORS.sidebar,
              fontWeight: 600,
              cursor: "pointer",
              opacity: updateStatusMutation.isPending ? 0.7 : 1,
            }}
            disabled={updateStatusMutation.isPending}
          >
            {updateStatusMutation.isPending ? (
              <Loader2 className="w-5 h-5 animate-spin mx-auto" />
            ) : (
              statusButtonLabels[selectedStatus] || "Update Status"
            )}
          </button>

          {/* CLOSE */}
          <button
            onClick={closeReview}
            className="w-full mt-4 py-2 rounded-lg"
            style={{
              background: ADMINCOLORS.accent,
              color: ADMINCOLORS.sidebar,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </>
      )}
    </div>
  </div>
)}

    </div>
  );
}
