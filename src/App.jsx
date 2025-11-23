import { useEffect } from "react";
import RoutesIndex from "./routes/RoutesIndex.jsx";
import { useUserStore } from "./store/AuthStrore.js";
import { getProfile } from "./api/AuthApi.js";
import toast, { Toaster } from "react-hot-toast";
import OnlineStatus from "./components/onlinestats.jsx";
function App() {
  const { hydrated, user, setUser,clearAuth } = useUserStore();

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

  // Load profile AFTER hydration (if user already has session cookie)
  useEffect(() => {
    if (!hydrated) return;

    // If user is null but a valid cookie exists → fetch profile
    (async () => {
      try {
        if (!user) {
          const res = await getProfile();
          if (res?.user) setUser(res.user);
        }
      } catch (err) {
        console.warn("No active session found.");
        clearAuth()
       
      }
    })();
  }, [hydrated]);

  // Show splash screen while Zustand is rehydrating
  if (!hydrated) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-amber-400 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
   <>
    <OnlineStatus />   

    <RoutesIndex />

    <Toaster position="top-center" />
  </>
  );
}

export default App;
