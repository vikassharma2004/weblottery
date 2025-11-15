
import { COLORS } from "../constant";
import { authImages } from "../image";
import { useNavigate } from "react-router-dom";

export function HeroSection() {
    const navigate = useNavigate();

  return (
    <section
      className="w-full py-20 md:py-28 px-6"
      style={{ backgroundColor: COLORS.BACKGROUND }}
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT: TEXT CONTENT */}
        <div className="text-center md:text-left">
          <h1
            className="text-4xl md:text-5xl font-extrabold leading-tight mb-5"
            style={{ color: COLORS.TEXT }}
          >
            Earn Rewards by Referring
          </h1>

          <p
            className="text-base md:text-lg max-w-md md:max-w-lg leading-relaxed mx-auto md:mx-0 mb-8"
            style={{ color: COLORS.TEXT_SECONDARY }}
          >
            Verify your account, make your first payment, unlock your referral code, 
            and earn 
            <span className="font-semibold" style={{ color: COLORS.SECONDARY }}>
              {" "}₹100 per referral
            </span>
            . Start building your earnings today.
          </p>

       <button
  onClick={() => navigate("/auth/register")}
  className="px-8 py-3 rounded-xl font-semibold shadow-lg transition-transform hover:scale-[1.03] cursor-pointer"
  style={{
    backgroundImage: COLORS.PRIMARY_GRADIENT,
    color: COLORS.BLACK,
  }}
>
  Get Started
</button>

        </div>

        {/* RIGHT: ILLUSTRATION */}
        <div className="flex justify-center md:justify-end">
          <img
            src={authImages.hero}
            alt="Refer & Earn"
            className="w-full max-w-sm md:max-w-md object-contain drop-shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}
