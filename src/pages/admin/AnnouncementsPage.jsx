"use client";

import React, { useState } from "react";
import AdminAnnouncementTable from "../../components/AdminAnnouncementTable";
import AnnouncementBuilder from "../../components/AnnouncementBuilder";
import { ADMINCOLORS } from "../../constant";

export default function AnnouncementsPage() {
   const [mode, setMode] = useState("table");  
  const [editData, setEditData] = useState(null); // 🔥 store selected announcement

  const handleCreate = () => {
    setEditData(null);     // empty form
    setMode("create");
  };

  const handleEdit = (announcement) => {
    setEditData(announcement);   // prefill data
    setMode("create");
  };

  return (
    <main
      style={{
        flex: 1,
        width: "100%",
        padding: "24px",
        background: ADMINCOLORS.card,
        minHeight: "100vh",
        overflow: "auto",
        borderRadius:20
      }}
    >
      {/* Page Header */}
      <div style={{ marginBottom: 24 }}>
        <h1
          style={{
            color: ADMINCOLORS.foreground,
            fontSize: 32,
            fontWeight: 800,
          }}
        >
          Announcements
        </h1>

        <p style={{ color: ADMINCOLORS.muted, marginTop: 6 }}>
          Manage all platform announcements
        </p>
      </div>

      {/* Main Content */}
      <div style={{ width: "100%" }}>
       {mode === "table" && (
        <AdminAnnouncementTable 
          onCreate={handleCreate} 
          onEdit={handleEdit}      // 🔥 pass handler
        />
      )}

      {mode === "create" && (
        <AnnouncementBuilder 
          onBack={() => setMode("table")}
          initialData={editData}    // 🔥 pass selected data
        />
      )}
      </div>
    </main>
  );
}
