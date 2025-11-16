import { useState } from "react";
import { Mail, Lock, ArrowRight, Loader2, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { COLORS } from "../../constant";
import { useLogin } from "../../hooks/auth/AuthMutation";
import FloatingSupportButton from "../../components/FloatingSupportButton";

const Login = () => {
  const{ isPending,mutateAsync:login} = useLogin();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
if(formData.email==="" || formData.password===""){
  toast.error("All fields are required!");
  return;
}
    if(formData.password?.length<6){
      toast.error("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }
     login(
    {
      email: formData.email,
      password: formData.password,
    }
   
    
  );
  };

  return (
    <div className="w-full space-y-6">
      <Toaster position="top-center" />

      {/* ---- Header ---- */}
      <div className="text-center select-none">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome Back to{" "}
          <span style={{ color: COLORS.PRIMARY }}>SpinShare</span>
        </h1>
        <p className="text-[15px]" style={{ color: COLORS.TEXT_SECONDARY }}>
          Sign in to continue earning rewards and track your referrals.
        </p>
      </div>

      {/* ---- Form ---- */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
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
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: COLORS.TEXT }}
          >
            Password
          </label>
          <div className="relative">
            <Lock
              className="absolute left-3 top-3.5 h-5 w-5"
              style={{ color: COLORS.TEXT_SECONDARY }}
            />
            <input
              type={showPassword ? "text" : "password"}
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
            {/* Eye toggle */}
            <div
              className="absolute right-3 top-3.5 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? "Hide Password" : "Show Password"}
            >
              {showPassword ? (
                <EyeOff
                  className="w-5 h-5"
                  style={{ color: COLORS.TEXT_SECONDARY }}
                />
              ) : (
                <Eye
                  className="w-5 h-5"
                  style={{ color: COLORS.TEXT_SECONDARY }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Forgot Password */}
        <div className="flex justify-end">
          <Link
            to="/auth/forgot-password"
            className="text-sm font-medium hover:underline cursor-pointer"
            style={{ color: COLORS.SECONDARY }}
          >
            Forgot Password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 py-3 font-semibold rounded-xl shadow-md transition-all duration-200 ${
            loading ||  formData.email === "" || formData.password === ""? "opacity-80 cursor-not-allowed" : "hover:opacity-90 cursor-pointer "
          }`}
          style={{
            backgroundImage:
              "linear-gradient(90deg, #FFB800 0%, #FFCB45 100%)",
            color: COLORS.WHITE,
            boxShadow: `0 4px 10px ${COLORS.SHADOW}`,
          }}
        >
          {isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Logging in...
            </>
          ) : (
            <>
              Login
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
        Don’t have an account?{" "}
        <Link
          to="/auth/register"
          className="font-semibold hover:underline cursor-pointer"
          style={{ color: COLORS.ACCENT }}
        >
          Sign up now
        </Link>
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
        🎁 Earn <span style={{ color: COLORS.PRIMARY }}>₹50</span> bonus for
        every friend you refer!
      </div>
      <FloatingSupportButton/>
    </div>
  );
};

export default Login;
