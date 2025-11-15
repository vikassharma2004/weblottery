import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Lock, Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import { COLORS } from "../../constant";
import { useResetPassword } from "../../hooks/auth/AuthMutation";
const ResetPassword = () => {
  const { mutate:ResetPassword,isPending } =useResetPassword();
  const { token } = useParams(); // 🔥 Extract token from route
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [show, setShow] = useState({
    new: false,
    confirm: false,
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.newPassword || !formData.confirmPassword) {
      toast.error("All fields are required!");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (!token) {
      toast.error("Invalid or missing token. Please try again.");
      return;
    }
  

   
ResetPassword({ token, password: formData.newPassword });
  
  };

  return (
    <div className="w-full space-y-6">
      <Toaster position="top-center" />

      {/* ---- Header ---- */}
      <div className="text-center select-none">
        <h1 className="text-3xl font-bold mb-2" style={{ color: COLORS.TEXT }}>
          Reset <span style={{ color: COLORS.PRIMARY }}>Password</span>
        </h1>
        <p className="text-[15px]" style={{ color: COLORS.TEXT_SECONDARY }}>
          Create a new password for your account.
        </p>
      </div>

      {/* ---- Form ---- */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* New Password */}
        <div>
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: COLORS.TEXT }}
          >
            New Password
          </label>
          <div className="relative">
            <Lock
              className="absolute left-3 top-3.5 h-5 w-5"
              style={{ color: COLORS.TEXT_SECONDARY }}
            />
            <input
              type={show.new ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
              placeholder="Enter new password"
              className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border focus:outline-none focus:ring-2 cursor-text"
              style={{
                borderColor: COLORS.BORDER,
                color: COLORS.TEXT,
                backgroundColor: COLORS.CARD,
              }}
            />
            <div
              className="absolute right-3 top-3.5 cursor-pointer"
              onClick={() => setShow({ ...show, new: !show.new })}
              title={show.new ? "Hide Password" : "Show Password"}
            >
              {show.new ? (
                <EyeOff className="w-5 h-5" style={{ color: COLORS.TEXT_SECONDARY }} />
              ) : (
                <Eye className="w-5 h-5" style={{ color: COLORS.TEXT_SECONDARY }} />
              )}
            </div>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: COLORS.TEXT }}
          >
            Confirm New Password
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
              placeholder="Re-enter new password"
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

        {/* ---- Submit Button ---- */}
        <button
          type="submit"
          disabled={isPending}
          className={`w-full flex items-center justify-center gap-2 py-3 font-semibold rounded-xl shadow-md transition-all duration-200 ${
            isPending ? "opacity-80 cursor-not-allowed" : "hover:scale-[1.02] cursor-pointer"
          }`}
          style={{
            backgroundImage: COLORS.PRIMARY_GRADIENT,
            color: COLORS.WHITE,
            boxShadow: `0 4px 10px ${COLORS.SHADOW}`,
          }}
        >
          {isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Resetting...
            </>
          ) : (
            <>
              Reset Password
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* ---- Info Banner ---- */}
      <div
        className="text-center py-3 rounded-lg text-sm mt-6 select-none"
        style={{
          backgroundColor: COLORS.BACKGROUND,
          border: `1px solid ${COLORS.BORDER}`,
          color: COLORS.SECONDARY,
        }}
      >
        🔒 Make sure your new password is strong — at least 8 characters with a mix
        of numbers and symbols.
      </div>
    </div>
  );
};

export default ResetPassword;
