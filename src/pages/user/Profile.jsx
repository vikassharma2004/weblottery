import React from "react";
import { User, Mail, Phone, Users, Wallet } from "lucide-react";

import { useUserStore } from "../../store/AuthStrore";

export default function ProfilePage() {
  const {user}=useUserStore();
 

  return (
    <div className="min-h-screen bg-linear-to-br from-stone-50 to-stone-100 py-12 px-0">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900">
          Profile
        </h1>

        {/* Modern Form Container */}
        <form className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-stone-200 p-8 space-y-10">

          {/* Section: Personal Info */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-stone-800">Personal Information</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Email */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-stone-500 flex gap-2 items-center">
                  <Mail className="w-4 h-4" /> Email
                </label>
                <input
                  disabled
                  value={user.email}
                  className="w-full px-4 py-3 bg-stone-100 text-stone-800 rounded-xl border border-stone-200 cursor-not-allowed"
                />
              </div>
              {/* Phone */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-stone-500 flex gap-2 items-center">
                  <Phone className="w-4 h-4" /> Phone
                </label>
                <input
                  disabled
                  value={user.phone || "N/A"}
                  className="w-full px-4 py-3 bg-stone-100 text-stone-800 rounded-xl border border-stone-200 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Section: Wallet */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-stone-800 flex items-center gap-2">
              <Wallet className="w-5 h-5 text-amber-600" />
              Wallet
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-sm font-medium text-stone-500">Wallet Balance</label>
                <input
                  disabled
                  value={"₹" + user.walletBalance}
                  className="w-full px-4 py-3 bg-stone-100 text-stone-800 rounded-xl border border-stone-200 cursor-not-allowed font-semibold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-stone-500">Joined On</label>
                <input
                  disabled
                  value={user.createdAt}
                  className="w-full px-4 py-3 bg-stone-100 text-stone-800 rounded-xl border border-stone-200 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Section: Referrals */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-stone-800 flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-600" />
              Referral Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-sm font-medium text-stone-500">Referral Code</label>
                <input
                  disabled
                  value={user.referralCode || "N/A"}
                  className="w-full px-4 py-3 bg-stone-100 text-stone-800 rounded-xl border border-stone-200 cursor-not-allowed"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-stone-500">Total Referrals</label>
                <input
                  disabled
                  value={user.referralCount}
                  className="w-full px-4 py-3 bg-stone-100 text-amber-700 font-semibold rounded-xl border border-stone-200 cursor-not-allowed"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-stone-500">Successful Referrals</label>
                <input
                  disabled
                  value={user.successfulReferrals}
                  className="w-full px-4 py-3 bg-stone-100 text-emerald-700 font-semibold rounded-xl border border-stone-200 cursor-not-allowed"
                />
              </div>

              {user.referredBy?.email && (
                <div className="space-y-1">
                  <label className="text-sm font-medium text-stone-500">Referred By</label>
                  <input
                    disabled
                    value={user.referredBy.email}
                    className="w-full px-4 py-3 bg-stone-100 text-stone-800 rounded-xl border border-stone-200 cursor-not-allowed"
                  />
                </div>
              )}
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
