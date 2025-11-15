import { Bell, Wallet, LifeBuoy, RefreshCw, Users, Shield } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: <Wallet className="w-7 h-7 text-amber-500" />,
      title: "Wallet & Earnings",
      desc: "Track your referral income, withdrawal requests, and full transaction history.",
    },
    {
      icon: <Bell className="w-7 h-7 text-blue-500" />,
      title: "Smart Notifications",
      desc: "Stay updated with payment confirmations, referral activity, and alerts.",
    },
    {
      icon: <LifeBuoy className="w-7 h-7 text-emerald-600" />,
      title: "Dedicated Support",
      desc: "Raise issues, get quick responses, and track your support requests.",
    },
    {
      icon: <RefreshCw className="w-7 h-7 text-purple-600" />,
      title: "Account & Password Reset",
      desc: "Secure email-based account recovery and password reset options.",
    },
    {
      icon: <Users className="w-7 h-7 text-amber-600" />,
      title: "Referral Tracking",
      desc: "Monitor invited users, successful referrals, and earnings per friend.",
    },
    {
      icon: <Shield className="w-7 h-7 text-red-500" />,
      title: "Secure System",
      desc: "Protected with JWT auth, OTP verification, and encrypted login security.",
    },
  ];

  return (
    <section className="w-full py-20 px-6 bg-white">
      <h2 className="text-3xl font-bold text-center mb-10 text-stone-900">
        Powerful Features
      </h2>

      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <div
            key={i}
            className="p-6 bg-stone-50 border border-stone-200 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center gap-3 mb-3">
              {f.icon}
              <h3 className="text-lg font-semibold text-stone-900">{f.title}</h3>
            </div>
            <p classname="text-sm text-stone-600 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
