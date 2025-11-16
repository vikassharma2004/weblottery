import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FloatingSupportButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/support")}
      className="
        fixed bottom-6 left-6 z-[9999] cursor-pointer animate-bounce
        w-14 h-14 rounded-full
        bg-amber-400 hover:bg-amber-500
        shadow-xl flex items-center justify-center
        transition-all duration-200
      "
    >
      <MessageCircle className="w-7 h-7 text-stone-900" />
    </button>
  );
}
