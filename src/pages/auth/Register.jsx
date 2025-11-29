import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Gift, Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import { COLORS } from "../../constant";
import { useRegister } from "../../hooks/auth/AuthMutation";
import FloatingSupportButton from "../../components/FloatingSupportButton";
import { useUserStore } from "../../store/AuthStrore";
const Register = () => {
    const register = useRegister();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {user}=useUserStore();
  const [referralCode, setReferralCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState({ password: false, confirm: false });

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

    if (user && user.role === "admin") {
  navigate("/admin/dashboard");
} else if (user && user.role === "user") {
  navigate("/dashboard");
}
  // ✅ Capture referral code from URL
  useEffect(() => {
    const code = searchParams.get("referralCode");
    if (code) setReferralCode(code);
  }, [searchParams]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error("All fields are required!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    if(formData.password?.length<6){
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
   register.mutate(
    {
      name: formData.fullName,
      email: formData.email,
      password: formData.password,
      referralCode: referralCode,
    },
    {
       
      onSuccess: () => {
        navigate("/auth/verify-otp", {
          state: { 
            email: formData?.email,     // backend must return this
            action: "verifyEmail",
          },
        });
      },
    }
  );
  };

  return (
    <div className="w-full space-y-6">
      <Toaster position="top-center" />

      {/* ---- Header ---- */}
      <div className="text-center select-none">
        <h1 className="text-3xl font-bold mb-2" style={{ color: COLORS.TEXT }}>
          Create <span style={{ color: COLORS.PRIMARY }}>Account</span>
        </h1>
        <p className="text-[15px]" style={{ color: COLORS.TEXT_SECONDARY }}>
          Join <strong>SpinShare</strong> and start earning rewards today!
        </p>
      </div>

      {/* ---- Form ---- */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: COLORS.TEXT }}>
            Full Name
          </label>
          <div className="relative">
            <User
              className="absolute left-3 top-3.5 h-5 w-5"
              style={{ color: COLORS.TEXT_SECONDARY }}
            />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="John Doe"
              className="w-full pl-10 pr-3 py-2.5 text-sm rounded-xl border focus:outline-none focus:ring-2 cursor-text"
              style={{
                borderColor: COLORS.BORDER,
                color: COLORS.TEXT,
                backgroundColor: COLORS.CARD,
              }}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: COLORS.TEXT }}>
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
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full pl-10 pr-3 py-2.5 text-sm rounded-xl border focus:outline-none focus:ring-2 cursor-text"
              style={{
                borderColor: COLORS.BORDER,
                color: COLORS.TEXT,
                backgroundColor: COLORS.CARD,
              }}
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: COLORS.TEXT }}>
            Password
          </label>
          <div className="relative">
            <Lock
              className="absolute left-3 top-3.5 h-5 w-5"
              style={{ color: COLORS.TEXT_SECONDARY }}
            />
            <input
              type={show.password ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border focus:outline-none focus:ring-2 cursor-text"
              style={{
                borderColor: COLORS.BORDER,
                color: COLORS.TEXT,
                backgroundColor: COLORS.CARD,
              }}
            />
            <div
              className="absolute right-3 top-3.5 cursor-pointer"
              onClick={() => setShow({ ...show, password: !show.password })}
              title={show.password ? "Hide Password" : "Show Password"}
            >
              {show.password ? (
                <EyeOff className="w-5 h-5" style={{ color: COLORS.TEXT_SECONDARY }} />
              ) : (
                <Eye className="w-5 h-5" style={{ color: COLORS.TEXT_SECONDARY }} />
              )}
            </div>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: COLORS.TEXT }}>
            Confirm Password
          </label>
          <div className="relative">
            <Lock
              className="absolute left-3 top-3.5 h-5 w-5"
              style={{ color: COLORS.TEXT_SECONDARY }}
            />
            <input
              type={show.confirm ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Re-enter password"
              className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border focus:outline-none focus:ring-2 cursor-text"
              style={{
                borderColor: COLORS.BORDER,
                color: COLORS.TEXT,
                backgroundColor: COLORS.CARD,
              }}
            />
            <div
              className="absolute right-3 top-3.5 cursor-pointer"
              onClick={() => setShow({ ...show, confirm: !show.confirm })}
              title={show.confirm ? "Hide Password" : "Show Password"}
            >
              {show.confirm ? (
                <EyeOff className="w-5 h-5" style={{ color: COLORS.TEXT_SECONDARY }} />
              ) : (
                <Eye className="w-5 h-5" style={{ color: COLORS.TEXT_SECONDARY }} />
              )}
            </div>
          </div>
        </div>

        {/* Referral Code */}
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: COLORS.TEXT }}>
            Referral Code (optional)
          </label>
          <div className="relative">
            <Gift
              className="absolute left-3 top-3.5 h-5 w-5"
              style={{ color: COLORS.TEXT_SECONDARY }}
            />
            <input
              type="text"
              name="referralCode"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              placeholder="Enter referral code if you have one"
              className="w-full pl-10 pr-3 py-2.5 text-sm rounded-xl border focus:outline-none focus:ring-2 cursor-text"
              style={{
                borderColor: COLORS.BORDER,
                color: COLORS.TEXT,
                backgroundColor: COLORS.CARD,
              }}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 py-3 font-semibold rounded-xl shadow-md transition-all duration-200 ${
            loading ? "opacity-80 cursor-not-allowed" : "hover:scale-[1.02] cursor-pointer"
          }`}
          style={{
            backgroundImage: COLORS.PRIMARY_GRADIENT,
            color: COLORS.WHITE,
            boxShadow: `0 4px 10px ${COLORS.SHADOW}`,
          }}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Registering...
            </>
          ) : (
            <>
              Register
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* ---- Footer ---- */}
      <p className="text-center text-sm mt-3 select-none" style={{ color: COLORS.TEXT_SECONDARY }}>
        Already have an account?{" "}
        <a
          href="/auth/login"
          className="font-semibold hover:underline cursor-pointer"
          style={{ color: COLORS.SECONDARY }}
        >
          Login here
        </a>
      </p>

      {/* ---- Reward Banner ---- */}
      <div
        className="text-center py-3 rounded-lg text-sm mt-6 select-none"
        style={{
          backgroundColor: COLORS.BACKGROUND,
          border: `1px solid ${COLORS.BORDER}`,
          color: COLORS.SECONDARY,
        }}
      >
        🎁 Invite friends & earn <span style={{ color: COLORS.PRIMARY }}>₹50</span> when they join!
      </div>
       <FloatingSupportButton/>
    </div>
  );
};

export default Register;
