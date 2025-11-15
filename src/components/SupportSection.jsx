import { useState } from "react";
import { HelpCircle, MessageSquare, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FAQ_HOME = [
  {
    q: "Why is my account suspended?",
    a: "Your account may be suspended due to policy violations or suspicious activity. Contact support for help.",
  },
  {
    q: "How much time does withdrawal take?",
    a: "Withdrawals usually take 1–3 business days depending on your payment provider.",
  },
  {
    q: "How much do I earn per referral?",
    a: "You earn ₹100 for every successful referral once they complete their payment.",
  },
];

export function SupportSection() {
  const [showFAQ, setShowFAQ] = useState(false);
  const navigate = useNavigate();

  return (
    <section className="w-full py-20 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto text-center">

        {/* Heading */}
        <h2 className="text-3xl font-bold mb-4 text-stone-900">
          Help & Support
        </h2>

        <p className="text-gray-600 max-w-xl mx-auto mb-10">
          Need assistance? Find quick answers or contact our support team anytime.
        </p>

        {/* Support Options */}
        <div className="flex justify-center gap-4 flex-wrap mb-10">

          {/* Toggle FAQ Button */}
          <button
            onClick={() => setShowFAQ(!showFAQ)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-stone-200 shadow-sm hover:shadow-md transition font-semibold"
          >
            <HelpCircle className="w-5 h-5 text-amber-500" />
            {showFAQ ? "Hide FAQs" : "View FAQs"}
            {showFAQ ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>

          {/* Support Page Button */}
          <button
            onClick={() => navigate("/support")}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 shadow-md hover:scale-[1.02] transition font-semibold text-stone-900"
          >
            <MessageSquare className="w-5 h-5 text-stone-900" />
            Contact Support
          </button>

        </div>

        {/* FAQ DROPDOWN SECTION */}
        {showFAQ && (
          <div className="max-w-3xl mx-auto space-y-4 text-left">

            {FAQ_HOME.map((faq, i) => (
              <div
                key={i}
                className="p-5 bg-white rounded-xl shadow-sm border border-stone-200"
              >
                <p className="font-semibold text-stone-900">{faq.q}</p>
                <p className="text-sm text-stone-600 mt-2 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}

          </div>
        )}
      </div>
    </section>
  );
}
