import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { COLORS } from "../../constant";

const ReferralRedirect = () => {
  const { referralCode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (referralCode) {
      // Optional: save in localStorage to persist across reloads
      localStorage.setItem("referralCode", referralCode);

      // Redirect to register page with query param
      navigate(`/auth/register?referralCode=${referralCode}`, { replace: true });
    } else {
      navigate("/auth/register", { replace: true });
    }
  }, [referralCode, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <Loader2 className="w-8 h-8 animate-spin mb-4" style={{ color: COLORS.PRIMARY }} />
      <p className="text-sm" style={{ color: COLORS.TEXT_SECONDARY }}>
        Redirecting you to registration...
      </p>
    </div>
  );
};

export default ReferralRedirect;
