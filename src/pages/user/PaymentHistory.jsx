import React, { useMemo, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  ArrowUpCircle,
  ArrowDownCircle,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";
import { usePaymentHistory } from "../../hooks/auth/AuthMutation";

export default function PaymentHistoryPage() {
  const [params, setParams] = useSearchParams();
  const status = params.get("status") || "all";

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = usePaymentHistory(status);

  const observerRef = useRef(null);

  // 🔥 Fix 1: Attach infinite scroll observer correctly
  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  // 🔥 Fix 2: Trigger fetch when status changes
  useEffect(() => {
    refetch();
  }, [status]);

  const updateFilter = (s) => setParams({ status: s });

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-emerald-600" />;
      case "pending":
        return <Clock className="w-5 h-5 text-amber-600" />;
      case "failed":
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-10 h-10 text-amber-500 animate-spin" />
      </div>
    );

  // Flatten all pages
  const allPayments = data?.pages.flatMap((p) => p.data) || [];

  return (
    <div className="min-h-screen bg-linear-to-br from-stone-50 to-stone-100 pb-20">
      <div className="max-w-6xl mx-auto px-0 sm:px-6 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-stone-900">
            Payment History
          </h1>

          {/* Filters */}
          <div className="flex gap-2 mt-4 sm:mt-0 overflow-x-auto no-scrollbar">
            {["all", "completed", "pending", "failed", "cancelled"].map((s) => (
              <button
                key={s}
                onClick={() => updateFilter(s)}
                className={`px-4 py-2 rounded-lg text-sm font-medium shadow-sm border ${
                  status === s
                    ? "bg-amber-400 border-amber-500 text-stone-900"
                    : "bg-white border-stone-200 text-stone-700 hover:bg-stone-100"
                }`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-7">
          {allPayments.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition p-5 sm:p-6"
            >
              {/* TOP */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  {p.type === "withdrawal" ? (
                    <ArrowDownCircle className="w-7 h-7 text-emerald-600" />
                  ) : (
                    <ArrowUpCircle className="w-7 h-7 text-red-500" />
                  )}

                  <div>
                    <p className="font-semibold text-stone-900 text-sm sm:text-base">
                      {p.type === "withdrawal"
                        ? `Withdrawal (${p.withdrawId})`
                        : "Deposit"}
                    </p>
                    <p className="text-xs text-stone-500">
                      {new Date(p.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {getStatusIcon(p.status)}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      p.status === "completed"
                        ? "bg-emerald-100 text-emerald-700"
                        : p.status === "pending"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="h-px bg-stone-200 my-4"></div>

              {/* DETAILS */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-stone-500 text-xs">Amount</p>
                  <p
                    className={`font-bold ${
                      p.type === "withdrawal"
                        ? "text-red-500"
                        : "text-emerald-600"
                    }`}
                  >
                    {p.type === "withdrawal" ? "- " : "+ "}₹{p.amount}
                  </p>
                </div>

                <div>
                  <p className="text-stone-500 text-xs">Before</p>
                  <p className="font-semibold">₹{p.balanceBefore}</p>
                </div>

                <div>
                  <p className="text-stone-500 text-xs">After</p>
                  <p className="font-semibold">₹{p.balanceAfter}</p>
                </div>

                <div>
                  <p className="text-stone-500 text-xs">Method</p>
                  <p className="font-semibold">{p.method.toUpperCase()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty */}
        {allPayments.length === 0 && (
          <p className="text-center py-10 text-stone-500">
            No payment history found.
          </p>
        )}

        {/* Infinite Scroll */}
        <div ref={observerRef} className="py-10 flex justify-center">
          {isFetchingNextPage && (
            <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
          )}
        </div>
      </div>
    </div>
  );
}
