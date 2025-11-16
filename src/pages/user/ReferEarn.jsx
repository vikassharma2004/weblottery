import React, { useEffect, useState } from "react";
import { Copy, Users, ArrowRight, Loader2 } from "lucide-react";
import { authImages } from "../../image";
import { useUserStore } from "../../store/AuthStrore";
import { useReferralSummary } from "../../hooks/auth/AuthMutation";
import { PaymentModal } from "../../components/paymentModal";
import toast from "react-hot-toast";

const front = import.meta.env.VITE_API_FRONTEND_URL;

export default function ReferEarnPage() {
  const { user } = useUserStore();
  const [openPaymentModal, setOpenPaymentModal] = useState(false);

  const [copied, setCopied] = useState(false);

  // ⬅️ Fetch referral data from backend
  const { data, isLoading, error } = useReferralSummary();

 if (isLoading) {
  return (
    <div className="flex justify-center py-20">
      <Loader2 className="w-10 h-10 text-amber-500 animate-spin" />
    </div>
  );
}

  if (error) {
  return (
    <div className="p-10 text-center text-red-600">
      failed to load data.
    </div>
  );
}


  // backend response → data.data
  const info = data?.data;

  const referralLink = `${front}/ref/${info?.referCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-stone-50 to-stone-100">
      {/* Top Banner */}
      <div className="w-full bg-emerald-50 border-y border-emerald-200 py-5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="w-full flex items-center justify-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-emerald-100">
              <Users className="w-5 h-5 text-emerald-700" />
            </div>
            <span className="text-base md:text-lg font-semibold text-emerald-700 text-center whitespace-nowrap">
              Till now, <span className="font-bold">3+ users</span> have trusted
              us
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Image */}
          <div className="flex items-center justify-center">
            <div className="w-full aspect-square max-w-md">
              <img src={authImages.refer} alt="refer" />
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col justify-center gap-8">
            {/* Heading */}
            <div>
              <h2 className="text-3xl font-bold text-stone-900 md:text-4xl">
                Earn ₹100 for every friend you invite!
              </h2>
              <p className="mt-4 text-lg text-stone-600 leading-relaxed">
                Invite your friends using your unique link. When they register
                and complete their payment, you instantly earn ₹100.
              </p>
            </div>

            {/* Referral Code Box */}
            <div className="rounded-xl bg-white p-6 border border-stone-200 shadow-sm">
              <label className="block text-sm font-semibold text-stone-700 mb-3">
                {info.hasPaid ? "Your Referral Code" : "Referral Locked"}
              </label>

              {info.hasPaid ? (
                <>
                  {/* CODE + COPY */}
                  <div className="flex gap-3 items-center">
                    <div className="flex-1 px-4 py-3 rounded-lg bg-stone-50 border border-stone-200">
                      <code className="font-mono text-lg font-semibold text-stone-900">
                        {info.referCode}
                      </code>
                    </div>

                    <button
                      onClick={handleCopy}
                      className="flex items-center justify-center w-12 h-12 rounded-lg bg-amber-400 hover:bg-amber-500 transition-colors text-stone-900 shadow-sm"
                    >
                      <Copy className="w-5 h-5" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="px-4 py-4 rounded-lg bg-stone-100 border border-stone-200 text-stone-600 text-sm">
                  Complete your payment to unlock your referral link and start
                  earning rewards.
                </div>
              )}

              {copied && (
                <p className="text-sm text-emerald-600 font-medium mt-2">
                  Referral link copied!
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3 pt-4">
              {info.hasPaid ? (
                <button className="h-12 bg-linear-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-stone-900 font-semibold text-base rounded-lg shadow-md flex items-center justify-center transition-all">
                  Refer a Friend
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              ) : (
                <button
                  onClick={() => setOpenPaymentModal(true)}
                  className="h-12 bg-green-500 text-black-500 font-semibold text-base rounded-lg cursor-pointer"
                >
                  Make Payment to Unlock Referrals
                </button>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-stone-200">
              <div>
                <div className="text-2xl font-bold text-amber-500">
                  {info.totalReferrals}
                </div>
                <p className="text-sm text-stone-600 mt-1">Friends Referred</p>
              </div>

              <div>
                <div className="text-2xl font-bold text-amber-500">
                  ₹{info.amountEarned}
                </div>
                <p className="text-sm text-stone-600 mt-1">Total Earned</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openPaymentModal && (
        <PaymentModal
          amount={500} // or whatever amount you want
          onClose={() => setOpenPaymentModal(false)}
        />
      )}
    </div>
  );
}
