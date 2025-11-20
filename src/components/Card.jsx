import React from "react";
import { ADMINCOLORS } from "../constant";

export function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-lg shadow-sm ${className}`}
      style={{
        backgroundColor: ADMINCOLORS.card,
        border: `1px solid ${ADMINCOLORS.border}`,
        color: ADMINCOLORS.foreground,
      }}
    >
      {children}
    </div>
  );
}
