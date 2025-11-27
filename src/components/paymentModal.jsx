"use client";

import React, { useState } from "react";
import { Loader2, Upload } from "lucide-react";
import { toast } from "react-toastify";
import {
  useActivePayment,
  useSubmitPaymentVerification,
} from "../hooks/auth/AdminMutation";
import { uploadToCloudinary } from "../hooks/auth/uploadimage";
export function PaymentModal({ amount, onClose }) {
  const { data: payment, isLoading } = useActivePayment();
  const { mutateAsync: submitVerification, isPending } =
    useSubmitPaymentVerification();

  // Local state
  const [proofFile, setProofFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [utr, setUtr] = useState("");
  const [uploading, setUploading] = useState(false);
  const [cloudImage, setCloudImage] = useState(null); // URL + publicId from Cloudinary

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProofFile(file);
    setPreview(URL.createObjectURL(file));
  };

  // ⬆️ UPLOAD BUTTON — only appears after user selects image
  const handleUploadToCloudinary = async () => {
    if (!proofFile) return;

    setUploading(true);

    try {
      const cloud = await uploadToCloudinary(proofFile);

      if (!cloud.secure_url) {
        toast.error("Upload failed");
        return;
      }

      setCloudImage({
        url: cloud.secure_url,
        publicId: cloud.public_id,
      });

      toast.success("Image uploaded");
    } catch (err) {
      toast.error("Cloud upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!cloudImage) return toast.error("Please upload proof first");
    if (!utr.trim()) return toast.error("Enter UTR");

    const formData = new FormData();
    formData.append("email", payment?.email || "");
    formData.append("utrId", utr);
    formData.append("proofImageUrl", cloudImage.url);
    formData.append("publicId", cloudImage.publicId);

    await submitVerification(formData, {
      onSuccess: () => onClose(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Scrollable wrapper */}
      <div className="relative bg-white w-[95%] max-w-xl rounded-2xl shadow-xl p-8 mt-10 mb-10 max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-stone-900 text-center">
          Activate Referral Earnings
        </h2>

        <p className="text-stone-600 mt-2 text-center text-sm">
          Scan the QR below or use UPI to pay the activation fee.
        </p>

        {/* QR Section */}
        {isLoading ? (
          <div className="mt-4 h-52 bg-gray-200 animate-pulse rounded-xl"></div>
        ) : (
          payment && (
            <div className="mt-4 bg-amber-50 border border-amber-200 p-3 rounded-xl flex flex-col items-center">
              <img
                src={payment.qrImage}
                className="w-48 h-48 rounded-lg shadow border border-amber-200"
              />

              <p className="mt-3 text-lg font-semibold text-stone-900">
                Amount: ₹{amount}
              </p>

              {payment.upiId && (
                <p className="text-sm text-stone-700 mt-1">
                  UPI ID: <span className="font-medium">{payment.upiId}</span>
                </p>
              )}

              {payment.instructions && (
                <p className="text-xs text-stone-500 mt-2 text-center">
                  {payment.instructions}
                </p>
              )}
            </div>
          )
        )}

        {/* STEP 1: Select file */}
        <div className="mt-6">
          <label className="text-sm font-semibold text-stone-800">
            Upload Payment Screenshot
          </label>

          {!preview ? (
            <label
              htmlFor="proofFileInput"
              className="w-full h-40 border-2 border-dashed border-amber-300 bg-amber-50 flex flex-col justify-center items-center rounded-xl cursor-pointer hover:bg-amber-100"
            >
              <Upload size={40} className="text-amber-500 mb-2" />
              <span className="text-amber-600 font-medium">
                Click to upload screenshot
              </span>
            </label>
          ) : (
            <div className="relative w-40 h-40 mt-2">
              <img
                src={preview}
                className="w-full h-full object-cover rounded-xl border border-amber-200"
              />
              <button
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6"
                onClick={() => {
                  setPreview(null);
                  setProofFile(null);
                  setCloudImage(null);
                }}
              >
                ×
              </button>
            </div>
          )}

          <input
            id="proofFileInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileSelect}
          />
        </div>

        {/* STEP 2: Upload button (only if selected file, not yet uploaded) */}
        {preview && !cloudImage && (
          <button
            disabled={uploading}
            onClick={handleUploadToCloudinary}
            className={`w-full mt-4 h-12 rounded-lg font-semibold bg-amber-500 text-stone-900 
              ${
                uploading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
          >
            {uploading ? (
              <Loader2 size={20} className=" w-5 h-5 animate-spin" />
            ) : (
              "Upload"
            )}
          </button>
        )}

        {/* STEP 3: UTR input (only after Cloud upload success) */}
        {cloudImage && (
          <div className="mt-6">
            <label className="text-sm font-semibold text-stone-800">
              Enter UTR / Transaction ID
            </label>
            <input
              type="text"
              value={utr}
              onChange={(e) => setUtr(e.target.value)}
              placeholder="Enter UTR"
              className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring focus:ring-amber-300"
            />
          </div>
        )}

        {/* STEP 4: Submit button */}
        {cloudImage && (
          <button
            disabled={isPending}
            onClick={handleSubmit}
            className={`w-full mt-8 h-12 rounded-lg font-semibold text-stone-900 bg-linear-to-r from-amber-400 to-amber-500 shadow-md 
              ${
                isPending ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
          >
            {isPending ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "Submit Payment Proof"
            )}
          </button>
        )}
      </div>
    </div>
  );
}
