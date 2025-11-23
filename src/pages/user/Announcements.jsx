"use client";

import React, { useMemo } from "react";
import BannerSection from "../../components/BannerSection";
import AnnouncementCard from "../../components/AnnouncementCard";
import { useAnnouncements } from "../../hooks/auth/AdminMutation";

export default function Announcement() {
  // Fetch only ACTIVE announcements for frontend
  const { data, isLoading } = useAnnouncements("active");

  const announcements = data?.announcements || [];

  // Extract banner
  const banner = useMemo(
    () => announcements.find((a) => a.type === "banner"),
    [announcements]
  );

  // Extract non-banner
  const otherAnnouncements = useMemo(
    () => announcements.filter((a) => a.type !== "banner"),
    [announcements]
  );

  return (
    <main className="min-h-screen bg-linear-to-b from-slate-50 to-slate-100">
      {/* Banner */}
      {banner && <BannerSection announcement={banner} />}

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Latest Updates
            </h1>
            <p className="mt-2 text-lg text-slate-600">
              Stay informed with our latest announcements and updates
            </p>
          </div>

          {isLoading ? (
            /* Loading skeleton */
            <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-32 rounded-lg bg-slate-200 animate-pulse"
                ></div>
              ))}
            </div>
          ) : otherAnnouncements.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
              {otherAnnouncements.map((announcement) => (
                <AnnouncementCard
                  key={announcement._id}
                  announcement={announcement}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border-2 border-dashed border-slate-300 py-12 text-center">
              <p className="text-slate-500">No announcements at the moment</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
