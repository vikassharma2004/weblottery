import { useState } from "react";
import { Lock, Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import { toast } from "react-toastify";
import { COLORS } from "../../constant";
import { useChangePassword } from "../../hooks/auth/AuthMutation";
import { Link } from "react-router-dom";

const ChangePassword = () => {
  const [show, setShow] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { mutate: changePassword, isPending } = useChangePassword();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
      toast.error("All fields are required!");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    const payload = {
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
    };

    changePassword(payload, {
      onSuccess: () => {
        setFormData({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      },
    });
  };

  const inputBox = (label, field, showKey) => (
    <div>
      <label
        className="block text-sm font-medium mb-1"
        style={{ color: COLORS.TEXT }}
      >
        {label}
      </label>

      <div className="relative">
        <Lock
          className="absolute left-3 top-3.5 h-5 w-5"
          style={{ color: COLORS.TEXT_SECONDARY }}
        />

        <input
          type={show[showKey] ? "text" : "password"}
          name={field}
          value={formData[field]}
          onChange={handleChange}
          required
          placeholder={label}
          className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border focus:outline-none focus:ring-2 cursor-text"
          style={{
            borderColor: COLORS.BORDER,
            color: COLORS.TEXT,
            backgroundColor: COLORS.CARD,
          }}
        />

        <div
          className="absolute right-3 top-3.5 cursor-pointer"
          onClick={() => setShow({ ...show, [showKey]: !show[showKey] })}
        >
          {show[showKey] ? (
            <EyeOff className="w-5 h-5" style={{ color: COLORS.TEXT_SECONDARY }} />
          ) : (
            <Eye className="w-5 h-5" style={{ color: COLORS.TEXT_SECONDARY }} />
          )}
        </div>
      </div>
    </div>
  );

  // Disable button if any field is empty OR loading
  const isSubmitDisabled =
    isPending ||
    !formData.oldPassword ||
    !formData.newPassword ||
    !formData.confirmPassword;

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="text-center select-none">
        <h1 className="text-3xl font-bold mb-2" style={{ color: COLORS.TEXT }}>
          Change <span style={{ color: COLORS.PRIMARY }}>Password</span>
        </h1>
        <p className="text-[15px]" style={{ color: COLORS.TEXT_SECONDARY }}>
          Keep your account secure by updating your password regularly.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {inputBox("Old Password", "oldPassword", "old")}
        {inputBox("New Password", "newPassword", "new")}
        {inputBox("Confirm New Password", "confirmPassword", "confirm")}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitDisabled}
          className={`w-full flex items-center justify-center gap-2 py-3 font-semibold rounded-xl shadow-md transition-all duration-200 ${
            isSubmitDisabled ? "opacity-60 cursor-not-allowed" : "hover:scale-[1.02]"
          }`}
          style={{
            backgroundImage: COLORS.PRIMARY_GRADIENT,
            color: COLORS.WHITE,
            boxShadow: `0 4px 10px ${COLORS.SHADOW}`,
          }}
        >
          {isPending ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              Update Password
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Forgot Password */}
      <div className="text-center mt-1">
        <Link
          to="/auth/forgot-password"
          className="text-sm font-semibold hover:underline"
          style={{ color: COLORS.ACCENT }}
        >
          Forgot Password?
        </Link>
      </div>

      {/* Bottom Tip */}
      <div
        className="text-center py-3 rounded-lg text-sm mt-6 select-none"
        style={{
          backgroundColor: COLORS.BACKGROUND,
          border: `1px solid ${COLORS.BORDER}`,
          color: COLORS.SECONDARY,
        }}
      >
        💡 Use a strong password with at least 6 characters, including numbers & symbols.
      </div>

     
    </div>
  );
};

export default ChangePassword;
