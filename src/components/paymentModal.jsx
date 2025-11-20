"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { useCreateOrder } from "../hooks/auth/AuthMutation";

export function PaymentModal({ amount, onClose }) {
  const createOrder = useCreateOrder();

  const [utr, setUtr] = useState("");
  const [proofImage, setProofImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProofImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!utr.trim()) return toast.error("Enter UTR number");
    if (!proofImage) return toast.error("Upload payment screenshot");

    toast.success("Payment submitted for verification");

    // Send UTR + Image to backend
    const formData = new FormData();
    formData.append("utr", utr);
    formData.append("amount", amount);
    formData.append("proof", proofImage);

    try {
      await createOrder.mutateAsync(formData);
      toast.success("Payment verification submitted");
      onClose();
    } catch (err) {
      toast.error("Failed to submit proof");
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center overflow-auto">
      
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm "
        onClick={onClose}
      ></div>

      {/* BIG Modal Box */}
    <div className="relative bg-white w-[95%] max-w-xl rounded-2xl shadow-xl p-8 animate-fadeIn">



        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 cursor-pointer"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-stone-900 text-center">
          Activate Referral Earnings
        </h2>

        <p className="text-stone-600 mt-2 text-center text-sm">
          Scan the QR below or use UPI to pay the activation fee.
        </p>

        {/* QR BOX */}
        <div className="mt-3 flex flex-col items-center bg-amber-50 border border-amber-200 p-2 rounded-xl">
          <img
            src="/qr.png" // ⚠️ Replace with your real QR image
            alt="Payment QR"
            className="w-48 h-48 rounded-lg shadow"
          />

          <p className="mt-3 text-lg font-semibold text-stone-900">
            Amount: ₹{amount}
          </p>

          <p className="text-sm text-stone-600">
            After payment, enter UTR and upload screenshot.
          </p>
        </div>

        {/* UTR Input */}
        <div className="mt-6">
          <label className="text-sm font-semibold text-stone-800">
            UTR / Transaction ID
          </label>
          <input
            type="text"
            value={utr}
            onChange={(e) => setUtr(e.target.value)}
            placeholder="Enter UTR"
            className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring focus:ring-amber-300"
          />
        </div>

        {/* Image Upload */}
        <div className="mt-6">
          <label className="text-sm font-semibold text-stone-800">
            Upload Payment Screenshot
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full mt-2"
          />

          {/* Preview */}
          {previewImage && (
            <div className="mt-3">
              <img
                src={previewImage}
                alt="Preview"
                className="w-10 h-10 object-cover rounded-lg border"
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full mt-8 h-12 rounded-lg bg-linear-to-r from-amber-400 to-amber-500 text-stone-900 font-semibold shadow-md hover:from-amber-500 hover:to-amber-600"
        >
          Submit Payment Proof
        </button>
      </div>
    </div>
  );
}
