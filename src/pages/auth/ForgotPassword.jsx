import { useState } from "react";
import { Mail, ArrowRight, Loader2 } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import { COLORS } from "../../constant";
import { useSendResetToken } from "../../hooks/auth/AuthMutation";
import FloatingSupportButton from "../../components/FloatingSupportButton";
const ForgotPassword = () => {
  const { mutate: sendResetToken, isPending } = useSendResetToken();
  const [email, setEmail] = useState("");
 

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!email.trim()) return toast.error("Please enter your email address.");
   await sendResetToken({ email });
  };

  return (
    <div className="w-full space-y-6 overflow-hidden">
      <Toaster position="top-center" />

      {/* ---- Header ---- */}
      <div className="text-center select-none">
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: COLORS.TEXT }}
        >
          Forgot <span style={{ color: COLORS.PRIMARY }}>Password?</span>
        </h1>
        <p
          className="text-[15px] leading-relaxed"
          style={{ color: COLORS.TEXT_SECONDARY }}
        >
          Enter your registered email address below, and we’ll send you a secure
          reset link.
        </p>
      </div>

      {/* ---- Form ---- */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email Field */}
        <div>
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: COLORS.TEXT }}
          >
            Email Address
          </label>
          <div className="relative">
            <Mail
              className="absolute left-3 top-3.5 h-5 w-5"
              style={{ color: COLORS.TEXT_SECONDARY }}
            />
            <input
              type="email"
              name="email"
              value={email}
              
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full pl-10 pr-3 py-2.5 text-sm rounded-xl border focus:outline-none focus:ring-2 cursor-text transition-all"
              style={{
                borderColor: COLORS.BORDER,
                color: COLORS.TEXT,
                backgroundColor: COLORS.CARD,
                boxShadow: `0 1px 2px ${COLORS.SHADOW}`,
              }}
            />
          </div>
        </div>

        {/* ---- Submit Button ---- */}
        <button
          type="submit"
          disabled={isPending}
          className={`w-full flex items-center justify-center gap-2 py-3 font-semibold rounded-xl shadow-md transition-all duration-200 ${
            isPending
              ? "opacity-80 cursor-not-allowed"
              : "hover:scale-[1.02] cursor-pointer"
          }`}
          style={{
            backgroundImage: COLORS.PRIMARY_GRADIENT,
            color: COLORS.WHITE,
            boxShadow: `0 4px 10px ${COLORS.SHADOW}`,
          }}
        >
          {isPending? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
             
            </>
          ) : (
            <>
              Send Reset Link
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* ---- Footer ---- */}
      <p
        className="text-center text-sm mt-3 select-none"
        style={{ color: COLORS.TEXT_SECONDARY }}
      >
        Remembered your password?{" "}
        <a
          href="/auth/login"
          className="font-semibold hover:underline cursor-pointer"
          style={{ color: COLORS.SECONDARY }}
        >
          Go back to login
        </a>
      </p>

      {/* ---- Info Banner ---- */}
      <div
        className="text-center py-3 rounded-lg text-sm mt-6 select-none"
        style={{
          backgroundColor: COLORS.BACKGROUND,
          border: `1px solid ${COLORS.BORDER}`,
          color: COLORS.SECONDARY,
        }}
      >
        💡 Tip: Check your <strong>Spam</strong> or <strong>Promotions</strong>{" "}
        folder if you don’t see the email.
      </div>
      <FloatingSupportButton/>
    </div>
  );
};

export default ForgotPassword;
