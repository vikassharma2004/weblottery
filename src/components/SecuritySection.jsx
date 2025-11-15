import { ShieldCheck, KeyRound, MailCheck, Lock } from "lucide-react";

export function SecuritySection() {
  const features = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-emerald-600" />,
      title: "Secure Authentication",
      desc: "Your login is protected with JWT-based authentication ensuring safe and encrypted access.",
    },
    {
      icon: <KeyRound className="w-8 h-8 text-amber-500" />,
      title: "OTP Verification",
      desc: "Every account is verified via OTP to prevent fake registrations and unauthorized access.",
    },
    {
      icon: <MailCheck className="w-8 h-8 text-blue-600" />,
      title: "Email Verification",
      desc: "We verify your email identity for additional security and password recovery support.",
    },
    {
      icon: <Lock className="w-8 h-8 text-stone-700" />,
      title: "Encrypted Data",
      desc: "All passwords are encrypted using industry-standard hashing to protect your data.",
    }
  ];

  return (
    <section className="w-full py-20 px-6 bg-white">
      <h2 className="text-3xl font-bold text-center mb-4 text-stone-900">
        Secure & Transparent
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto text-center mb-12">
        Your safety is our top priority. We use modern security systems to ensure all your 
        transactions, data, and referrals are fully protected.
      </p>

      {/* FEATURES */}
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {features.map((item, i) => (
          <div
            key={i}
            className="bg-stone-50 border border-stone-200 p-6 rounded-xl shadow-sm text-center hover:shadow-md transition"
          >
            <div className="flex justify-center mb-4">{item.icon}</div>
            <h3 className="text-lg font-semibold text-stone-900 mb-2">
              {item.title}
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
