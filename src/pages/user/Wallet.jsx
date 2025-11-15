import React, { useState } from "react";
import { Wallet, ArrowDownCircle, ArrowUpCircle, Info } from "lucide-react";
import { useWalletInfo, useWithdraw } from "../../hooks/auth/AuthMutation";
import { useUserStore } from "../../store/AuthStrore";
import toast from "react-hot-toast";

export default function WalletPage() {
  const { user } = useUserStore();
  const [openWithdraw, setOpenWithdraw] = useState(false);

  if (!user) {
    toast.error("User not found");
  }

  const { data, isLoading, error } = useWalletInfo();

  if (isLoading)
    return (
      <div className="p-10 text-center text-lg font-semibold">
        Loading wallet...
      </div>
    );

  if (error)
    return (
      <div className="p-10 text-center text-red-500">
        Failed to fetch wallet data.
      </div>
    );

  const wallet = data?.wallet;
  const balance = wallet?.walletBalance || 0;
  const transactions = wallet?.recentTransactions || [];

  const totalEarnings = transactions
    .filter((t) => t.type === "credit")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="min-h-screen bg-linear-to-b from-stone-50 to-stone-100 pb-12">
      <main
        className="
          w-full 
          mx-auto 
          px-0 sm:px-4 md:px-6 
          py-4 
          flex flex-col gap-10
        "
      >
        {/* BALANCE CARD */}
        <section
          className="
            bg-white rounded-2xl shadow-md border border-stone-200
            p-5 sm:p-6 md:p-8
            transition-all
          "
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-amber-100 flex items-center justify-center">
              <Wallet className="w-7 h-7 sm:w-8 sm:h-8 text-amber-600" />
            </div>

            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-stone-800">
                Available Balance
              </h2>
              <p className="text-stone-500 text-xs sm:text-sm">
                Withdraw instantly once eligible
              </p>
            </div>
          </div>

          {/* Balance + Withdraw */}
          <div className="mt-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
            {/* Balance Numbers */}
            <div>
              <p className="text-4xl sm:text-5xl font-bold text-stone-900">
                ₹{balance}
              </p>

              <p className="mt-2 text-stone-500 text-sm">
                Total Earnings:{" "}
                <span className="font-semibold text-stone-700">
                  ₹{totalEarnings}
                </span>
              </p>
            </div>

            {/* Withdraw Button */}
            {balance > 0 ? (
              <button
                onClick={() => setOpenWithdraw(true)}
                className="
                  w-full md:w-auto px-6 sm:px-8 py-3
                  bg-gradient-to-r from-amber-400 to-amber-500
                  text-stone-900 font-semibold rounded-xl shadow-sm
                  hover:from-amber-500 hover:to-amber-600 transition
                "
              >
                Withdraw
              </button>
            ) : (
              <button
                className="
                  w-full md:w-auto px-6 sm:px-8 py-3
                  bg-stone-200 text-stone-500 cursor-not-allowed rounded-xl shadow-sm
                "
              >
                Withdraw
              </button>
            )}
          </div>
        </section>

        {/* HOW YOU EARN */}
        <section
          className="
            bg-white rounded-2xl shadow-sm border border-stone-200
            p-5 sm:p-6 md:p-8
          "
        >
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-stone-800 mb-6">
            How You Earn Rewards
          </h3>

          <div className="space-y-8">
            {[
              "Earn ₹100 for every friend who registers using your referral code.",
              "Earnings are credited instantly once they complete payment.",
              "Withdraw anytime when your available balance is above ₹0.",
            ].map((text, i) => (
              <div key={i} className="flex gap-3 items-start">
                <Info className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 mt-1" />
                <p className="text-stone-600 text-sm sm:text-base">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TRANSACTION HISTORY */}
        <section
          className="
            bg-white rounded-2xl shadow-sm border border-stone-200
            p-5 sm:p-6 md:p-8
          "
        >
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-stone-800 mb-6">
            Transaction History
          </h3>

          {transactions.length === 0 ? (
            <p className="text-stone-500 text-center py-6">
              No transactions found
            </p>
          ) : (
            <div className="flex flex-col divide-y divide-stone-100">
              {transactions.map((t) => (
                <div
                  key={t._id}
                  className="py-4 flex items-center justify-between"
                >
                  {/* Left Details */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    {t.type === "credit" ? (
                      <ArrowDownCircle className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                    ) : (
                      <ArrowUpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
                    )}

                    <div>
                      <p className="font-semibold text-stone-800 text-sm sm:text-base">
                        {t.message}
                      </p>
                      <p className="text-xs text-stone-500">
                        {new Date(t.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Amount */}
                  <p
                    className={`text-sm sm:text-lg font-bold ${
                      t.type === "credit" ? "text-emerald-600" : "text-red-500"
                    }`}
                  >
                    {t.type === "credit" ? "+ " : "- "}₹{t.amount}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* 🔥 Withdraw Modal */}
      {openWithdraw && (
        <WithdrawModal
          balance={balance}
          onClose={() => setOpenWithdraw(false)}
        />
      )}
    </div>
  );
}

/* ===========================================================
                  WITHDRAW MODAL COMPONENT
=========================================================== */

function WithdrawModal({ balance, onClose }) {
  const [amount, setAmount] = React.useState("");
  const [upi, setUpi] = React.useState("");
  const { mutate: withdraw, isPending } = useWithdraw();

  const handleSubmit = () => {
    if (!amount || amount <= 0) {
      return toast.error("Enter a valid amount");
    }
    if (amount > balance) {
      return toast.error("Amount exceeds wallet balance");
    }

    const upiRegex = /^[\w.-]+@[\w.-]+$/;
    if (!upiRegex.test(upi)) {
      return toast.error("Enter a valid UPI ID");
    }

    withdraw(
      { amount, upiId: upi },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* MODAL */}
      <div className="relative bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold text-stone-900 text-center">
          Withdraw Funds
        </h2>

        <p className="text-center text-stone-500 mt-1 text-sm">
          Balance Available: ₹{balance}
        </p>

        {/* Amount */}
        <div className="mt-6">
          <label className="text-sm font-medium text-stone-700">
            Enter Amount
          </label>
          <input
            type="number"
            className="w-full mt-2 p-3 border rounded-lg bg-stone-50 border-stone-300"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>

        {/* UPI */}
        <div className="mt-4">
          <label className="text-sm font-medium text-stone-700">
            UPI ID
          </label>
          <input
            type="text"
            className="w-full mt-2 p-3 border rounded-lg bg-stone-50 border-stone-300"
            placeholder="example@upi"
            value={upi}
            onChange={(e) => setUpi(e.target.value)}
          />
        </div>

        {/* Submit */}
        <button
          disabled={isPending}
          onClick={handleSubmit}
          className={`w-full h-12 mt-6 rounded-lg font-semibold text-stone-900 
            bg-gradient-to-r from-amber-400 to-amber-500 shadow-md
            hover:from-amber-500 hover:to-amber-600 transition
            ${isPending ? "opacity-60 cursor-not-allowed" : ""}
          `}
        >
          {isPending ? "Processing..." : "Submit Withdrawal"}
        </button>
      </div>
    </div>
  );
}
