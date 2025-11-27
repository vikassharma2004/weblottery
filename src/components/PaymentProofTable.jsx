"use client";

import React, { useState, useMemo, useCallback } from "react";
import { ChevronDown, ChevronUp, Eye, Loader2, X } from "lucide-react";
import { toast } from "react-toastify";
import { ADMINCOLORS } from "../constant";
import SkeletonRow from "./SkeletonRow";

import {
  usePendingPayments,
  useVerifyPayment,
} from "../hooks/auth/AdminMutation";

const statusColor = {
  pending: { bg: "#FBBF2433", color: "#FBBF24" },
  approved: { bg: "#10B98133", color: "#10B981" },
  rejected: { bg: "#EF444433", color: "#EF4444" },
};

export function PaymentProofTable() {
  // URL PARAMS
  const [searchParams, setSearchParams] = useState(
    new URLSearchParams(window.location.search)
  );

  const page = Number(searchParams.get("page") || 1);
  const startDate = searchParams.get("startDate") || "";
  const endDate = searchParams.get("endDate") || "";

  const [startInput, setStartInput] = useState(startDate);
  const [endInput, setEndInput] = useState(endDate);

  const updateURL = (params) => {
    const query = params.toString();
    window.history.replaceState(null, "", `?${query}`);
    setSearchParams(params);
  };

  const updateFilter = useCallback(
    (key, value) => {
      const params = new URLSearchParams(searchParams);

      if (value) params.set(key, value);
      else params.delete(key);

      params.set("page", "1");
      updateURL(params);
    },
    [searchParams]
  );

  // Debounce start date
  React.useEffect(() => {
    const t = setTimeout(() => updateFilter("startDate", startInput), 600);
    return () => clearTimeout(t);
  }, [startInput]);

  // Debounce end date
  React.useEffect(() => {
    const t = setTimeout(() => updateFilter("endDate", endInput), 600);
    return () => clearTimeout(t);
  }, [endInput]);

  // FETCH DATA (REAL BACKEND)
  const { data, isLoading } = usePendingPayments({
    page,
    limit: 20,
    startDate,
    endDate,
  });

  const proofs = data?.list || [];
  const totalPages = data?.totalPages || 1;

  // SORTING
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "desc",
  });

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sorted = useMemo(() => {
    return [...proofs].sort((a, b) => {
      const A = a[sortConfig.key];
      const B = b[sortConfig.key];

      if (sortConfig.key === "createdAt") {
        return sortConfig.direction === "asc"
          ? new Date(A) - new Date(B)
          : new Date(B) - new Date(A);
      }

      return sortConfig.direction === "asc"
        ? String(A).localeCompare(String(B))
        : String(B).localeCompare(String(A));
    });
  }, [proofs, sortConfig]);

  const clearFilters = () => {
    const params = new URLSearchParams();
    updateURL(params);
    setStartInput("");
    setEndInput("");
  };

  const [selectedProof, setSelectedProof] = useState(null);

  return (
    <div className="space-y-5">
      {/* FILTERS */}
      <div className="bg-[#1F1F1F] border border-[#333] p-5 rounded-lg grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="text-sm text-white font-semibold">Start Date</label>
          <input
            type="date"
            value={startInput}
            onChange={(e) => setStartInput(e.target.value)}
            className="w-full mt-1 bg-[#262626] border border-[#333] px-3 py-2 rounded-lg text-white"
          />
        </div>

        <div>
          <label className="text-sm text-white font-semibold">End Date</label>
          <input
            type="date"
            value={endInput}
            onChange={(e) => setEndInput(e.target.value)}
            className="w-full mt-1 bg-[#262626] border border-[#333] px-3 py-2 rounded-lg text-white"
          />
        </div>

        <div className="flex items-end">
          <button
            onClick={clearFilters}
            className="w-full py-2 bg-[#444] hover:bg-[#555] text-white rounded-lg flex items-center justify-center gap-2"
          >
            <X size={16} /> Clear Filters
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-[#1F1F1F] border border-[#333] rounded-lg overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ background: ADMINCOLORS.rowHighlight }}>
              {[
                { label: "Email", key: "email" },
                { label: "Status", key: "status" },
                { label: "Created At", key: "createdAt" },
                { label: "Actions" },
              ].map((col) => (
                <th
                  key={col.key}
                  className="p-4 text-left text-white font-semibold"
                >
                  {col.key ? (
                    <button
                      onClick={() => handleSort(col.key)}
                      className="flex items-center gap-2"
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
              </>
            ) : proofs.length > 0 ? (
              sorted.map((p, index) => (
                <tr
                  key={p._id}
                  className={`${
                    index % 2 === 0 ? "bg-[#1E1E1E]" : "bg-[#262626]"
                  } border-b border-[#333]`}
                >
                  <td className="p-4 text-white">{p.email}</td>

                  <td className="p-4">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        background: statusColor[p.status].bg,
                        color: statusColor[p.status].color,
                      }}
                    >
                      {p.status}
                    </span>
                  </td>

                  <td className="p-4 text-gray-400">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() => setSelectedProof(p)}
                      className="flex cursor-pointer items-center gap-2 bg-[#F5B041] px-3 py-1.5 rounded-lg font-medium text-black"
                    >
                      <Eye size={16} /> View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-8 text-center text-gray-400">
                  No payment proofs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center text-white mt-3">
        <button
          disabled={page <= 1}
          onClick={() => {
            const params = new URLSearchParams(searchParams);
            params.set("page", String(page - 1));
            updateURL(params);
          }}
          className={`px-4 py-2 rounded-lg ${
            page <= 1 ? "bg-gray-500 cursor-not-allowed" : "bg-[#F5B041]"
          }`}
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page >= totalPages}
          onClick={() => {
            const params = new URLSearchParams(searchParams);
            params.set("page", String(page + 1));
            updateURL(params);
          }}
          className={`px-4 py-2 rounded-lg ${
            page >= totalPages
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-[#F5B041]"
          }`}
        >
          Next
        </button>
      </div>

      {/* MODAL */}
      {selectedProof && (
        <PaymentModal
          proof={selectedProof}
          onClose={() => setSelectedProof(null)}
        />
      )}
    </div>
  );
}

/* -----------------------
    MODAL CONTENT
------------------------ */
function PaymentModal({ proof, onClose }) {
  const { mutate: verifyPayment, isPending } = useVerifyPayment();
  const [status, setStatus] = useState("approved");
  const [adminNote, setAdminNote] = useState("");

  const handleSubmit = () => {
    if (status === "rejected" && !adminNote.trim()) {
      return toast.error("Enter a reason for rejection");
    }

    verifyPayment(
      {
        id: proof._id,
        status,
        adminNote,
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-999 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#1F1F1F] border border-[#333] rounded-xl w-full max-w-md max-h-[85vh] flex flex-col"
      >
        <div className="px-5 py-4 border-b border-[#333] text-white font-semibold text-lg">
          Payment Proof
        </div>

        <div className="p-3 overflow-y-auto flex-1 space-y-3">
          <img
            src={proof.proofImageUrl}
            alt="Proof"
            className="w-full max-h-[500px] object-contain rounded-md"
          />

          {/* Status Select */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[#262626] border border-[#333] text-white"
          >
            <option value="approved">Approve</option>
            <option value="rejected">Reject</option>
          </select>

          {status === "rejected" && (
            <textarea
              rows={3}
              placeholder="Reason for rejection (required)"
              value={adminNote}
              onChange={(e) => setAdminNote(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#262626] border border-[#333] text-white"
            ></textarea>
          )}
        </div>

        <div className="p-4 border-t border-[#333] flex gap-3">
          <button
            onClick={onClose}
            className="w-1/2 py-2.5 bg-red-500 text-white rounded-lg font-semibold cursor-pointer"
          >
            Close
          </button>

          <button
            disabled={isPending}
            onClick={handleSubmit}
            className={`w-1/2 py-2.5 rounded-lg font-semibold text-black ${
              isPending
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#F5B041] cursor-pointer"
            }`}
          >
            {isPending ? (
              <Loader2 className="h-5 w-5 animate-spin items-center" />
            ) : status === "approved" ? (
              "Approve"
            ) : (
              "Reject"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
