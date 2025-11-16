import { useEffect } from "react";
import RoutesIndex from "./routes/RoutesIndex.jsx";
import { useUserStore } from "./store/AuthStrore.js";
import { getProfile } from "./api/AuthApi.js";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const { hydrated, user, setUser } = useUserStore();

  // Load profile AFTER hydration (if user already has session cookie)
  useEffect(() => {
    if (!hydrated) return;

    // If user is null but a valid cookie exists → fetch profile
    (async () => {
      try {
        if (!user) {
          const res = await getProfile();
          console.log(res)
          if (res?.user) setUser(res.user);
        }
      } catch (err) {
        console.warn("No active session found.");
       
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
      <RoutesIndex />
        <Toaster position="top-center" />
    </>
  );
}

export default App;
