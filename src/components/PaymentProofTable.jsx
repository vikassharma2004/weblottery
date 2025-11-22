"use client";

import React, { useState, useMemo, useCallback } from "react";
import { ChevronDown, ChevronUp, Eye, X } from "lucide-react";
import { ADMINCOLORS } from "../constant";

// ------- TEMP DATA -------
const dummyPaymentProofs = [
  {
    _id: "1",
    email: "john@example.com",
    utrId: "UTR123456",
    proofImageUrl:
      "https://wazirx.com/blog/wp-content/uploads/2022/08/03-473x1024.jpg",
    status: "pending",
    createdAt: "2025-01-03T08:21:00.000Z",
  },
  {
    _id: "2",
    email: "test@gmail.com",
    utrId: "UTR987654",
    proofImageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROOMnCtbUny1_IhBzQU0IluDWLpINEwD-x8hVkPKCb28GMndbI83D2x9uU3t1D_VQNz6s&usqp=CAU",
    status: "approved",
    createdAt: "2025-01-10T11:22:00.000Z",
  },
];

const statusColor = {
  pending: { bg: "#FBBF2433", color: "#FBBF24" },
  approved: { bg: "#10B98133", color: "#10B981" },
  rejected: { bg: "#EF444433", color: "#EF4444" },
};

export function PaymentProofTable() {
  // ------------ URL PARAMS ----------------
  const [searchParams, setSearchParams] = useState(
    new URLSearchParams(window.location.search)
  );

  const page = Number(searchParams.get("page") || 1);
  const startDate = searchParams.get("startDate") || "";
  const endDate = searchParams.get("endDate") || "";

  // Controlled inputs
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

  // ------------ SORTING ----------------
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

  // ------------ FILTERING ----------------
  const filtered = useMemo(() => {
    return dummyPaymentProofs.filter((p) => {
      const itemDate = new Date(p.createdAt);

      if (startDate && new Date(startDate) > itemDate) return false;
      if (endDate && itemDate > new Date(endDate + "T23:59:59")) return false;

      return true;
    });
  }, [startDate, endDate]);

  // ------------ SORTED DATA ----------------
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
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
  }, [filtered, sortConfig]);

  // ------------ PAGINATION ----------------
  const limit = 5;
  const totalPages = Math.ceil(sorted.length / limit);

  const paginated = sorted.slice((page - 1) * limit, page * limit);

  const movePage = (delta) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page + delta));
    updateURL(params);
  };

  const clearFilters = () => {
    const params = new URLSearchParams();
    updateURL(params);
    setStartInput("");
    setEndInput("");
  };

  // ------------ MODAL ----------------
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
      <div className="bg-[#1F1F1F] border border-[#333] rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr style={{background:ADMINCOLORS.rowHighlight}}>
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
            {paginated.map((p, index) => (
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
                    className="flex items-center gap-2 bg-[#F5B041] px-3 py-1.5 rounded-lg font-medium text-black"
                  >
                    <Eye size={16} /> View
                  </button>
                </td>
              </tr>
            ))}

            {paginated.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="p-8 text-center text-gray-400"
                >
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
          onClick={() => movePage(-1)}
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
          onClick={() => movePage(1)}
          className={`px-4 py-2 rounded-lg ${
            page >= totalPages ? "bg-gray-500 cursor-not-allowed" : "bg-[#F5B041]"
          }`}
        >
          Next
        </button>

      </div>

      {/* MODAL */}
      {selectedProof && (
        <div
          onClick={() => setSelectedProof(null)}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999] p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#1F1F1F] border border-[#333] rounded-xl w-full max-w-md max-h-[85vh] flex flex-col"
          >
            <div className="px-5 py-4 border-b border-[#333] text-white font-semibold text-lg">
              Payment Proof
            </div>

            <div className="p-5 overflow-y-auto flex-1 space-y-4">
              <img
                src={selectedProof.proofImageUrl}
                alt="Proof"
                className="w-full max-h-[300px] object-contain rounded-md"
              />

              <select className="w-full px-3 py-2 rounded-lg bg-[#262626] border border-[#333] text-white">
                <option value="approve">Approve</option>
                <option value="reject">Reject</option>
              </select>
            </div>

            <div className="p-4 border-t border-[#333]">
              <button
                onClick={() => setSelectedProof(null)}
                className="w-full py-2.5 bg-red-500 text-white rounded-lg font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
