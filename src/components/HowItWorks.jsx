import { ArrowRight } from "lucide-react";

export function HowItWorks() {
  const steps = [
    "Create your account",
    "Verify using OTP",
    "Make your first payment",
    "Get your referral code",
    "Earn ₹100 per referral"
  ];

  return (
    <section className="w-full py-25 px-6 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-12 text-stone-900">
        How It Works
      </h2>

      {/* DESKTOP LAYOUT (HORIZONTAL) */}
      <div className="max-w-6xl mx-auto gap-2 hidden md:flex md:flex-row items-center md:justify-between md:gap-8">

        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-4 md:gap-2">

            {/* STEP TEXT */}
            <div className="text-center md:text-left">
              <p className="font-semibold text-stone-800 text-base md:text-lg whitespace-nowrap">
                {step}
              </p>
            </div>

            {/* ARROW (Hidden for last step) */}
            {i !== steps.length - 1 && (
              <div className="md:flex">
                <ArrowRight className="text-amber-500 w-6 h-6" />
              </div>
            )}

          </div>
        ))}
      </div>

      {/* MOBILE LAYOUT (VERTICAL) */}
      <div className="md:hidden mt-10 flex flex-col items-center gap-4">
        {steps.map((step, i) => (
          <div key={i} className="flex flex-col items-center">
            <p className="font-medium text-stone-800 text-base">{step}</p>

            {i !== steps.length - 1 && (
              <ArrowRight className="text-amber-500 w-5 h-5 rotate-90 my-2" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
