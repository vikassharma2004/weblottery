import React, { useState } from "react";
import { X } from "lucide-react";

export default function BannerSection({ announcement }) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative overflow-hidden bg-linear-to-r from-emerald-500 via-teal-500 to-cyan-500 z-0">
      {/* Floating blurred circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -right-40 -bottom-40 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
      </div>

      <div className="relative px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              {announcement.title}
            </h2>
            <p className="mt-2 text-lg text-white/90">
              {announcement.message}
            </p>
            <p className="mt-3 text-sm text-white/70">
              {new Date(announcement.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={() => setIsVisible(false)}
            className="rounded-full bg-white/20 p-2 hover:bg-white/30 transition"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
