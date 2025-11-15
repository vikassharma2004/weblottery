import { useEffect, useState, useRef } from "react";
import { toast, Toaster } from "react-hot-toast";
import { COLORS } from "../../constant";
import { ArrowRight } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useGenerateOtp,useVerifyOtp } from "../../hooks/auth/AuthMutation";
const VerifyOtp = () => {
  const OTP_LENGTH = 6;
const { mutateAsync: generateOtp, isPending: isGeneratingOtp } = useGenerateOtp();
const { mutate: verifyOtp, isPending: isVerifyingOtp } = useVerifyOtp();
  // ------ Get Email from Router ------
  const { state } = useLocation();
  const initialEmail = state?.email || "";         // from login redirect
  const action = state?.action || "verifyEmail";   // optional

  const [email, setEmail] = useState(initialEmail); // editable email

  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [timeLeft, setTimeLeft] = useState(45);
  const [resendDisabled, setResendDisabled] = useState(true);
  const inputRefs = useRef([]);

  // ---- Timer Logic ----
  useEffect(() => {
    if (!resendDisabled) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [resendDisabled]);

  // ---- Handle OTP Input ----
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, OTP_LENGTH).split("");

    const newOtp = [...otp];
    pasteData.forEach((digit, i) => {
      if (/^[0-9]$/.test(digit)) newOtp[i] = digit;
    });

    setOtp(newOtp);
  };

  // ---- Verify OTP ----
  const handleVerify = async(e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    if (!email) {
      toast.error("Email is required.");
      return;
    }

    if (enteredOtp.length < OTP_LENGTH) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }

    await verifyOtp({ email, otp: enteredOtp, type:action });
   
  };

  // ---- Resend OTP ----
  const handleResendOtp = () => {
    if (resendDisabled) return;

    if (!email) {
      toast.error("Enter your email first.");
      return;
    }

    
    generateOtp({ email, type:action });
    setOtp(Array(OTP_LENGTH).fill(""));
    setResendDisabled(true);
    setTimeLeft(45);

   
  };

  return (
    <div className="w-full space-y-8">
      <Toaster position="top-center" />

      {/* ---- Header ---- */}
      <div className="text-center select-none">
        <h1 className="text-3xl font-bold mb-2" style={{ color: COLORS.TEXT }}>
          Verify <span style={{ color: COLORS.PRIMARY }}>OTP</span>
        </h1>

        <p className="text-[15px]" style={{ color: COLORS.TEXT_SECONDARY }}>
          Enter the 6-digit code sent to your email below.
        </p>

        {/* Email Input Field */}
        <div className="mt-4 flex flex-col items-center">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="px-4 py-2 rounded-lg border text-center text-sm w-64"
            style={{
              borderColor: COLORS.BORDER,
              color: COLORS.TEXT,
              backgroundColor: COLORS.CARD,
            }}
          />
        </div>
      </div>

      {/* ---- OTP Inputs ---- */}
      <form onSubmit={handleVerify} className="flex flex-col items-center gap-6">
        <div className="flex justify-center gap-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              className="w-12 h-14 text-center text-xl font-semibold border rounded-xl focus:ring-2 transition-all"
              style={{
                borderColor: COLORS.BORDER,
                color: COLORS.TEXT,
                backgroundColor: COLORS.CARD,
              }}
            />
          ))}
        </div>

        {/* Verify Button */}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 py-3 px-6 font-semibold rounded-xl shadow-md hover:scale-[1.02] transition-all"
          style={{
            backgroundImage: COLORS.PRIMARY_GRADIENT,
            color: COLORS.WHITE,
          }}
        >
          Verify OTP
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* ---- Resend OTP ---- */}
      <div className="text-center text-sm mt-4 select-none">
        {resendDisabled ? (
          <p style={{ color: COLORS.TEXT_SECONDARY }}>
            Resend OTP in <span style={{ color: COLORS.PRIMARY }}>{timeLeft}s</span>
          </p>
        ) : (
          <button
            onClick={handleResendOtp}
            className="font-semibold hover:underline"
            style={{ color: COLORS.SECONDARY }}
          >
            Resend OTP
          </button>
        )}
      </div>
    </div>
  );
};

export default VerifyOtp;
