import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { ADMINCOLORS } from "../constant";
import AnnouncementCard from "./AnnouncementCard";
import BannerSection from "./BannerSection";

import {
  useCreateAnnouncement,
  useUpdateAnnouncement,
} from "../hooks/auth/AdminMutation";

export default function AnnouncementBuilder({ initialData, onBack }) {
  const isEditing = Boolean(initialData);

  const createAnnouncement = useCreateAnnouncement();
  const updateAnnouncement = useUpdateAnnouncement();
  const createdAt = initialData?.createdAt || new Date().toISOString();
  const [title, setTitle] = useState(initialData?.title || "");
  const [message, setMessage] = useState(initialData?.message || "");
  const [type, setType] = useState(initialData?.type || "info");
  const [isActive, setIsActive] = useState(initialData?.isActive ?? true);

  const previewData = { title, message, type, isActive, createdAt };

  const handleSubmit = () => {
    const payload = { title, message, type, isActive };

    if (isEditing) {
      // 🔥 UPDATE ANNOUNCEMENT
      updateAnnouncement.mutate(
        { id: initialData._id, payload },
        {
          onSuccess: () => {
            onBack(); // go back only when update succeeds
          },
        }
      );
    } else {
      createAnnouncement.mutate(payload);
      setTitle("");
      setMessage("");
      setType("info");
      setIsActive(true);
      onBack();
    }
  };

  const loading = createAnnouncement.isPending;

  return (
    <div className="flex justify-center gap-4 flex-col md:flex-row">
      {/* LEFT SECTION - FORM */}
      <div
        className="p-6 rounded-xl max-w-4xl mx-auto md:w-1/2"
        style={{
          background: ADMINCOLORS.card,
          border: `1px solid ${ADMINCOLORS.border}`,
        }}
      >
        {/* BACK BUTTON */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-4 text-white cursor-pointer"
        >
          <ArrowLeft size={18} /> Back
        </button>

        {/* HEADER */}
        <h1
          className="text-2xl font-bold mb-4"
          style={{ color: ADMINCOLORS.foreground }}
        >
          {isEditing ? "Edit Announcement" : "Create Announcement"}
        </h1>

        {/* FORM */}
        <div className="space-y-5">
          {/* Title */}
          <div>
            <label className="text-white block mb-1">Title</label>
            <input
              className="w-full p-2 rounded bg-[#262626] border border-[#333] text-white"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Message */}
          <div>
            <label className="text-white block mb-1">Message</label>
            <textarea
              className="w-full p-2 rounded bg-[#262626] border border-[#333] text-white"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          {/* Type */}
          <div>
            <label className="text-white block mb-1">Type</label>
            <select
              className="w-full p-2 rounded bg-[#262626] border border-[#333] text-white"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="danger">Danger</option>
              <option value="success">Success</option>
              <option value="banner">Banner</option>
            </select>
          </div>

          {/* Active Status */}
          <div>
            <label className="text-white block mb-1">Active Status</label>
            <select
              className="w-full p-2 rounded bg-[#262626] border border-[#333] text-white"
              value={isActive}
              onChange={(e) => setIsActive(e.target.value === "true")}
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            style={{ background: ADMINCOLORS.primary, color: "#000" }}
          >
            {loading
              ? "Saving..."
              : isEditing
              ? "Update Announcement"
              : "Create Announcement"}
          </button>
        </div>
      </div>

      {/* RIGHT SECTION — PREVIEW */}
      <div className="bg-[#1F1F1F] p-6 rounded-xl border border-[#333] mt-6 max-w-6xl mx-auto md:w-1/2">
        <h2 className="text-xl font-bold text-white mb-4">Preview</h2>

        {previewData.type === "banner" ? (
          <BannerSection announcement={previewData} />
        ) : (
          <AnnouncementCard announcement={previewData} />
        )}
      </div>
    </div>
  );
}
