"use client";
import React from "react";
import { useReportById, useUpdateReportStatus } from "../hooks/auth/AdminMutation";
import { Loader, Loader2 } from "lucide-react";

const THEME = {
  PRIMARY: "#FFB800",
  PRIMARY_GRADIENT: "linear-gradient(90deg, #FFB800 0%, #FFCB45 100%)",
  SECONDARY: "#3B82F6",
  SUCCESS: "#43A047",
  WARNING: "#FF9800",
  ERROR: "#E53935",

  CARD: "#FFFFFF",
  BORDER: "#E0E0E0",
  SHADOW: "rgba(0,0,0,0.09)",

  TEXT: "#1E1E1E",
  TEXT_SECONDARY: "#6B6B6B",
  ACCENT: "#FFD54F",
  WHITE: "#FFFFFF",
};

export default function ReportReviewModal({ id, onClose }) {
  const { data, isLoading } = useReportById(id, Boolean(id));
  const updateStatus = useUpdateReportStatus();

  const handleStatusChange = (e) => {
    updateStatus.mutate(
      { id, status: e.target.value },
      {
        onSuccess: () => {
          onClose(); // ⛔ Auto close modal after update
        },
      }
    );
  };

  if (!id) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: "rgba(0,0,0,0.45)",
        backdropFilter: "blur(2px)",
      }}
    >
      <div
        style={{
          width: 520,
          background: THEME.CARD,
          borderRadius: 16,
          padding: 28,
          boxShadow: `0 8px 24px ${THEME.SHADOW}`,
          border: `1px solid ${THEME.BORDER}`,
          animation: "fadeIn 0.25s ease",
        }}
      >
        {/* Close Button */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            style={{
              color: THEME.TEXT_SECONDARY,
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            ✕
          </button>
        </div>

        {isLoading ? (
          <Loader2 className="h-6 w-6 animate-spin mx-auto mt-10" />
        ) : (
          <>
            {/* Header */}
            <h2
              style={{
                fontSize: 22,
                fontWeight: 700,
                marginBottom: 20,
                color: THEME.TEXT,
              }}
            >
              Report Details
            </h2>

            {/* INFO BOXES */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                marginBottom: 20,
              }}
            >
              <InfoRow label="Email" value={data.email} />
              <InfoRow label="Issue Type" value={data.issueType} />
              <InfoRow label="Description" value={data.description} />
              <InfoRow label="Status" value={data.status} />
            </div>

            {/* UPDATE SECTION */}
            <div style={{ marginTop: 12 }}>
              <label
                style={{
                  color: THEME.TEXT,
                  fontWeight: 600,
                  marginBottom: 8,
                  display: "block",
                }}
              >
                Update Status
              </label>

              <select
                defaultValue={data.status}
                onChange={handleStatusChange}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: `1px solid ${THEME.BORDER}`,
                  background: THEME.WHITE,
                  color: THEME.TEXT,
                  fontSize: 15,
                  outline: "none",
                  transition: "0.2s",
                  cursor: "pointer",
                }}
                className="hover:shadow"
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="rejected">Rejected</option>
              </select>

              {/* BTN */}
              <button
                onClick={() =>
                  updateStatus.mutate(
                    { id, status: data.status },
                    { onSuccess: () => onClose() }
                  )
                }
                style={{
                  marginTop: 20,
                  width: "100%",
                  padding: "12px 0",
                  background: THEME.PRIMARY_GRADIENT,
                  color: THEME.TEXT,
                  fontWeight: 700,
                  borderRadius: 12,
                  fontSize: 16,
                  cursor:"pointer"
                }}
              >
                Save
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div>
      <p style={{ fontWeight: 600, color: THEME.TEXT, marginBottom: 4 }}>
        {label}
      </p>
      <p style={{ color: THEME.TEXT_SECONDARY }}>{value}</p>
    </div>
  );
}
