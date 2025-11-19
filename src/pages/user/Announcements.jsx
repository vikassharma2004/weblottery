import React, { useMemo } from "react";
import BannerSection from "../../components/BannerSection";
import AnnouncementCard from "../../components/AnnouncementCard";

const DUMMY_ANNOUNCEMENTS = [
  {
    _id: "banner-1",
    title: "🎉 Big Lottery Announcement!",
    message: "Congratulations! ₹5000 credited to 20 lucky SpinShare users!",
    type: "banner",
    createdAt: "2025-01-14",
  },
  {
    _id: "1",
    title: "Account Verification",
    message: "Please verify your KYC details to avoid restrictions.",
    type: "danger",
    createdAt: "2025-01-12",
  },
  {
    _id: "2",
    title: "UPI Payment Enabled",
    message: "We now support fast and secure UPI payments.",
    type: "success",
    createdAt: "2025-01-10",
  },
  {
    _id: "3",
    title: "Scheduled Maintenance",
    message: "The app will be under maintenance from 1 AM to 3 AM.",
    type: "warning",
    createdAt: "2025-01-05",
  },
  {
    _id: "4",
    title: "New Feature Update",
    message: "UI improvements + new referral dashboard launched.",
    type: "info",
    createdAt: "2025-01-02",
  },
];

export default function Announcement() {
  const banner = useMemo(
    () => DUMMY_ANNOUNCEMENTS.find((a) => a.type === "banner"),
    []
  );

  const otherAnnouncements = useMemo(
    () => DUMMY_ANNOUNCEMENTS.filter((a) => a.type !== "banner"),
    []
  );

  return (
    <main className="min-h-screen bg-linear-to-b from-slate-50 to-slate-100">
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

          <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
            {otherAnnouncements.map((announcement) => (
              <AnnouncementCard
                key={announcement._id}
                announcement={announcement}
              />
            ))}
          </div>

          {otherAnnouncements.length === 0 && (
            <div className="rounded-lg border-2 border-dashed border-slate-300 py-12 text-center">
              <p className="text-slate-500">No announcements at the moment</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
