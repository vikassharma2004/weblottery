"use client";

import { useEffect } from "react";
import { toast } from "react-toastify";

export default function OnlineStatus() {

  useEffect(() => {
    const handleOnline = () => {
      toast.success("Back online 🚀");
    };

    const handleOffline = () => {
      toast.error("You're offline. Check your connection.");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return null; // 👈 no UI, only toasts
}
