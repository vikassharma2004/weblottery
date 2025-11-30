import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ_DATA = [
  {
    question: "Why is my account suspended?",
    answer:
      "Your account may be suspended due to policy violations, multiple failed verification attempts, or suspicious activity. Contact support for clarification or reinstatement.",
  },
  {
    question: "How much time does it take for withdrawal?",
    answer:
      "Withdrawals typically take 1–3 business days to reflect in your bank account, depending on your payment provider and transaction volume.",
  },
  {
    question: "How to withdraw?",
    answer:
      "Go to your Wallet section, tap on 'Withdraw', enter the desired amount, and confirm your request. Ensure your bank details are verified before initiating withdrawal.",
  },
  {
    question: "How to update profile details?",
    answer:
      "Profile updates are currently restricted as per our rules and regulations. If you need to correct critical information, please contact support for manual verification and assistance.",
  },
  {
    question: "What if my withdrawal UPI ID is incorrect?",
    answer:
      "Report the issue immediately. If the payment has not been processed yet, we may cancel it. After processing, the amount cannot be reversed.",
  },
  {
    question: "How much do I earn per referral?",
    answer:
      "You earn ₹100 for every successful referral, once the person you referred completes payment using your referral code.",
  },
  {
    question: "Where can I report an issue?",
    answer:
      "You can report issues from the 'Profile' section. If you're unable to log in, use the 'Report Issue' option on the Login screen.",
  },
 {
  question: "How can I contact support?",
  answer:
    "If you need direct assistance, you can email our support team at support@spinshare.in and we’ll help you as soon as possible.",
},

];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 text-center">
        Frequently Asked Questions
      </h2>

      <div className="mt-10 space-y-4">
        {FAQ_DATA.map((item, idx) => (
          <div
            key={idx}
            className="bg-white border border-stone-200 rounded-2xl shadow-sm"
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full flex justify-between items-center px-5 py-4 cursor-pointer"
            >
              <span className="text-base sm:text-lg font-semibold text-stone-900 text-left">
                {item.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-stone-600 transition-transform ${
                  openIndex === idx ? "rotate-180" : ""
                }`}
              />
            </button>

            {openIndex === idx && (
              <div className="px-5 pb-5 text-stone-700 text-sm sm:text-base">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
