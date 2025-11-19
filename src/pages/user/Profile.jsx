import React from "react";
import { User, Mail, Phone, Users, Wallet, Loader2 } from "lucide-react";
import { useUserStore } from "../../store/AuthStrore";
import { useProfile } from "../../hooks/auth/AuthMutation";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { clearAuth } = useUserStore();

  // Fetch profile
  const { data, isLoading, error } = useProfile();

  
   if(error?.response?.data?.message=="Session expired"){
    toast.error("Session expired logging out...")
    clearAuth();
  }
  // Handle session expired
  React.useEffect(() => {
    if (!error) return;

    const msg =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";

    if (msg.toLowerCase().includes("session expired")) {
      toast.error("Session expired! Please login again.");
      clearAuth();
      navigate("/login");
    }
  }, [error, clearAuth, navigate]);

 if (isLoading) {
  return (
    <div className="flex justify-center py-20">
      <Loader2 className="w-10 h-10 text-amber-500 animate-spin" />
    </div>
  );
}

  if (error) {
    return (
      <div className="p-10 text-center text-red-500">
        Session expired. Redirecting...
      </div>
    );
  }

  // Memoize user data to avoid useless re-renders
  const user =data?.user

  return (
    <div className="min-h-screen bg-linear-to-br from-stone-50 to-stone-100 py-12 px-0">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900">
          Profile
        </h1>

        {/* Modern Form Container */}
        <form className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-stone-200 p-8 space-y-10">
          
       {/* PERSONAL INFO */}
<div className="space-y-6">
  <h2 className="text-xl font-bold text-stone-800">Personal Information</h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

    {/* Name */}
    <div className="space-y-1">
      <label className="text-sm font-medium text-stone-500">Full Name</label>
      <input
        disabled
        value={user.name}
        className="w-full px-4 py-3 bg-stone-100 text-stone-800 rounded-xl border border-stone-200"
      />
    </div>

    {/* Email */}
    <div className="space-y-1">
      <label className="text-sm font-medium text-stone-500">Email</label>
      <input
        disabled
        value={user.email}
        className="w-full px-4 py-3 bg-stone-100 text-stone-800 rounded-xl border border-stone-200"
      />
    </div>

  

    {/* Account Verified */}
    <div className="space-y-1">
      <label className="text-sm font-medium text-stone-500">Email Verified</label>
      <input
        disabled
        value={user.isVerified ? "Yes" : "No"}
        className="w-full px-4 py-3 bg-stone-100 text-stone-800 rounded-xl border border-stone-200"
      />
    </div>
    <div className="space-y-1">
      <label className="text-sm font-medium text-stone-500">Payment Complete</label>
      <input
        disabled
        value={user.hasPaid ? "Yes" : "No"}
        className="w-full px-4 py-3 bg-stone-100 text-stone-800 rounded-xl border border-stone-200"
      />
    </div>
  </div>
</div>


        {/* WALLET */}
<div className="space-y-6">
  <h2 className="text-xl font-bold text-stone-800 flex items-center gap-2">
    <Wallet className="w-5 h-5 text-amber-600" />
    Wallet & Payments
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

    {/* Wallet Balance */}
    <div className="space-y-1">
      <label className="text-sm font-medium text-stone-500">Wallet Balance</label>
      <input
        disabled
        value={`₹${user.walletBalance}`}
        className="w-full px-4 py-3 bg-stone-100 text-stone-900 font-semibold rounded-xl border border-stone-200"
      />
    </div>

    {/* Last Payment Date */}
    <div className="space-y-1">
      <label className="text-sm font-medium text-stone-500">Last Payment Date</label>
      <input
        disabled
        value={user.lastPaymentDate ? new Date(user.lastPaymentDate).toLocaleString() : "N/A"}
        className="w-full px-4 py-3 bg-stone-100 text-stone-800 rounded-xl border border-stone-200"
      />
    </div>

    {/* Payment Status */}
    <div className="space-y-1">
      <label className="text-sm font-medium text-stone-500">Payment Completed</label>
      <input
        disabled
        value={user.hasPaid ? "Yes" : "No"}
        className="w-full px-4 py-3 bg-stone-100 text-stone-800 rounded-xl border border-stone-200"
      />
    </div>

    {/* Tickets Count */}
    <div className="space-y-1">
      <label className="text-sm font-medium text-stone-500">Total Tickets</label>
      <input
        disabled
        value={user.ticketCount}
        className="w-full px-4 py-3 bg-stone-100 text-stone-800 rounded-xl border border-stone-200"
      />
    </div>

  </div>
</div>

{/* ACCOUNT STATUS */}
<div className="space-y-6">
  <h2 className="text-xl font-bold text-stone-800">Account Status</h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

    {/* Suspended? */}
    <div className="space-y-1">
      <label className="text-sm font-medium text-stone-500">Suspended</label>
      <input
        disabled
        value={user.isSuspended ? "Yes" : "No"}
        className="w-full px-4 py-3 bg-stone-100 text-stone-800 rounded-xl border border-stone-200"
      />
    </div>

    {/* Joined On */}
    <div className="space-y-1">
      <label className="text-sm font-medium text-stone-500">Joined On</label>
      <input
        disabled
        value={new Date(user.createdAt).toLocaleDateString()}
        className="w-full px-4 py-3 bg-stone-100 text-stone-800 rounded-xl border border-stone-200"
      />
    </div>

    {/* Last Updated */}
    <div className="space-y-1">
      <label className="text-sm font-medium text-stone-500">Last Updated</label>
      <input
        disabled
        value={new Date(user.updatedAt).toLocaleString()}
        className="w-full px-4 py-3 bg-stone-100 text-stone-800 rounded-xl border border-stone-200"
      />
    </div>

  </div>
</div>


        {/* REFERRALS */}
<div className="space-y-6">
  <h2 className="text-xl font-bold text-stone-800 flex items-center gap-2">
    <Users className="w-5 h-5 text-amber-600" />
    Referral Details
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

    {/* Referral Code */}
    <div className="space-y-1">
      <label className="text-sm font-medium text-stone-500">Referral Code</label>
      <input
        disabled
        value={user.referralCode || "N/A"}
        className="w-full px-4 py-3 bg-stone-100 text-stone-800 rounded-xl border border-stone-200"
      />
    </div>

    {/* Total Referrals */}
    <div className="space-y-1">
      <label className="text-sm font-medium text-stone-500">Total Referrals</label>
      <input
        disabled
        value={user.referralCount}
        className="w-full px-4 py-3 bg-stone-100 text-amber-700 font-semibold rounded-xl border border-stone-200"
      />
    </div>

    {/* Successful Referrals */}
    <div className="space-y-1">
      <label className="text-sm font-medium text-stone-500">Successful Referrals</label>
      <input
        disabled
        value={user.successfulReferrals}
        className="w-full px-4 py-3 bg-stone-100 text-emerald-700 font-semibold rounded-xl border border-stone-200"
      />
    </div>
  

  </div>
</div>


        </form>
      </div>
    </div>
  );
}
