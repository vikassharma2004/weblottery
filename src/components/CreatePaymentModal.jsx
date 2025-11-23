"use client";

import React, { useState } from "react";
import { ADMINCOLORS } from "../constant";
import { ImagePlus } from "lucide-react";
import { useCreatePaymentSetting } from "../hooks/auth/AdminMutation";

export default function CreatePaymentModal({ onClose }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [upiId, setUpiId] = useState("");
  const [isActive, setIsActive] = useState(true);

  const { mutate: createPayment, isPending } = useCreatePaymentSetting();

  const handleFile = (e) => {
    const uploaded = e.target.files[0];
    if (!uploaded) return;

    setFile(uploaded);
    setPreview(URL.createObjectURL(uploaded));
  };

  const submit = () => {
    if (!upiId || !file) {
      return toast.error("QR Image & UPI ID required");
    }

    const formData = new FormData();
    formData.append("upiId", upiId);
    formData.append("isActive", isActive);
    formData.append("image", file); // very important

    createPayment(formData, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div
        className="p-6 rounded-xl w-[400px]"
        style={{ background: ADMINCOLORS.card }}
      >
        <h2 className="text-xl font-semibold text-white mb-4">
          Create Payment Method
        </h2>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="text-white mb-2 block">Upload QR Image</label>

          {preview ? (
            <div className="relative w-32 h-32">
              <img
                src={preview}
                className="rounded-lg border"
                style={{ borderColor: ADMINCOLORS.border }}
              />
              <button
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-sm cursor-pointer"
                onClick={() => {
                  setPreview(null);
                  setFile(null);
                }}
              >
                ×
              </button>
            </div>
          ) : (
            <label
              htmlFor="qrUpload"
              className="w-full h-32 flex flex-col items-center justify-center cursor-pointer rounded-lg"
              style={{
                background: ADMINCOLORS.rowOdd,
                border: `1px dashed ${ADMINCOLORS.border}`,
                color: "#aaa",
              }}
            >
              <ImagePlus size={40} className="mb-2" />
              <span>Click to upload QR image</span>
            </label>
          )}

          <input
            id="qrUpload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFile}
          />
        </div>

        {/* UPI ID */}
        <div className="mb-4">
          <label className="text-white">UPI ID</label>
          <input
            type="text"
            className="w-full mt-2 p-2 rounded-lg"
            placeholder="example@upi"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            style={{ background: ADMINCOLORS.rowOdd, color: "white" }}
          />
        </div>

        {/* Status */}
        <div className="mb-4">
          <label className="text-white">Status</label>
          <select
            className="w-full mt-2 p-2 rounded-lg text-white"
            value={isActive}
            onChange={(e) => setIsActive(e.target.value === "true")}
          >
            <option value="true" className="text-white bg-black">
              Active
            </option>
            <option value="false" className="text-white bg-black">
              Inactive
            </option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-5">
          <button
            disabled={isPending}
            className={`px-4 py-2 rounded-lg ${
              isPending ? "cursor-not-allowed opacity-60" : "cursor-pointer"
            }`}
            style={{ background: "#555", color: "white" }}
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 rounded-lg font-semibold cursor-pointer"
            style={{ background: ADMINCOLORS.primary, color: "#000" }}
            onClick={submit}
            disabled={isPending}
          >
            {isPending ? (
              <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              "Create"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
