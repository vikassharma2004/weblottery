import { useEffect } from "react";
import RoutesIndex from "./routes/RoutesIndex.jsx";
import { useUserStore } from "./store/AuthStrore.js";
import { getProfile, logoutUser } from "./api/AuthApi.js";
import toast, { Toaster } from "react-hot-toast";
import { useVerifyAuthToken } from "./hooks/auth/AuthMutation.js";
function App() {
  const { hydrated, user, setUser, clearAuth } = useUserStore();


  const { mutate: verifyToken } = useVerifyAuthToken({ clearAuth });

  // 1️⃣ Online/offline listeners
  useEffect(() => {
    const handleOnline = () => toast.success("Back online ");
    const handleOffline = () => toast.error("You're offline. Check your connection.");

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

 useEffect(() => {
  if (!hydrated) return;

  // CASE 1: user already in store → verify token once
  if (user) {
    verifyToken(null, {
      onSuccess: () => {},
      onError: () => {
        clearAuth();
        logoutUser();
      }
    });
    return;
  }

  // CASE 2: user NOT in store → get profile (this also validates token)
  (async () => {
    try {
      const res = await getProfile();
      if (res?.user) {
        setUser(res.user);
      }
    } catch {
      clearAuth();
      logoutUser();
    }
  })();

}, [hydrated]);


  // 3️⃣ Splash screen
  if (!hydrated) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-amber-400 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <>
      {/* <OnlineStatus /> */}
      <RoutesIndex />
      <Toaster position="top-center" />
    </>
  );
}


export default App;
