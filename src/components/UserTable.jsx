"use client";

import React, { useState, useCallback } from "react";
import SkeletonRow from "./SkeletonRow";
import { X, ChevronUp, ChevronDown } from "lucide-react";
import { ADMINCOLORS } from "../constant";
import { useUsers } from "../hooks/auth/AdminMutation";

export function UsersTable() {
  const [searchParams, setSearchParams] = useState(
    new URLSearchParams(window.location.search)
  );

  const page = Number(searchParams.get("page") || 1);
  const email = searchParams.get("email") || "";
  const hasPaid = searchParams.get("hasPaid") || "";
  const isSuspended = searchParams.get("isSuspended") || "";

  const [emailInput, setEmailInput] = useState(email);

  // Debounce email
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      updateFilter("email", emailInput);
    }, 800);
    return () => clearTimeout(timeout);
  }, [emailInput]);

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

  const { data, isLoading } = useUsers({
    page,
    limit: 20,
    email,
    hasPaid,
    isSuspended,
  });

  const users = data?.users || [];
  const totalPages = data?.totalPages || 1;

  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "desc",
  });

  const sorted = [...users].sort((a, b) => {
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

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Email */}
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
              placeholder="Search email"
              style={{
                background: ADMINCOLORS.accent,
                border: `1px solid ${ADMINCOLORS.border}`,
                color: ADMINCOLORS.foreground,
              }}
            />
          </div>

          {/* Has Paid */}
          <div>
            <label
              className="block text-sm font-bold mb-2"
              style={{ color: ADMINCOLORS.foreground }}
            >
              Has Paid
            </label>
            <select
              value={hasPaid}
              onChange={(e) => updateFilter("hasPaid", e.target.value)}
              className="w-full px-3 py-2 rounded-lg"
              style={{
                background: ADMINCOLORS.accent,
                border: `1px solid ${ADMINCOLORS.border}`,
                color: ADMINCOLORS.foreground,
              }}
            >
              <option value="">All</option>
              <option value="true">Paid</option>
              <option value="false">Not Paid</option>
            </select>
          </div>

          {/* Suspended */}
          <div>
            <label
              className="block text-sm font-bold mb-2"
              style={{ color: ADMINCOLORS.foreground }}
            >
              Status
            </label>
            <select
              value={isSuspended}
              onChange={(e) => updateFilter("isSuspended", e.target.value)}
              className="w-full px-3 py-2 rounded-lg"
              style={{
                background: ADMINCOLORS.accent,
                border: `1px solid ${ADMINCOLORS.border}`,
                color: ADMINCOLORS.foreground,
              }}
            >
              <option value="">All</option>
              <option value="true">Suspended</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={clearFilters}
              className="w-full px-4 py-2 rounded-lg flex items-center gap-2"
              style={{ background: ADMINCOLORS.muted }}
            >
              <X size={16} /> Clear Filters
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
        <table style={{ width: "100%", color: ADMINCOLORS.foreground }}>
          <thead>
            <tr style={{ background:ADMINCOLORS.rowHighlight,border:ADMINCOLORS.rowHighlightBorder }}>
              {[
                { label: "Name", key: "name" },
                { label: "Email", key: "email" },
                { label: "Has Paid", key: "hasPaid" },
                { label: "Suspended", key: "isSuspended" },
                { label: "Created", key: "createdAt" },
                { label: "Actions" },
              ].map((col) => (
                <th
                  key={col.key}
                  style={{ padding: "16px", color: ADMINCOLORS.foreground }}
                >
                  {col.key ? (
                    <button
                      onClick={() => handleSort(col.key)}
                      style={{
                        color: ADMINCOLORS.foreground,
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
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
              </>
            ) : sorted.length > 0 ? (
              sorted.map((u) => (
                <tr
                  key={u._id}
                  style={{
                    borderBottom: `1px solid ${ADMINCOLORS.border}`,
                  }}
                >
                  <td style={{ padding: 16 }}>{u.name}</td>
                  <td style={{ padding: 16 }}>{u.email}</td>
                  <td style={{ padding: 16 }}>{u.hasPaid ? "Yes" : "No"}</td>
                  <td style={{ padding: 16 }}>
                    {u.isSuspended ? "Suspended" : "Active"}
                  </td>
                  <td style={{ padding: 16 }}>
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>

                  {/* ACTION DROPDOWN */}
                  <td style={{ padding: 16 }}>
                    <ActionMenu
                      userId={u._id}
                      isSuspended={u.isSuspended}
                      onAction={() => window.location.reload()}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  style={{
                    padding: 48,
                    textAlign: "center",
                    color: ADMINCOLORS.muted,
                  }}
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div
          style={{
            padding: 16,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <button
            style={{ color: ADMINCOLORS.foreground }}
            disabled={page <= 1}
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              params.set("page", String(page - 1));
              updateURL(params);
            }}
          >
            Previous
          </button>

          <span style={{ color: ADMINCOLORS.foreground }}>
            Page {page} of {totalPages}
          </span>

          <button
            style={{ color: ADMINCOLORS.foreground }}
            disabled={page >= totalPages}
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              params.set("page", String(page + 1));
              updateURL(params);
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

/* ----------------- ACTION DROPDOWN ----------------- */
function ActionMenu({ userId, isSuspended, onAction }) {
  const [open, setOpen] = useState(false);

  const toggleSuspend = async () => {
    await fetch(`/api/admin/users/suspend/${userId}`, { method: "PATCH" });
    setOpen(false);
    onAction();
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          color: "white",
          fontSize: 20,
        }}
      >
        ...
      </button>

      {open && (
        <div
        className="bg-white"
          style={{
            position: "absolute",
            right: 0,
            top: "30px",
            background: ADMINCOLORS.card,
            border: `1px solid ${ADMINCOLORS.border}`,
            borderRadius: 6,
            padding: "3px 0",
            zIndex: 50,
            minWidth: "100px",
          }}
        >
          <button
            onClick={toggleSuspend}
            className="text-sm"
            style={{
              width: "100%",
              textAlign: "left",
              background: "transparent",
              border: "none",
              padding: "10px 16px",
              color: "white",
              cursor: "pointer",
            }}
          >
            {isSuspended ? (
              <span className="text-green-500">Unsuspend</span>
            ) : (
              <span className="text-red-500">suspend</span>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
